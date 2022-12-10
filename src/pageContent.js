import { add } from "date-fns";
import { createTodo } from "./createTodo";
import { mainContent } from "./mainContent";

export function pageContent() {

    const container = document.createElement('div');
    container.id = 'container';

    const header = document.createElement('div');
    header.id = 'header';
    header.innerHTML = 'Todo List';

    const sideBar = document.createElement('div');
    sideBar.id = 'sideBar';

    const content = document.createElement('div');
    content.id = 'content'; //content section to be split into two parts, upper for holding todos, lower for holding add todo btn

    const upperContent = document.createElement('div');
    upperContent.id = 'upperContent';


    const addTodo = document.createElement('button');
    addTodo.innerHTML = 'Add todo';
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

    const todayLink = document.createElement('li');
    todayLink.classList.add('sideBarLinks');
    todayLink.id = 'todayLink';
    todayLink.innerHTML = 'Today';

    const weekLink = document.createElement('li');
    weekLink.classList.add('sideBarLinks');
    weekLink.id = 'weekLink';
    weekLink.innerHTML = 'This week';

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

        projectList.forEach(list => {
            const listElement = document.createElement('li');
            listElement.classList.add('proList');
            listElement.innerText = list.title;
            listContainer.appendChild(listElement);
        })
    }

    function addToProList (project) {
        projectList.push(project);
    }

    return {render, addToProList, createProject, projectList, returnProList};
})();


export const sideBarLinks = (() => {            //Module for handling sidebar functionality

    let myTodoList = createTodo.todoList;    // import todo list from createTodo module

    function homeBtn() { // this should display all todos on todo list
        renderTodos(myTodoList);
    }

    function todayBtn() { //this should display todos based on date, if todo date == today's date

        let todayDate = new Date();
        let formattedDate = todayDate.toISOString();
        let year = formattedDate.substring(0, 4);
        let month = formattedDate.substring(5, 7);
        let day = formattedDate.substring(8, 10);

        let finalTodayDate = year + "-" + month + "-" + day;

        function todayFilter(object) { // this function is used in array.filter()
            
            return object.date === finalTodayDate;

        }

        const todayTodoList = myTodoList.filter(todayFilter); // use todayFilter function to filter todo list 
        
        renderTodos(todayTodoList);
    }

    function renderTodos(todoList) {    // this function accepts todoList object and renders it to content section

        todoList.forEach(todoObject => {
            let mainContentSection = document.querySelector('#upperContent');
            mainContentSection.append(mainContent.createToDoCard(todoObject));

        });

    }
    
    return {homeBtn, todayBtn};
})();