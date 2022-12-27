import { de } from "date-fns/locale";
import editSVG from './edit.svg';
import deleteSVG from './deleteIcon.svg';
import { createTodo } from "./createTodo";

export const mainContent = (() => {     // this module handles everything related to creation of to do card, edit button and details button DOM elements respectively
    
    function createToDoCard (todo) {

        const todoCard = document.createElement('div');
        todoCard.id = 'todo' + todo.id;
        todoCard.classList.add('todoCard');
        todoCard.classList.add('hvr-float-shadow');
        todoCard.style.backgroundColor = prioLevel(todo);

        const mainInfo = document.createElement('div');
        mainInfo.classList.add('mainInfo');
     
        todoCard.append(mainInfo);

        const completed = document.createElement('input');
        completed.setAttribute('type', 'checkbox');
        completed.classList.add('completed');
        completed.checked = todo.completed;
        completed.addEventListener('click', checkBoxClicked);
        
        const title = document.createElement('div');
        title.classList.add('todoTitle');
        title.innerHTML = todo.title;

        const details = document.createElement('div');
        details.classList.add('detailsBtn');
        details.classList.add('hvr-pulse');
        details.innerHTML = 'Details';
        details.addEventListener('click', detailsBtn);

        const description = document.createElement('p');
        description.classList.add('todo-Description');
        description.innerHTML = todo.description;

        const dueDate = document.createElement('div');
        dueDate.classList.add('todoDate');
        dueDate.innerHTML = dateToString(todo);

        const editDiv = document.createElement('div');
        editDiv.classList.add('editBtn');
        editDiv.classList.add('hvr-float');
        const editBtnImg = new Image();
        editBtnImg.src = editSVG;
        editBtnImg.classList.add('editBtnImg');
        editBtnImg.addEventListener('click', editBtn);
        editDiv.append(editBtnImg);

        const deleteDiv = document.createElement('div');
        deleteDiv.classList.add('deleteBtn');
        deleteDiv.classList.add('hvr-float');
        const deleteBtnImg = new Image();
        deleteBtnImg.src = deleteSVG;
        deleteBtnImg.classList.add('deleteBtnImg');
        deleteBtnImg.addEventListener('click', deleteBtn);
        deleteDiv.append(deleteBtnImg);


        mainInfo.append(completed, title, details, dueDate, editDiv, deleteDiv);
        
        return todoCard;
    }

    function prioLevel (todo) {
        if (todo.priority == 'low') {
            return 'rgb(0, 231, 39)';
        } else if (todo.priority == 'medium') {
            return 'rgb(255, 165, 0)';
        } else {
            return 'rgb(255, 0, 0)';
        }
    }

    function dateToString(todo) {
        let day = (todo.date).slice(8);
        if (day[0] == "0") {
            day = day.slice(1);
        }
        let month = (todo.date).slice(5,7);
        
        let monthName = "";
        let daySuffix = "";
        switch (day){
            case ('1'):
            case ('21'):
            case ('31'):
                daySuffix = "st";
                break;
            case ('2'):
            case ('22'):
                daySuffix = "nd";
                break;
            case ('3'):
            case ('23'):
                daySuffix = "rd";
                break;
            default:
                daySuffix = "th";
                break;
        }

        switch(month) {
            case ('01'):
                monthName = "January";
                break;
            case ('02'):
                monthName = "Febuary";
                break;
            case ('03'):
                monthName = "March";
                break;
            case ('04'):
                monthName = "April";
                break;
            case ('05'):
                monthName = "May";
                break;
            case ('06'):
                monthName = "June";
                break;
            case ('07'):
                monthName = "July";
                break;
            case ('08'):
                monthName = "August";
                break;
            case ('09'):
                monthName = "September";
                break;
            case ('10'):
                monthName = "October";
                break;
            case ('11'):
                monthName = "November";
                break;
            case ('12'):
                monthName = "December";
                break;
        }
        let newFormatDate =  day+daySuffix + " " + monthName;
        
        return newFormatDate;
    }

    function deleteBtn() {          // this function will be called when TodoCard delete icon is clicked

        let myTodoCard = targetTodoCard(this);
        (myTodoCard.parentNode).removeChild(myTodoCard);   // delete the displayed todo card

        let todoID = getTodoCardID(this);

        let myTodo = findTodo(todoID);

        for (var i = createTodo.todoList.length - 1; i >= 0; i--) {     // loop through the to do list array and delete the specific to-do element based on id
            if (createTodo.todoList[i].id == myTodo.id) {
                createTodo.todoList.splice(i, 1);
            }
        }
    }

    let currentTodoID = 0;          // This variable will be used to hold the ID of the current todo displayed in edit form

    function editBtn() {

        editContainerSwitch();
        switchOverlay();
        let editTodoId = getTodoCardID(this);
        currentTodoID = editTodoId;     //Sets the currentTodoID so it can be used in confirmEditBtn function
        let myTodo = findTodo(editTodoId);

        // First target all the elements in the edit form
        const proName = document.getElementById('proName');
        const description = document.getElementById('descriptionEdit');
        const date = document.getElementById('editDate');
        const lowPrio = document.getElementById('lowPrioEdit');
        const medPrio = document.getElementById('medPrioEdit');
        const highPrio = document.getElementById('highPrioEdit');

        displayToEdit(myTodo);

        function displayToEdit(Object) {        // Accepts object input and displays properties to edit form

            proName.value = Object.title;

            description.value = Object.description;

            date.value = Object.date;

            if (Object.priority == 'low') {
                lowPrio.checked = true;
            } else if (Object.priority == 'medium') {
                medPrio.checked = true;
            } else {
                highPrio.checked = true;
            }
        }
    }

    function confirmEditBtn() {             // Called when confirm Edit button is clicked

        let editTodoId = currentTodoID; 
        let myTodo = findTodo(editTodoId);

        const proName = document.getElementById('proName');
        const description = document.getElementById('descriptionEdit');
        const date = document.getElementById('editDate');
        const lowPrio = document.getElementById('lowPrioEdit');
        const medPrio = document.getElementById('medPrioEdit');
        const highPrio = document.getElementById('highPrioEdit');

        // Modify to do object values
        myTodo.title = proName.value;
        myTodo.description = description.value;
        myTodo.date = date.value;
        
        if (lowPrio.checked == true) {
            myTodo.priority = 'low';
        } else if (medPrio.checked == true) {
            myTodo.priority = 'medium';
        } else {
            myTodo.priority = 'high';
        }

        const todoIndex = createTodo.todoList.indexOf(myTodo);
        createTodo.todoList[todoIndex] = myTodo;
        changeTodoCardDisplay();
        editContainerSwitch();
        switchOverlay();                               
        currentTodoID = 0;              // Reset this variable
        console.log(createTodo.todoList);
    }

    function changeTodoCardDisplay() {          // this is called inside confirmEditBtn to display the changes made in the edit form to the todocard

        const proName = document.getElementById('proName');
        const lowPrio = document.getElementById('lowPrioEdit');
        const medPrio = document.getElementById('medPrioEdit');

        // First target the relevent todoCard element using the currentTodoID variable
        let todoCardID = 'todo' + currentTodoID;
        let myTodoCard = document.getElementById(todoCardID);

        if (lowPrio.checked == true) {                          
            myTodoCard.style.backgroundColor = 'rgb(0, 231, 39)';
        } else if (medPrio.checked == true) {
            myTodoCard.style.backgroundColor = 'rgb(255, 255, 0)';
        } else {
            myTodoCard.style.backgroundColor = 'rgb(255, 0, 0)';
        }

        let mainInfoElement = myTodoCard.children[0];
        let nameElement = mainInfoElement.children[1];
        let dateElement = mainInfoElement.children[3];

        nameElement.innerHTML = proName.value;

        // Since we need date in a different string format, we will use findTodo function to find the relevant todo object and pass it in to dateToString function
        let myTodo = findTodo(currentTodoID);
        dateElement.innerHTML = dateToString(myTodo);

    }

    function clearEditForm(){
        document.getElementById('proName').value = '';
        document.getElementById('descriptionEdit').value = '';
        document.getElementById('editDate').value = '';
        document.getElementById('lowPrioEdit').checked = false;
        document.getElementById('medPrioEdit').checked = false;
        document.getElementById('highPrioEdit').checked = false;
    }

    function editContainerSwitch() {         // For appearance and hiding of edit form

        let editContainer = document.getElementById('editContainer');
        if (editContainer.classList.contains('editContainer-hidden')) {
            editContainer.classList.add('editContainer-visible');
            editContainer.classList.remove('editContainer-hidden');
        } else {
            editContainer.classList.remove('editContainer-visible');
            editContainer.classList.add('editContainer-hidden');
        }

    }

    function detailsBtn() {                 // Called when details btn is clicked
       
        let todoId = getTodoCardID(this);
        let myTodo = findTodo(todoId);

        showDetailsSwitch();
        switchOverlay();
        displayDetails(myTodo);
    
    }

    function displayDetails(todo) {         // Accepts to do object and displays its details to details html elements
    
        let title = document.getElementById('detailsTitle');
        title.innerHTML = todo.title;

        let project = document.getElementById('detailsProject');
        if (todo.project === undefined) {
            project.innerHTML = "";
        } else {
            project.innerHTML = todo.project;
        }
        
        let priority = document.getElementById('detailsPriority');
        priority.innerHTML = (todo.priority).toUpperCase();

        let dueDate = document.getElementById('detailsDate');
        dueDate.innerHTML = todo.date;

        let description = document.getElementById('detailsDescription');
        description.innerHTML = todo.description;
    }

    function showDetailsSwitch() {            // Handles the details element appearance

        let detailsPopUp = document.getElementById('detailsContainer');

        if (detailsPopUp.classList.contains('detailsHidden')) {
            detailsPopUp.classList.add('detailsVisible');
            detailsPopUp.classList.remove('detailsHidden');
        } else {
            detailsPopUp.classList.add('detailsHidden');
            detailsPopUp.classList.remove('detailsVisible');
        }
    }

    function findTodo(todoID) {         //this function takes todoId as input and searches the to do list array for the todo object and returns it

        let myTodo = createTodo.todoList.find((object) => {
            return object.id == todoID;
        });

        return myTodo;
    }

    function getTodoCardID(element) {              // this function will find and return the formatted id of the todo card depending on what child elements of todo card are clicked

        if (element.classList.contains('deleteBtnImg') || element.classList.contains('editBtnImg')) {
            let container = element.parentNode;
            let mainInfo = container.parentNode;
            let myTodoCard = mainInfo.parentNode;
            let todoID = Number((myTodoCard.id).substring(4));
            
            return todoID;
        } else {

            let mainInfo = element.parentNode;
            let myTodoCard = mainInfo.parentNode;
            let todoID = Number((myTodoCard.id).substring(4));
            
            return todoID;
        }
    }

    function switchOverlay() {          // changes display settings of overlay element

        let overlay = document.getElementById('overlay');
        
        if (overlay.classList.contains('overlayHidden')) {
            overlay.classList.add('overlayVisible');
            overlay.classList.remove('overlayHidden');
        } else {
            overlay.classList.add('overlayHidden');
            overlay.classList.remove('overlayVisible');
        }
        // Add more code for hiding details, edit form and create todo/project forms
    }

    function targetTodoCard(element) {                 // this function will target and return the todo Card element depending on what element is clicked

        if (element.classList.contains('deleteBtnImg') || element.classList.contains('editBtnImg')) {

            let container = element.parentNode;
            let mainInfo = container.parentNode;
            let myTodoCard = mainInfo.parentNode;
            
            return myTodoCard;

        } else {

            let mainInfo = element.parentNode;
            let myTodoCard = mainInfo.parentNode;

            return myTodoCard;
        }
    }

    function checkBoxClicked() {                // Called when checkbox is clicked
        let todoTitle = this.nextElementSibling;

        let myTodoId = getTodoCardID(this);
        let myTodo = findTodo(myTodoId);
        const todoIndex = createTodo.todoList.indexOf(myTodo);
        
        if (this.checked) {
            todoTitle.style.textDecoration = 'line-through';
            myTodo.completed = true;
            createTodo.todoList[todoIndex] = myTodo;
        } else {
            todoTitle.style.textDecoration = "";
            myTodo.completed = false;
            createTodo.todoList[todoIndex] = myTodo;
        };
    }

    return {createToDoCard, confirmEditBtn, switchOverlay, showDetailsSwitch, editContainerSwitch, clearEditForm}
})();



    