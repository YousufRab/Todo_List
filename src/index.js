import './style.css';
import {pageContent, projects} from './pageContent';

const homeContent = document.querySelector('#homeContent');
homeContent.append(pageContent());

projects.addToProList('King shit');
projects.render();


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
let todo1 = new Todo("Eat", "Stuff your face", "8th Dec", "medium");









// watch these vids:
// https://www.youtube.com/watch?v=W7FaYfuwu70&ab_channel=WebDevSimplified
// https://www.youtube.com/watch?v=WgFkdGqC6ng&ab_channel=MiladTech