const form = document.getElementById("feedbackForm");
const submitBtn = document.getElementById("submitBtn");
const drinks = document.getElementById("drinks");
const checkboxArea = document.getElementById("checkboxArea");
const resultsSection = document.getElementById("resultsSection");
const resultsBody = document.getElementById("resultsBody");
const address1Counter = document.getElementById("address1Counter");
const address2Counter = document.getElementById("address2Counter");
const commentsCounter = document.getElementById("commentsCounter");

// regex
const emailRegex = /^[a-zA-Z0-9._%-]+@northeastern\.edu$/;
const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
const zipRegex = /^\d{5}$/;

// Phone input mask
document.getElementById("phoneNumber").addEventListener("input", function () {
  let numbers = this.value.replace(/\D/g, "");

  if (numbers.length > 3 && numbers.length <= 6) {
    this.value = "(" + numbers.slice(0, 3) + ") " + numbers.slice(3);
  } else if (numbers.length > 6) {
    this.value =
      "(" +
      numbers.slice(0, 3) +
      ") " +
      numbers.slice(3, 6) +
      "-" +
      numbers.slice(6, 10);
  } else {
    this.value = numbers;
  }

  validateForm();
});

// Address 1 counter
document.getElementById("streetAddress1").addEventListener("input", function () {
  address1Counter.textContent = this.value.length + "/50 characters used";
});

// Address 2 counter
document.getElementById("streetAddress2").addEventListener("input", function () {
  address2Counter.textContent = this.value.length + "/50 characters used";
});

// Comments counter
document.getElementById("comments").addEventListener("input", function () {
  commentsCounter.textContent = this.value.length + "/50 characters used";
});

// Drinks select
drinks.addEventListener("change", function () {
  const error = document.getElementById("drinksError");

  if (this.value === "") {
    error.textContent = "Please select a drink";
    error.style.display = "block";
    checkboxArea.innerHTML = "";
  } else {
    error.style.display = "none";
    checkboxArea.innerHTML = `
      <label style="width:auto; margin-left:150px;">
        <input type="checkbox" id="largeDrink"> Large drink (75¢ extra)
      </label>
      <br><br>
    `;

    document
      .getElementById("largeDrink")
      .addEventListener("change", function () {
        const old = document.getElementById("extraDiv");
        if (old) old.remove();

        if (this.checked) {
          checkboxArea.insertAdjacentHTML(
            "beforeend",
            `
            <div id="extraDiv">
              <label for="extraInfo">Extra Info*:</label>
              <input type="text" id="extraInfo">
              <br>
              <span class="error" id="extraInfoError"></span>
              <br><br>
            </div>
          `
          );

          document
            .getElementById("extraInfo")
            .addEventListener("input", validateForm);
        }

        validateForm();
      });
  }

  validateForm();
});

// main validation 
function validateForm() {
  let valid = true;

  // title
  if (!document.querySelector("input[name='title']:checked")) {
    document.getElementById("titleError").style.display = "block";
    valid = false;
  } else {
    document.getElementById("titleError").style.display = "none";
  }

  // first name
  const fn = document.getElementById("firstName").value.trim();

  if (fn === "") {
    document.getElementById("firstNameError").textContent =
      "First name is required";
    document.getElementById("firstNameError").style.display = "block";
    valid = false;
  } 
  else if (!/^[A-Za-z]+$/.test(fn)) {
    document.getElementById("firstNameError").textContent =
      "First name should contain only letters";
    document.getElementById("firstNameError").style.display = "block";
    valid = false;
  } 
  else if (fn.length < 2) {
    document.getElementById("firstNameError").textContent =
      "First name must be at least 2 characters";
    document.getElementById("firstNameError").style.display = "block";
    valid = false;
  } 
  else {
    document.getElementById("firstNameError").style.display = "none";
  }

  // last name
  const ln = document.getElementById("lastName").value.trim();

  if (ln === "") {
    document.getElementById("lastNameError").textContent =
      "Last name is required";
    document.getElementById("lastNameError").style.display = "block";
    valid = false;
  } 
  else if (!/^[A-Za-z]+$/.test(ln)) {
    document.getElementById("lastNameError").textContent =
      "Last name should contain only letters";
    document.getElementById("lastNameError").style.display = "block";
    valid = false;
  } 
  else if (ln.length < 2) {
    document.getElementById("lastNameError").textContent =
      "Last name must be at least 2 characters";
    document.getElementById("lastNameError").style.display = "block";
    valid = false;
  } 
  else {
    document.getElementById("lastNameError").style.display = "none";
  }

  // email
  const email = document.getElementById("emailId").value.trim();
  if (!emailRegex.test(email)) {
    document.getElementById("emailIdError").textContent =
      "Use Northeastern email";
    document.getElementById("emailIdError").style.display = "block";
    valid = false;
  } else {
    document.getElementById("emailIdError").style.display = "none";
  }

  // phone
  const phone = document.getElementById("phoneNumber").value.trim();
  if (!phoneRegex.test(phone)) {
    document.getElementById("phoneNumberError").textContent =
      "Format: (123) 456-7890";
    document.getElementById("phoneNumberError").style.display = "block";
    valid = false;
  } else {
    document.getElementById("phoneNumberError").style.display = "none";
  }

  // street address 1
  const addr1 = document.getElementById("streetAddress1").value.trim();
  if (addr1 === "") {
    document.getElementById("streetAddress1Error").textContent =
      "Street address is required";
    document.getElementById("streetAddress1Error").style.display = "block";
    valid = false;
  } else {
    document.getElementById("streetAddress1Error").style.display = "none";
  }

  // zip
  const zip = document.getElementById("zipcode").value.trim();
  if (!zipRegex.test(zip)) {
    document.getElementById("zipcodeError").textContent =
      "Zip must be 5 digits";
    document.getElementById("zipcodeError").style.display = "block";
    valid = false;
  } else {
    document.getElementById("zipcodeError").style.display = "none";
  }

  // drinks
  if (drinks.value === "") {
    document.getElementById("drinksError").textContent =
      "Please select a drink";
    document.getElementById("drinksError").style.display = "block";
    valid = false;
  } else {
    document.getElementById("drinksError").style.display = "none";
  }

  // comments
  const comments = document.getElementById("comments").value.trim();
  if (comments.length < 10) {
    document.getElementById("commentsError").textContent =
      "Minimum 10 characters";
    document.getElementById("commentsError").style.display = "block";
    valid = false;
  } else {
    document.getElementById("commentsError").style.display = "none";
  }

  // extra info if exists
  const extra = document.getElementById("extraInfo");
  if (extra && extra.value.trim().length < 3) {
    document.getElementById("extraInfoError").textContent =
      "Extra info required (min 3 characters)";
    document.getElementById("extraInfoError").style.display = "block";
    valid = false;
  } else if (document.getElementById("extraInfoError")) {
    document.getElementById("extraInfoError").style.display = "none";
  }

  submitBtn.disabled = !valid;
}

