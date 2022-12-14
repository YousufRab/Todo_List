import { add } from "date-fns";
import { createTodo } from "./createTodo";
import { mainContent } from "./mainContent";

export function pageContent() {

    const container = document.createElement('div');
    container.id = 'container';

    const header = document.createElement('div');
    header.id = 'header';
    header.innerHTML = 'To do List';

    const sideBar = document.createElement('div');
    sideBar.id = 'sideBar';

    const content = document.createElement('div');
    content.id = 'content'; //content section to be split into two parts, upper for holding todos, lower for holding add todo btn

    const upperContent = document.createElement('div');
    upperContent.id = 'upperContent';


    const addTodo = document.createElement('button');
    addTodo.innerHTML = 'ADD TO DO';
    addTodo.id = 'addTodo-content';
    const addTodoContainer = document.createElement('div');
    addTodoContainer.id = 'addTodo-container';
    addTodoContainer.append(addTodo);

    content.append(upperContent, addTodoContainer);

    container.append(header, sideBar, content);

    // Create sidebar links

    const homeLink = document.createElement('li');
    homeLink.classList.add('sideBarLinks');
    homeLink.id = 'homeLink';
    homeLink.innerHTML = 'Home';
    homeLink.addEventListener('click', sideBarLinks.homeBtn);

    const todayLink = document.createElement('li');
    todayLink.classList.add('sideBarLinks');
    todayLink.id = 'todayLink';
    todayLink.innerHTML = 'Today';
    todayLink.addEventListener('click', sideBarLinks.todayBtn);

    const weekLink = document.createElement('li');
    weekLink.classList.add('sideBarLinks');
    weekLink.id = 'weekLink';
    weekLink.innerHTML = 'This week';
    weekLink.addEventListener('click', sideBarLinks.weekBtn);

    const projectLink = document.createElement('ul');
    projectLink.classList.add('sideBarLinks');
    projectLink.innerHTML = 'Projects:';
    projectLink.id = 'dataList';

    const newProject = document.createElement('div');
    newProject.id = 'newProjectBtn';
    newProject.innerHTML = 'Add Project';


    sideBar.append(homeLink, todayLink, weekLink, projectLink, newProject);

    return container;
}

export const projects = (() => {

    class Project {

        constructor(title, id) {
            this.title = title;
            this.id = id;
        }
    }
    let projectList = [];
    let renderedProjects = []      // this will store projects that are already rendered to DOM
    let projectNum = 1;

    function returnProList() {
        return projectList;
    }

    function createProject(projectName) {
        const myProject = new Project(projectName, projectNum);
        projectNum++;
        return myProject;
    }

    function render() {
        let listContainer = document.querySelector('#dataList');

        if (listContainer.getElementsByTagName('li').length == 0) {  // check if any list elements have already been rendered to Dom
            projectList.forEach(list => {
                const listElement = document.createElement('li');
                listElement.classList.add('proList');
                listElement.id = 'ProjectNumber' + list.id;
                listElement.innerText = list.title;
                listContainer.appendChild(listElement);
            })
        } else {
            projectList.forEach(list => {
                if (!renderedProjects.includes(list)) {
                    const listElement = document.createElement('li');
                    listElement.classList.add('proList');
                    listElement.id = 'ProjectNumber' + list.id;
                    listElement.innerText = list.title;
                    listContainer.appendChild(listElement);
                }
            })
        }
    }

    function addToProList (project) {
        projectList.push(project);
        renderedProjects.push(project);
    }

    return {render, addToProList, createProject, projectList, returnProList};
})();


export const sideBarLinks = (() => {            //Module for handling sidebar functionality

    let myTodoList = createTodo.todoList;    // import todo list from createTodo module

    function homeBtn() { // this should display all todos on todo list
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

        let todayDate = formatTodayDate();

        function todayFilter(object) { // this function is used in array.filter()
            
            return object.date === todayDate;

        }

        const todayTodoList = myTodoList.filter(todayFilter); // use todayFilter function to filter todo list 
        
        clearTodos();
        renderTodos(todayTodoList);
    }

    function weekBtn() {

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
    
    return {homeBtn, todayBtn, weekBtn};
})();