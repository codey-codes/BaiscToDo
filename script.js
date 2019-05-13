// possible future improvements:
// 1. Show only a few characters when displaying all tasks. Show full task when one task is clicked and hide the others
// 2. Show all tasks in a grid (like Keep)
// 3. Categorize tasks (work, school, home, shopping etc.)
// 4. Add some more animations, maybe?
// 5. 'Archived tasks' section


// current Issue: THE REDO BUTTON (TO ADD THE TODO BACK TO THE TO-DO LIST), ADDS THE TEXT BACK TO THE TO-DO LIST BUT FAILS TO REMOVE IT FROM ITSELF (DONE TASKS CONTAINER)  --->>   onclick="deleteTask(${id}, true)"

let counter = 1, doneCounter = 0;

const doneTasksContainerPosition = doneCounter => {    // to move the done-container down every time there is a new entry in the todo-container
    if (doneCounter >= 1) {
        document.querySelector('.container-done').style.display = `block`;
    } 
    // else {
    //     document.querySelector('.container-done').style.display = `none`;
    // }
    let toDoHeight = document.querySelector('.container-todo').clientHeight;
    document.querySelector('.container-done').style.top = `${toDoHeight + 100}px`;  // 40px top position of .container-todo. So 60px space between the 2 containers (toDoHeight + 40 (top) + 60 (space between) = .container-done top position) 
}


document.querySelector('.btn-submit').addEventListener('click', e => {
    // e.preventDefault();     // to prevent the page from reloading
    if (document.querySelector('.text-input').value === '') {
            
    } else {
        addTask(counter);
        counter++;
    }
});

document.querySelector('.text-input').onkeydown = e => {    // if enter key is pressed
    // document.querySelector('.test').innerHTML += String.fromCharCode(e.keyCode);     // to display as the user types
    if(e.keyCode == 13) { 
        if (document.querySelector('.text-input').value === '') {
            
        } else {
            addTask(counter);
            counter++;
        }
    }
 };

const addTask = (id, reAddText, alreadyDone) => {   // id is task id. reAddText is used when redo button is pressed to add the task back to to-do list. alreadyDone is used to make sure that the task has not already been done (is or is not in the completed tasks container)
    let text = document.querySelector('.text-input').value;
    if (text === '') text = reAddText;  // text will be '' when there is nothing inside the text field (of course, Mr. Obvious). This would be the case when the redo button is pressed so the text from that <span> will be transferred to 'text'
    const markup = `
        <div class="task-${id}" style="animation: comeIn 0.2s ease-in-out;">
            <i class="fas fa-angle-right"></i>
            <span class="task-text">${text}</span>
            <div class="icons">
                <i class="fas fa-check check-${id}" onclick="completeTask('${text}', ${id})"></i>
                <i class="fas fa-times times-${id}" onclick="deleteTask(${id}, false)"></i> 
            </div>
            <hr style="width: 350px; margin: 30px 0; clear: both;">
        </div>`;
    document.querySelector('.todo-tasks').insertAdjacentHTML('afterbegin', markup);
    if (alreadyDone) deleteTask(id, true);
    document.querySelector('.text-input').value = '';   // clear the input field
    doneTasksContainerPosition(alreadyDone);  
    // console.log(doneCounter);
};


function completeTask(text, id) {   // when checkmark is clicked
    const markup = `
        <div class="task-${id}" style="animation: comeIn 0.2s ease-in-out;">
            <i class="fas fa-caret-right"></i>
            <span class="task-text-done">${text}</span>
            <div class="icons">
                <i class="fas fa-redo-alt redo-${id}" onclick="addTask(${id}, '${text}', true)"></i>
                <i class="fas fa-times times-${id}-done" onclick="deleteTask(${id}, true)"></i>
            </div>
        </div>
        <hr style="width: 350px; margin: 20px auto; clear: both;">`;
    document.querySelector('.done-tasks').insertAdjacentHTML('afterbegin', markup);
    doneCounter++;
    console.log(doneCounter);
    deleteTask(id, false);
    doneTasksContainerPosition(1);
};



function deleteTask(id, alreadyDone) {
    let removeTask = document.querySelector(`.task-${id}`);
    console.log("alreadyDone inside deleteTask is: " + alreadyDone);
    if (alreadyDone) { 
        document.querySelector('.done-tasks').removeChild(removeTask);
        // doneCounter--;
    } else {
        document.querySelector('.todo-tasks').removeChild(removeTask);   // cannot just put class name in removeChild. It must be querySelector
    }
    doneTasksContainerPosition();
};