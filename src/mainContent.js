import { de } from "date-fns/locale";
import editSVG from './edit.svg';
import deleteSVG from './deleteIcon.svg';

export const mainContent = (() => {
    
    function createToDoCard (todo) {

        const todoCard = document.createElement('div');
        todoCard.classList.add('todoCard');
        todoCard.style.backgroundColor = prioLevel(todo);

        const mainInfo = document.createElement('div');
        mainInfo.classList.add('mainInfo');
     
        todoCard.append(mainInfo);

        const completed = document.createElement('input');
        completed.setAttribute('type', 'checkbox');
        completed.checked = todo.completed;
        
        const title = document.createElement('div');
        title.classList.add('todoTitle');
        title.innerHTML = todo.title;

        const details = document.createElement('div');
        details.classList.add('detailsBtn');
        details.innerHTML = 'Details';

        const description = document.createElement('p');
        description.classList.add('todo-Description');
        description.innerHTML = todo.description;

        const dueDate = document.createElement('div');
        dueDate.classList.add('todoDate');
        dueDate.innerHTML = "Temporary date"
        //dueDate.innerHTML = dateToString(todo.dueDate);

        const editDiv = document.createElement('div');
        editDiv.classList.add('editBtn');
        const editBtnImg = new Image();
        editBtnImg.src = editSVG;
        editDiv.append(editBtnImg);

        const deleteDiv = document.createElement('div');
        deleteDiv.classList.add('deleteBtn');
        const deleteBtnImg = new Image();
        deleteBtnImg.src = deleteSVG;
        deleteDiv.append(deleteBtnImg);


        mainInfo.append(completed, title, details, dueDate, editDiv, deleteDiv);
        
        return todoCard;
    }

    function prioLevel (todo) {
        if (todo.priority == 'low') {
            return 'rgb(160, 253, 21)';
        } else if (todo.priority == 'medium') {
            return 'rgb(255, 255, 0)';
        } else {
            return 'rgb(255, 0, 0)';
        }
    }

    return {createToDoCard}
})();


//Radio button selected depends on todo.priority choice, need a fxn to convert
//This code will be used later to create todo radio buttons
const lowPriority = document.createElement('input');
lowPriority.setAttribute('type', 'radio');
lowPriority.setAttribute('name', 'priority');
lowPriority.id = 'lowPrio';
lowPriority.classList.add('prioBtn');
const lowLabel = document.createElement('label');
lowLabel.setAttribute('for', 'lowPrio');
lowLabel.innerHTML = 'Low';

const medPriority = document.createElement('input');
medPriority.setAttribute('type', 'radio');
medPriority.setAttribute('name', 'priority');
medPriority.id = 'medPrio';
medPriority.classList.add('prioBtn');
const medLabel = document.createElement('label');
medLabel.setAttribute('for', 'medPrio');
medLabel.innerHTML = 'Medium';

const highPriority = document.createElement('input');
highPriority.setAttribute('type', 'radio');
highPriority.setAttribute('name', 'priority');
highPriority.id = 'highPrio';
highPriority.classList.add('prioBtn');
const highLabel = document.createElement('label');
highLabel.setAttribute('for', 'highPrio');
highLabel.innerHTML = 'High';
    