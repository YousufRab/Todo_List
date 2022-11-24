import './style.css';
import {pageContent} from './pageContent';

const homeContent = document.querySelector('#homeContent');
homeContent.append(pageContent());


// Todo object

class Todo {

    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.date = dueDate;
        this.priority = priority;
    }

}