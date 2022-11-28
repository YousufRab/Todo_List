

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
        titleLabel.classList.add('titleLabel');
        titleLabel.innerHTML = 'Title: ';
        titleLabel.setAttribute('for', 'todoTitle');
        titleDiv.append(titleLabel, titleInput);

        const descDiv = document.createElement('div');
        descDiv.classList.add('descDiv');
        const descInput = document.createElement('input');
        descInput.setAttribute('type', 'text');
        descInput.id = 'todoDescription';
        const descLabel = document.createElement('label');
        descLabel.classList.add('descLabel');
        descLabel.innerHTML = 'Description: ';
        descLabel.setAttribute('for', 'todoDescription');
        descDiv.append(descLabel, descInput);

        const dateDiv = document.createElement('div');
        dateDiv.classList.add('dateDiv');
        const dateInput = document.createElement('input');
        dateInput.setAttribute('type', 'date');
        dateInput.id = 'todoDate';
        const dateLabel = document.createElement('label');
        dateLabel.classList.add('dateLabel');
        dateLabel.innerHTML = 'Date due';
        dateLabel.setAttribute('for', 'todoDate');
        dateDiv.append(dateLabel, dateInput);

        fieldset.append(titleDiv, descDiv, dateDiv);
        inputContainer.append(inputHeader, inputSidebar, fieldset);

        return inputContainer;

    }

    return {todoForm}
})();