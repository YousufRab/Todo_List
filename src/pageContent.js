import { add } from "date-fns";
import notesSVG from './notes.svg';
import { createTodo } from "./createTodo";
import { mainContent } from "./mainContent";

export function pageContent() {

    const container = document.createElement('div');
    container.id = 'container';

    const headerContainer = document.createElement('div');
    headerContainer.id = 'headerContainer';

    const header = document.createElement('div');
    header.id = 'header';
    header.innerHTML = 'To do List';

    const notesImg = new Image();
    notesImg.src = notesSVG;
    notesImg.id = 'notesImg';

    headerContainer.append(header, notesImg);

    const sideBar = document.createElement('div');
    sideBar.id = 'sideBar';

    const content = document.createElement('div');
    content.id = 'content'; //content section to be split into two parts, upper for holding todos, lower for holding add todo btn

    const upperContent = document.createElement('div');
    upperContent.id = 'upperContent';

    const addTodo = document.createElement('button');
    addTodo.innerHTML = 'ADD NEW TASK';
    addTodo.setAttribute('type', 'button');
    addTodo.id = 'addTodo-content';
    addTodo.classList.add('hvr-push');
    addTodo.addEventListener('click', () => {
        mainContent.switchOverlay();
        createTodo.inputContainerSwitch();
        if (document.getElementById('formContainer').style.display === 'none') {
            createTodo.switchForm();
        };
    });
    const addTodoContainer = document.createElement('div');
    addTodoContainer.id = 'addTodo-container';
    addTodoContainer.append(addTodo);

    content.append(upperContent, addTodoContainer);

    container.append(headerContainer, sideBar, content);

    // Create sidebar links

    const homeLink = document.createElement('li');
    homeLink.classList.add('sideBarLinks');
    homeLink.classList.add('hvr-pulse');
    homeLink.id = 'homeLink';
    homeLink.innerHTML = 'Home';
    homeLink.addEventListener('click', sideBarLinks.homeBtn);

    const todayLink = document.createElement('li');
    todayLink.classList.add('sideBarLinks');
    todayLink.classList.add('hvr-pulse');
    todayLink.id = 'todayLink';
    todayLink.innerHTML = 'Today';
    todayLink.addEventListener('click', sideBarLinks.todayBtn);

    const weekLink = document.createElement('li');
    weekLink.classList.add('sideBarLinks');
    weekLink.classList.add('hvr-pulse');
    weekLink.id = 'weekLink';
    weekLink.innerHTML = 'This week';
    weekLink.addEventListener('click', sideBarLinks.weekBtn);

    const projectLink = document.createElement('ul');
    projectLink.classList.add('sideBarLinks');
    projectLink.innerHTML = 'Projects:';
    projectLink.id = 'dataList';

    const newProject = document.createElement('div');
    newProject.id = 'newProjectBtn';
    newProject.classList.add('hvr-pulse');
    newProject.innerHTML = 'Add New Project';
    newProject.addEventListener('click', () => {
        mainContent.switchOverlay();
        createTodo.inputContainerSwitch();
        if (document.getElementById('projectForm').style.display === 'none') {
            createTodo.switchForm();
        };
    });

    sideBar.append(homeLink, todayLink, weekLink, projectLink, newProject);

    return container;
}

export const projects = (() => {    //Module for handling projects in sidebar

    class Project {

        constructor(title, id) {
            this.title = title;
            this.id = id;
        }
    }

    let myTodoList = createTodo.todoList;    // import todo list from createTodo module
    let projectList = [];
    let renderedProjects = []      // this will store projects that are already rendered to DOM
    let lastProjectClicked = []        // this is a one element array that will hold the last project clicked
    let projectNum = 1;

    function createProject(projectName) {
        const myProject = new Project(projectName, projectNum);
        lastProjectClicked.length = 0;
        lastProjectClicked.push(myProject);
        projectNum++;
        return myProject;
    }

    function projectClicked() {     // this function will be called whenever rendered projects on DOM are clicked

        lastProjectClicked.length = 0;                  // Empty out the array first
        let projectID = Number((this.id).substring(7)); //extract the project id number from DOM element id 
        let foundProject = renderedProjects.find((object) => { // search renderedProjects list for projects that match the id 
            return object.id === projectID;
        })
        lastProjectClicked.push(foundProject);
        let projectTodoList = myTodoList.filter((object) => {    //filter all to do objects with matching project
            return object.project == foundProject.title;
        })
        sideBarLinks.clearTodos();                      // clear all displayed todos
        sideBarLinks.renderTodos(projectTodoList);      // use renderToDos function to render filtered list to DOM
    }

    function render() {
        let listContainer = document.querySelector('#dataList');

        if (listContainer.getElementsByTagName('li').length == 0) {  // check if any list elements have already been rendered to Dom
            projectList.forEach(list => {
                const listElement = document.createElement('li');
                listElement.classList.add('proList');
                listElement.id = 'Project' + list.id; 
                listElement.classList.add('hvr-pulse');
                listElement.innerText = list.title;
                listElement.addEventListener('click', projectClicked);
                listContainer.appendChild(listElement);
                renderedProjects.push(list);
            })
        } else {
            projectList.forEach(list => {
                if (!renderedProjects.includes(list)) {
                    const listElement = document.createElement('li');
                    listElement.classList.add('proList');
                    listElement.classList.add('hvr-pulse');
                    listElement.id = 'Project' + list.id;
                    listElement.innerText = list.title;
                    listElement.addEventListener('click', projectClicked);
                    listContainer.appendChild(listElement);
                    renderedProjects.push(list);
                }
            })
        }
    }

    function addToProList (project) {
        projectList.push(project);  
    }

    return {render, addToProList, createProject, projectList, projectNum, renderedProjects, lastProjectClicked};
})();


