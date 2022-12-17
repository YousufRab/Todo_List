import './style.css';
import {pageContent, projects, sideBarLinks} from './pageContent';
import {mainContent} from './mainContent';
import { createTodo } from './createTodo';

const homeContent = document.querySelector('#homeContent');
//temporarily add input form to Dom
homeContent.append(createTodo.todoForm());
//


homeContent.append(pageContent());
let confirmEditBtn = document.getElementById('conEditBtn');
confirmEditBtn.addEventListener('click', mainContent.confirmEditBtn);








// watch these vids:
// https://www.youtube.com/watch?v=W7FaYfuwu70&ab_channel=WebDevSimplified
// https://www.youtube.com/watch?v=WgFkdGqC6ng&ab_channel=MiladTech