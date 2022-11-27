

const createTodo = () => {

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
        const sideProject = document.createElement('div');
        sideProject.classList.add('sideProject');

        inputSidebar.append(sideTodo, sideProject); // append this to inputContainer

        // Create fieldset with separate divs for each input section
        const formContainer = document.createElement('div');
        formContainer.classList.add('formContainer');
        const fieldset = document.createElement('fieldset');
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('titleDiv');

    }

    
}