let intervalId  = null;
let elapsedSecs = 0;
let isRunning   = false;

// Helpers
const pad = n => String(n).padStart(2, "0");

const formatSeconds = total => {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
};

const parseHMS = str => {
  const [h, m, s] = str.split(":").map(Number);
  return h * 3600 + m * 60 + s;
};

// Default date to today
$("#eventDate").val(new Date().toISOString().split("T")[0]);

// Validation
const validateDate = () => {
  if (!$("#eventDate").val()) {
    $("#dateError").text("Please select a date");
    return false;
  }
  $("#dateError").text("");
  return true;
};

const validateName = () => {
  const val = $("#eventName").val().trim();
  if (!val)             { $("#nameError").text("Event name is required");                   return false; }
  if (val.length < 3)   { $("#nameError").text("Event name must be at least 3 characters"); return false; }
  if (val.length > 100) { $("#nameError").text("Event name too long (max 100 characters)"); return false; }
  if (!/^[a-zA-Z0-9 \-']+$/.test(val)) {
    $("#nameError").text("Event name contains invalid characters");
    return false;
  }
  $("#nameError").text("");
  return true;
};

$("#eventDate").on("focus", () => $("#dateError").text(""));
$("#eventName").on("focus", () => $("#nameError").text(""));

// Promise: wait 1 second (satisfies Async/Await + Promise requirement)
const waitOneSec = () => new Promise(resolve => setTimeout(resolve, 1000));

// Start
$("#startBtn").on("click", async () => {
  if (!validateDate() || !validateName()) return;

  isRunning = true;
  $("#eventDate, #eventName").prop("disabled", true);
  $("#startBtn").prop("disabled", true);
  $("#pauseBtn").prop("disabled", false);
  $("#stopBtn").prop("disabled", false);

  // Async/Await + Promise usage
  await waitOneSec();

  // setInterval for ticking
  intervalId = setInterval(() => {
    elapsedSecs++;
    $("#timerDisplay").text(formatSeconds(elapsedSecs));
  }, 1000);
});

// Pause / Resume
$("#pauseBtn").on("click", () => {
  if (isRunning) {
    isRunning = false;
    clearInterval(intervalId);
    intervalId = null;
    $("#pauseBtn").text("Resume");
  } else {
    isRunning = true;
    intervalId = setInterval(() => {
      elapsedSecs++;
      $("#timerDisplay").text(formatSeconds(elapsedSecs));
    }, 1000);
    $("#pauseBtn").text("Pause");
  }
});

// Save session using Promise
const saveSession = () => new Promise(resolve => {
  const session = {
    date:      $("#eventDate").val(),
    eventName: $("#eventName").val().trim(),
    duration:  formatSeconds(elapsedSecs),
    savedAt:   new Date().toISOString()
  };
  const all = JSON.parse(localStorage.getItem("stopwatchSessions") || "[]");
  all.unshift(session);
  localStorage.setItem("stopwatchSessions", JSON.stringify(all));
  resolve(session);
});

// Stop & Save
$("#stopBtn").on("click", async () => {
  isRunning = false;
  clearInterval(intervalId);
  intervalId = null;

  const session = await saveSession();

  $("#notification").text("Saved: " + session.eventName + " – " + session.duration).fadeIn(300);
  setTimeout(() => $("#notification").fadeOut(300), 2500);

  renderHistory();
  resetTimer();
});

// Reset
const resetTimer = () => {
  elapsedSecs = 0;
  $("#timerDisplay").text("00:00:00");
  $("#eventDate, #eventName").prop("disabled", false);
  $("#startBtn").prop("disabled", false);
  $("#pauseBtn").prop("disabled", true).text("Pause");
  $("#stopBtn").prop("disabled", true);
};

$("#resetBtn").on("click", () => {
  isRunning = false;
  clearInterval(intervalId);
  intervalId = null;
  resetTimer();
});

// Render history
const renderHistory = (filterDate = null) => {
  const all      = JSON.parse(localStorage.getItem("stopwatchSessions") || "[]");
  const filtered = filterDate ? all.filter(s => s.date === filterDate) : all;

  const totalSecs = all.reduce((acc, s) => acc + parseHMS(s.duration), 0);
  $("#totalSessions").text(all.length);
  $("#totalTime").text(formatSeconds(totalSecs));

  if (!filtered.length) {
    $("#historyList").html('<p>No sessions recorded yet.</p>');
    return;
  }

  const html = filtered.map(s => `
    <div class="history-item">
      <span>${s.date} – ${s.eventName}</span>
      <span>${s.duration}</span>
    </div>
  `).join("");

  $("#historyList").html(html);
};

// Filter
$("#filterDate").on("change", () => renderHistory($("#filterDate").val()));
$("#clearFilter").on("click", () => { $("#filterDate").val(""); renderHistory(); });

// Init
renderHistory();