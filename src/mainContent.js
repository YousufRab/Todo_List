import { de } from "date-fns/locale";
import editSVG from './edit.svg';
import deleteSVG from './deleteIcon.svg';
import { createTodo } from "./createTodo";

export const mainContent = (() => {     // this module handles everything related to creation of to do card, edit button and details button DOM elements respectively
    
    function createToDoCard (todo) {

        const todoCard = document.createElement('div');
        todoCard.id = 'todo' + todo.id;
        todoCard.classList.add('todoCard');
        todoCard.style.backgroundColor = prioLevel(todo);

        const mainInfo = document.createElement('div');
        mainInfo.classList.add('mainInfo');
     
        todoCard.append(mainInfo);

        const completed = document.createElement('input');
        completed.setAttribute('type', 'checkbox');
        completed.checked = todo.completed;
        
        const title = document.createElement('div');
        title.classList.add('todoTitle');
        title.innerHTML = todo.title;

        const details = document.createElement('div');
        details.classList.add('detailsBtn');
        details.innerHTML = 'Details';

        const description = document.createElement('p');
        description.classList.add('todo-Description');
        description.innerHTML = todo.description;

        const dueDate = document.createElement('div');
        dueDate.classList.add('todoDate');
        dueDate.innerHTML = dateToString(todo);

        const editDiv = document.createElement('div');
        editDiv.classList.add('editBtn');
        const editBtnImg = new Image();
        editBtnImg.src = editSVG;
        editBtnImg.classList.add('editBtnImg');
        editBtnImg.addEventListener('click', editBtn);
        editDiv.append(editBtnImg);

        const deleteDiv = document.createElement('div');
        deleteDiv.classList.add('deleteBtn');
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
            return 'rgb(255, 255, 0)';
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

            proName.innerText = Object.title;

            description.innerText = Object.description;

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

        const todoIndex = createTodo.todoList.indexOf(myTodo);

        // Modify to do object values
        myTodo.title = proName.innerHTML;
        myTodo.description = description.value;
        myTodo.date = date.value;
        
        if (lowPrio.checked == true) {
            myTodo.priority = 'low';
        } else if (medPrio.checked == true) {
            myTodo.priority = 'medium';
        } else {
            myTodo.priority = 'high';
        }

        createTodo.todoList[todoIndex] = myTodo;
        console.log(createTodo.todoList);
    }

    function findTodo(todoID) {         //this function takes todoId as input and searches the to do list array for the todo object and returns it

        let myTodo = createTodo.todoList.find((object) => {
            return object.id == todoID;
        })

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



    return {createToDoCard, confirmEditBtn}
})();



    