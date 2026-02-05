//Title constructor function that creates a Title object
function Title(t1) 
{ this.mytitle = t1;
}

Title.prototype.getName = function () 
{ 
return (this.mytitle);
}

var socialMedia = {
  facebook : 'http://facebook.com',
  twitter: 'http://twitter.com',
  flickr: 'http://flickr.com',
  youtube: 'http://youtube.com'
};

var t = new Title("CONNECT WITH ME!");

// ========== 作业功能实现 ==========

// 页面加载时初始化
window.onload = function() {
    // Submit按钮禁用
    var submitBtn = document.getElementById('button');
    submitBtn.disabled = true;
    
    // 绑定复选框事件
    var checkboxes = document.querySelectorAll('#myTable tbody input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('change', handleCheckboxChange);
    }
    
    // 绑定箭头点击事件
    var arrows = document.querySelectorAll('#myTable tbody img');
    for (var i = 0; i < arrows.length; i++) {
        arrows[i].addEventListener('click', toggleDropdown);
    }
    
    // 绑定Add按钮
    document.getElementById('add').addEventListener('click', addNewStudent);
};

// 复选框选中/取消
function handleCheckboxChange(event) {
    var checkbox = event.target;
    var td = checkbox.parentElement;
    var row = td.parentElement;
    var deleteCell = row.cells[8];
    var editCell = row.cells[9];
    
    if (checkbox.checked) {
        row.style.backgroundColor = 'yellow';
        
        var deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = function() { 
            deleteStudent(row); 
        };
        deleteCell.appendChild(deleteBtn);
        
        var editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = function() { 
            editStudent(row); 
        };
        editCell.appendChild(editBtn);
    } else {
        row.style.backgroundColor = 'white';
        deleteCell.innerHTML = '';
        editCell.innerHTML = '';
    }
    
    updateSubmitButton();
}

// 更新Submit按钮状态
function updateSubmitButton() {
    var submitBtn = document.getElementById('button');
    var checkboxes = document.querySelectorAll('#myTable tbody input[type="checkbox"]:checked');
    
    if (checkboxes.length > 0) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

// 展开/收起
function toggleDropdown(event) {
    var arrow = event.target;
    var td = arrow.parentElement;
    var row = td.parentElement;
    var detailRow = row.nextElementSibling;
    
    if (detailRow.style.display === 'none' || detailRow.style.display === '') {
        detailRow.style.display = 'table-row';
    } else {
        detailRow.style.display = 'none';
    }
}

// 添加新学生
function addNewStudent() {
    var tbody = document.querySelector('#myTable tbody');
    var nextNum = findNextStudentNumber(tbody);
    
    var newRow = document.createElement('tr');
    newRow.innerHTML = '<td><input type="checkbox" /><br /><br /><img src="down.png" width="25px" /></td>' +
        '<td>Student ' + nextNum + '</td>' +
        '<td>Teacher ' + nextNum + '</td>' +
        '<td>Approved</td>' +
        '<td>Fall</td>' +
        '<td>TA</td>' +
        '<td>12345</td>' +
        '<td>100%</td>' +
        '<td></td>' +
        '<td></td>';
    
    var detailRow = document.createElement('tr');
    detailRow.className = 'dropDownTextArea';
    detailRow.style.display = 'none';
    detailRow.innerHTML = '<td colspan="10">' +
        'Advisor:<br /><br />' +
        'Award Details<br />' +
        'Summer 1-2014(TA)<br />' +
        'Budget Number: <br />' +
        'Tuition Number: <br />' +
        'Comments:<br /><br /><br />' +
        'Award Status:<br /><br /><br />' +
        '</td>';
    
    var allRows = tbody.getElementsByTagName('tr');
    var foundPosition = false;
    
    for (var i = 0; i < allRows.length; i++) {
        var row = allRows[i];
        if (row.className === 'dropDownTextArea') {
            continue;
        }
        
        var studentName = row.cells[1].textContent;
        var number = parseInt(studentName.replace('Student ', ''));
        
        if (nextNum < number) {
            tbody.insertBefore(newRow, row);
            tbody.insertBefore(detailRow, row);
            foundPosition = true;
            break;
        }
    }
    
    if (!foundPosition) {
        tbody.appendChild(newRow);
        tbody.appendChild(detailRow);
    }
    
    var newCheckbox = newRow.querySelector('input[type="checkbox"]');
    newCheckbox.addEventListener('change', handleCheckboxChange);
    
    var newArrow = newRow.querySelector('img');
    newArrow.onclick = function() {
        if (detailRow.style.display === 'none' || detailRow.style.display === '') {
            detailRow.style.display = 'table-row';
        } else {
            detailRow.style.display = 'none';
        }
    };
    
    alert('Student ' + nextNum + ' Record added successfully');
}

// 找到下一个学生编号
function findNextStudentNumber(tbody) {
    var allRows = tbody.getElementsByTagName('tr');
    var existingNumbers = [];
    
    for (var i = 0; i < allRows.length; i++) {
        var row = allRows[i];
        if (row.className === 'dropDownTextArea') {
            continue;
        }
        
        var studentCell = row.cells[1];
        if (studentCell) {
            var text = studentCell.textContent;
            var number = parseInt(text.replace('Student ', ''));
            existingNumbers.push(number);
        }
    }
    
    existingNumbers.sort(function(a, b) { return a - b; });
    
    for (var i = 1; i <= existingNumbers.length + 1; i++) {
        var found = false;
        for (var j = 0; j < existingNumbers.length; j++) {
            if (existingNumbers[j] === i) {
                found = true;
                break;
            }
        }
        if (!found) {
            return i;
        }
    }
    
    return existingNumbers.length + 1;
}

// 删除学生
function deleteStudent(row) {
    var studentName = row.cells[1].textContent;
    var detailRow = row.nextElementSibling;
    
    detailRow.remove();
    row.remove();
    
    updateSubmitButton();
    
    alert(studentName + ' Record deleted successfully');
}

// 编辑学生
function editStudent(row) {
    var studentName = row.cells[1].textContent;
    
    var input = prompt('Edit details of ' + studentName, '');
    
    if (input !== null && input.trim() !== '') {
        alert(studentName + ' data updated successfully');
    }
}