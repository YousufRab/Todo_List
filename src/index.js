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







// watch these vids:
// https://www.youtube.com/watch?v=W7FaYfuwu70&ab_channel=WebDevSimplified
// https://www.youtube.com/watch?v=WgFkdGqC6ng&ab_channel=MiladTech