// attach validation 
form.querySelectorAll("input, textarea, select").forEach((el) => {
  el.addEventListener("input", validateForm);
});

// submit 
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const row = resultsBody.insertRow();
  row.insertCell(0).textContent =
    document.querySelector("input[name='title']:checked").value;
  row.insertCell(1).textContent = firstName.value;
  row.insertCell(2).textContent = lastName.value;
  row.insertCell(3).textContent = emailId.value;
  row.insertCell(4).textContent = phoneNumber.value;
  row.insertCell(5).textContent = streetAddress1.value;
  row.insertCell(6).textContent = streetAddress2.value;
  row.insertCell(7).textContent = zipcode.value;
  row.insertCell(8).textContent = drinks.value;
  row.insertCell(9).textContent =
    document.getElementById("extraInfo")?.value || "";
  row.insertCell(10).textContent = comments.value;

  resultsSection.style.display = "block";
  form.reset();
  checkboxArea.innerHTML = "";
  address1Counter.textContent = "0/50 characters used";
  address2Counter.textContent = "0/50 characters used";
  commentsCounter.textContent = "0/50 characters used";
  submitBtn.disabled = true;
});


// ========== AI Chatbot ==========

const chatWindow = document.getElementById("chatWindow");
const aiAssistantBtn = document.getElementById("aiAssistantBtn");
const chatCloseBtn = document.querySelector(".chat-close");
const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const chatSendBtn = document.getElementById("chatSendBtn");

// FAQ 
const faqDatabase = [
  {
    keywords: ["email", "mail"],
    answer: "You must use your Northeastern email (example: student@northeastern.edu)."
  },
  {
    keywords: ["phone", "format", "number"],
    answer: "The phone number must be in the format (XXX) XXX-XXXX."
  },
  {
    keywords: ["zip", "zipcode", "digits"],
    answer: "The zip code must be exactly 5 digits."
  },
  {
    keywords: ["which", "required", "fields"],
    answer: "All fields are required except Street Address 2."
  },
  {
    keywords: ["address 2", "street address 2", "mandatory"],
    answer: "No, it is optional. If left blank, it will remain empty in the results table."
  }
];

// Open chat window
aiAssistantBtn.addEventListener("click", function () {
  chatWindow.style.display = "flex";
});

// Close chat window
chatCloseBtn.addEventListener("click", function () {
  chatWindow.style.display = "none";
});

// Send message on button click
chatSendBtn.addEventListener("click", function() {
  sendMessage();
});

// Send message function
function sendMessage() {
  const userMessage = chatInput.value.trim();

  if (userMessage === "") {
    return;
  }

  // Display user message
  displayMessage(userMessage, "user");

  // Clear input
  chatInput.value = "";

  // Get bot response
  const botResponse = getBotResponse(userMessage);
  displayMessage(botResponse, "bot");
}

// Display message in chat
function displayMessage(message, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.className = sender === "user" ? "user-message" : "bot-message";
  messageDiv.textContent = message;
  chatMessages.appendChild(messageDiv);
}

// Get bot response based on keywords
function getBotResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();

  // Check each FAQ for matching keywords
  for (const faq of faqDatabase) {
    for (const keyword of faq.keywords) {
      if (lowerMessage.includes(keyword)) {
        return faq.answer;
      }
    }
  }

  // Default response
  return "Sorry, I don't know that yet. Please check the instructions.";
}