export const sideBarLinks = (() => {            //Module for handling sidebar functionality EXCEPT projects

    let myTodoList = createTodo.todoList;// import todo list from createTodo module

    function homeBtn() { // this should display all todos on todo list
        let myTodoList = createTodo.todoList; 
        projects.lastProjectClicked.length = 0;
        clearTodos();
        renderTodos(myTodoList);
    }

    function formatTodayDate() {

        let todayDate = new Date();
        let formattedDate = todayDate.toISOString();
        let year = formattedDate.substring(0, 4);
        let month = formattedDate.substring(5, 7);
        let day = formattedDate.substring(8, 10);

        let finalTodayDate = year + "-" + month + "-" + day;

        return finalTodayDate;

    }

    function formatDate(dateObject) {

        let dateForFormatting = dateObject;
        let formattedDate = dateForFormatting.toISOString();
        let year = formattedDate.substring(0, 4);
        let month = formattedDate.substring(5, 7);
        let day = formattedDate.substring(8, 10);

        let finalFormattedDate = year + "-" + month + "-" + day;

        return finalFormattedDate; 

    }

    function todayBtn() { //this should display todos based on date, if todo date == today's date
        
        let myTodoList = createTodo.todoList; 
        projects.lastProjectClicked.length = 0;
        let todayDate = formatTodayDate();

        function todayFilter(object) { // this function is used in array.filter()
            
            return object.date === todayDate;

        }

        const todayTodoList = myTodoList.filter(todayFilter); // use todayFilter function to filter todo list 
        
        clearTodos();
        renderTodos(todayTodoList);
    }

    function weekBtn() {

        let myTodoList = createTodo.todoList; 
        projects.lastProjectClicked.length = 0;
        function weekFilter(object) { //use this function in to filter array

            let todayDate = formatTodayDate();
            let todayPlusOne = incrementDay(1);
            let todayPlusTwo = incrementDay(2);
            let todayPlusThree = incrementDay(3);
            let todayPlusFour = incrementDay(4);
            let todayPlusFive = incrementDay(5);
            let todayPlusSix = incrementDay(6);

            return (object.date === todayDate ||
                object.date === todayPlusOne ||
                object.date === todayPlusTwo ||
                object.date === todayPlusThree ||
                object.date === todayPlusFour ||
                object.date === todayPlusFive ||
                object.date === todayPlusSix) 
        }

        const thisWeekList = myTodoList.filter(weekFilter);
        clearTodos();
        renderTodos(thisWeekList);
    }

    function incrementDay(n) { // this function will accept a number 'n' parameter and increment today's date by that number of days
                               // and return the new date in yyyy-mm-dd string format 

        let todayDate = new Date();

        const nPlusTodayDate = add(todayDate, {days: n});
        const incrementedDate = formatDate(nPlusTodayDate); //format the incremented todays date into required format

        return incrementedDate;
    }

    function renderTodos(todoList) {    // this function accepts todoList object and renders it to content section

        todoList.forEach(todoObject => {
            let mainContentSection = document.querySelector('#upperContent');
            mainContentSection.append(mainContent.createToDoCard(todoObject));

        });
    }

    function clearTodos() { // this function will clear all displayed todos 

        const allDisplayedTodos = document.querySelectorAll('.todoCard');
        const arrayDisplayedTodos = Array.from(allDisplayedTodos);   // convert nodelist to array

        if (allDisplayedTodos.length > 0) {
            arrayDisplayedTodos.forEach((todoElement)=> {

                todoElement.parentNode.removeChild(todoElement);

            });
        }
    }
    
    return {homeBtn, todayBtn, weekBtn, renderTodos, clearTodos};
})();