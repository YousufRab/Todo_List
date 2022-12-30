import './style.css';
import {pageContent, projects, sideBarLinks} from './pageContent';
import {mainContent} from './mainContent';
import { createTodo } from './createTodo';

const homeContent = document.querySelector('#homeContent');
//temporarily add input form to Dom
homeContent.append(createTodo.todoForm());
//


homeContent.append(pageContent());
////////

let confirmEditBtn = document.getElementById('conEditBtn');
confirmEditBtn.addEventListener('click', mainContent.confirmEditBtn);

let inputContainer = document.getElementById('inputContainer');
let detailsContainer = document.getElementById('detailsContainer');
let editContainer = document.getElementById('editContainer');
let overlay = document.getElementById('overlay');

overlay.addEventListener('click', () => {
    mainContent.switchOverlay();
    if (detailsContainer.classList.contains('detailsVisible')) {
        mainContent.showDetailsSwitch();
    };
    if (editContainer.classList.contains('editContainer-visible')) {
        mainContent.editContainerSwitch();
    };
    if (inputContainer.classList.contains('inputContainer-visible')) {
        createTodo.inputContainerSwitch();
    };
});

let closeDetails = document.getElementById('closeDetails');
closeDetails.addEventListener('click', () => {
    mainContent.switchOverlay();
    mainContent.showDetailsSwitch();
});

let closeEdit = document.getElementById('editCancel');
closeEdit.addEventListener('click', () => {
    mainContent.switchOverlay();
    mainContent.editContainerSwitch();
    mainContent.clearEditForm();
});

function initializePage() {
    let myTodoList = createTodo.retrieveItemsFromStorage().retrievedTodos;
    createTodo.todoNum = Number(createTodo.retrieveItemsFromStorage().retrievedTodoNum);
    console.log(createTodo.todoNum);
    console.log(createTodo.todoList);
    // createTodo.todoList = myTodoList;
    createTodo.todoList = createTodo.retrieveItemsFromStorage().retrievedTodos;
    console.log(createTodo.todoList);
    if (myTodoList !=null && myTodoList.length > 0) {
        myTodoList.forEach((todo) => createTodo.displayTodo(todo));
    }

    projects.projectNum = Number(createTodo.retrieveItemsFromStorage().retrievedProNum);
    let myProjectList = createTodo.retrieveItemsFromStorage().retrievedProList;
    console.log(myProjectList);
    if (myProjectList != null && myProjectList.length > 0) {
        projects.projectList = createTodo.retrieveItemsFromStorage().retrievedProList;
    }
   
    let renderedPros = createTodo.retrieveItemsFromStorage().retrievedRenderedPro;

    if (renderedPros != null && renderedPros.length > 0) {
        console.log(projects.renderedProjects);
        projects.renderedProjects = renderedPros;
        projects.renderedProjects.forEach((project) => projects.render(project));
    }
}

window.onload = initializePage;
window.addEventListener('beforeunload', () => {
    
    createTodo.saveTodoLocalStorage();
    createTodo.saveProLocalStorage();
});
    
    
    
    