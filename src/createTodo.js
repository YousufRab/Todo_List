import { daysInWeek, daysToWeeks, isDate } from "date-fns";
import getDate from "date-fns/getDate";
import { da } from "date-fns/locale";
import { mainContent } from "./mainContent";


export const createTodo = (() => {

    class Todo {

        constructor(title, description, dueDate, priority, completed) {
            this.title = title;
            this.description = description;
            this.date = dueDate;
            this.priority = priority;
            this.completed = completed;
        }
    }

    function todoForm() {

        const inputContainer = document.createElement('div');
        inputContainer.classList.add('inputContainer');

        const inputHeader = document.createElement('div');
        inputHeader.classList.add('inputHeader');

        const inputTitle = document.createElement('p');
        inputTitle.classList.add('inputTitle');
        inputTitle.innerHTML = "Create new...";
        const closeInput = document.createElement('div');
        closeInput.classList.add('closeInput');
        closeInput.innerHTML = "X";

        inputHeader.append(inputTitle, closeInput); //append this to inputContainer

        const inputSidebar = document.createElement('div');
        inputSidebar.classList.add('inputSide');
        const sideTodo = document.createElement('div');
        sideTodo.classList.add('sideTodo');
        sideTodo.innerHTML = 'Todo';
        const sideProject = document.createElement('div');
        sideProject.classList.add('sideProject');
        sideProject.innerHTML = 'Project';

        inputSidebar.append(sideTodo, sideProject); // append this to inputContainer

        // Create fieldset with separate divs for each input section
        const formContainer = document.createElement('div');
        formContainer.classList.add('formContainer');
        const fieldset = document.createElement('fieldset');

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('titleDiv');
        const titleInput = document.createElement('input');
        titleInput.setAttribute('type', 'text');
        titleInput.required = true;
        titleInput.id = 'todoTitle';
        const titleLabel = document.createElement('label');
        titleLabel.classList.add('formLabel');
        titleLabel.innerHTML = 'Title: ';
        titleLabel.setAttribute('for', 'todoTitle');
        titleDiv.append(titleLabel, titleInput);

        const descDiv = document.createElement('div');
        descDiv.classList.add('descDiv');
        const descInput = document.createElement('input');
        descInput.setAttribute('type', 'text');
        descInput.id = 'todoDescription';
        const descLabel = document.createElement('label');
        descLabel.classList.add('formLabel');
        descLabel.innerHTML = 'Description: ';
        descLabel.setAttribute('for', 'todoDescription');
        descDiv.append(descLabel, descInput);

        const dateDiv = document.createElement('div');
        dateDiv.classList.add('dateDiv');
        const dateInput = document.createElement('input');
        dateInput.setAttribute('type', 'date');
        dateInput.id = 'todoDate';
        const dateLabel = document.createElement('label');
        dateLabel.classList.add('formLabel');
        dateLabel.innerHTML = 'Date due: ';
        dateLabel.setAttribute('for', 'todoDate');
        dateDiv.append(dateLabel, dateInput);

        const prioDiv = document.createElement('div');
        prioDiv.classList.add('prioDiv');
        const prioTitle = document.createElement('p');
        prioTitle.innerHTML = 'Priority: ';

        const prioBtnDiv = document.createElement('div');
        prioBtnDiv.id = 'prioBtnContainer';

        const lowPriority = document.createElement('input');
        lowPriority.setAttribute('type', 'radio');
        lowPriority.setAttribute('name', 'priority');
        lowPriority.id = 'lowPrio';
        lowPriority.checked = true;
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

        const addTodoBtn = document.createElement('div');
        addTodoBtn.innerHTML = 'Add todo';
        addTodoBtn.id = 'addTodoBtn';
        addTodoBtn.addEventListener('click', addTodoBtnClicked);
        
        prioBtnDiv.append(lowPriority, lowLabel, medPriority, medLabel, highPriority, highLabel, addTodoBtn)
        prioDiv.append(prioTitle, prioBtnDiv);

        fieldset.append(titleDiv, descDiv, dateDiv);
        inputContainer.append(inputHeader, inputSidebar, fieldset, prioDiv);

        return inputContainer;

    }

    function collectFormInput() {
        
        let newTitle = document.getElementById('todoTitle').value;
        let newDescription = document.getElementById('todoDescription').value;
        let newDate = document.getElementById('todoDate').value;

        function priofunction () {
            if (document.getElementById('lowPrio').checked) {
                return 'low';
            } else if (document.getElementById('medPrio').checked) {
                return 'medium';
            } else if (document.getElementById('highPrio').checked) {
                return 'high';
            } else {
                return '';
            }
        }

        let newPriority = priofunction();
        let newCompleted = false;    // this is not collected from form but assumed

        return {newTitle, newDescription, newDate, newPriority, newCompleted} // these values will be converted to a todo class object using contructor
    }

    function clearForm() {
        document.getElementById('todoTitle').value = "";
        document.getElementById('todoDescription').value = "";
        document.getElementById('todoDate').value = "";
        document.getElementById('lowPrio').checked = false;
        document.getElementById('medPrio').checked = false;
        document.getElementById('highPrio').checked = false;
    }

    function addTodoBtnClicked() {
        collectFormInput();
        console.log(createTodoObject()); // this is just for testing purposes
        clearForm();
    }

    function createTodoObject () {
        // Invoke todo class constructor and return created object
        const todoObject = new Todo(collectFormInput().newTitle, collectFormInput().newDescription, collectFormInput().newDate, collectFormInput().newPriority, false);
        return todoObject;
    }

    return {todoForm, collectFormInput};
})();
