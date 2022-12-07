import './style.css';
import {pageContent, projects} from './pageContent';
import {mainContent} from './mainContent';
import { createTodo } from './createTodo';

const homeContent = document.querySelector('#homeContent');
//temporarily add input form to Dom
homeContent.append(createTodo.todoForm());

homeContent.append(pageContent());

const newPro = projects.createProject('Achieve enlightenment');
projects.addToProList(newPro);
const anotherPro = projects.createProject('Fana');
projects.addToProList(anotherPro);
const yetAnotherPro = projects.createProject('do fuck all');
projects.addToProList(yetAnotherPro);
projects.render();
console.table(projects.projectList);

// Todo object

class Todo {

    constructor(title, description, dueDate, priority, completed) {
        this.title = title;
        this.description = description;
        this.date = dueDate;
        this.priority = priority;
        this.completed = completed;
    }
}

//Experimental todo
let todo1 = new Todo("Eat", "Stuff your face", "2022-11-24", "medium", true);
let mainContentSection = document.querySelector('#content');
mainContentSection.append(mainContent.createToDoCard(todo1));








// watch these vids:
// https://www.youtube.com/watch?v=W7FaYfuwu70&ab_channel=WebDevSimplified
// https://www.youtube.com/watch?v=WgFkdGqC6ng&ab_channel=MiladTech