import './style.css';
import {pageContent, projects, sideBarLinks} from './pageContent';
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

//testing home button sidebar - delete after testing is done
//create 3 todo objects
const todo1 = new createTodo.Todo('Eat', 'Stuff your face', '2024-10-21', 'low', false, 1, 'Achieve enlightenment');
const todo2 = new createTodo.Todo('Pray', 'Prayyy to yo lord', '2024-01-18', 'medium', false, 2, 'Fana');
const todo3 = new createTodo.Todo('Love','Come onn','2028-12-09', 'high', false, 3, 'do fuck all');
createTodo.todoList.push(todo1, todo2, todo3);
// 

const homeBtnLink = document.querySelector('#homeLink');
homeBtnLink.addEventListener('click', sideBarLinks.homeBtn);

const todayBtnLink = document.querySelector('#todayLink');









// watch these vids:
// https://www.youtube.com/watch?v=W7FaYfuwu70&ab_channel=WebDevSimplified
// https://www.youtube.com/watch?v=WgFkdGqC6ng&ab_channel=MiladTech