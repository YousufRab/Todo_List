import { daysInWeek, daysToWeeks, isDate } from "date-fns";
import getDate from "date-fns/getDate";
import { da } from "date-fns/locale";
import { mainContent } from "./mainContent";
import { projects } from "./pageContent";


export const createTodo = (() => { // this module handles everything related to the todo form and project forms

    class Todo {

        constructor(title, description, dueDate, priority, completed, id, project) {
            this.title = title;
            this.description = description;
            this.date = dueDate;
            this.priority = priority;
            this.completed = completed;
            this.id = id;
            this.project = project;

        }
    }

    let todoList = []; // array to hold all created todos
    let todoNum = 1; // todo Id number that will be incremented by +1 each time new todoObject is added

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
        const sideTodo = document.createElement('div'); //add event click even listener to this 
        sideTodo.classList.add('sideTodo');
        sideTodo.innerHTML = 'To Do';
        sideTodo.addEventListener('click', () => {
            if (projectForm.style.display == 'block') {
                switchForm();
                } 
        });

        const sideProject = document.createElement('div'); //add event click even listener to this 
        sideProject.classList.add('sideProject');
        sideProject.innerHTML = 'Project';
        sideProject.addEventListener('click', () => {
            if (formContainer.style.display == 'block') {
                switchForm();
            }
        });

        inputSidebar.append(sideTodo, sideProject); // append this to inputContainer

        const rightSideDiv = document.createElement('div');
        rightSideDiv.id = 'rightSideDiv';


        // Create fieldset with separate divs for each input section
        const formContainer = document.createElement('div');
        formContainer.id = 'formContainer';
        formContainer.style.display = 'block';
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
        lowPriority.checked = false;
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

        const addTodoBtnContainer = document.createElement('div');
        addTodoBtnContainer.id = 'addTodoBtnContainer-Form';
        const addTodoBtn = document.createElement('button');
        addTodoBtn.innerHTML = 'ADD TO DO';
        addTodoBtn.setAttribute('type', 'button');
        addTodoBtn.id = 'addTodoBtn';
        addTodoBtn.addEventListener('click', addTodoBtnClicked);
        addTodoBtnContainer.append(addTodoBtn);

        // Create/Add project form

        const projectForm = document.createElement('div');
        projectForm.id = 'projectForm';
        projectForm.style.display = 'none';

        const projectLabel = document.createElement('label');
        projectLabel.innerHTML = 'Project Name: ';
        projectLabel.setAttribute('for', 'projectNameInput');

        const projectNameInput = document.createElement('input');
        projectNameInput.id = 'projectNameInput';
        projectNameInput.required = true;
        projectNameInput.setAttribute('maxlength', '40');

        const addProjectBtn = document.createElement('button');
        addProjectBtn.setAttribute('type', 'button');
        addProjectBtn.id = 'addProjectBtnForm';
        addProjectBtn.innerHTML = 'Create Project';
        addProjectBtn.addEventListener('click', createProjectBtnClicked);

        projectForm.append(projectLabel, projectNameInput, addProjectBtn);
        //
        
        prioBtnDiv.append(lowPriority, lowLabel, medPriority, medLabel, highPriority, highLabel, addTodoBtnContainer);
        prioDiv.append(prioTitle, prioBtnDiv);

        fieldset.append(titleDiv, descDiv, dateDiv);
        formContainer.append(fieldset, prioDiv);

        rightSideDiv.append(formContainer, projectForm);
        
        inputContainer.append(inputHeader, inputSidebar, rightSideDiv);

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
        const myTodo = createTodoObject();
        console.log(myTodo); // this is just for testing purposes
        console.table(todoList);
        displayTodo(myTodo);
        clearForm();
    }

    function createTodoObject () {
        // Check if lastProjectClicked array from projects module has any elements in it
        if (projects.lastProjectClicked.length === 0) {
            const todoObject = new Todo(collectFormInput().newTitle, collectFormInput().newDescription, collectFormInput().newDate, collectFormInput().newPriority, false, todoNum);
            todoNum++;
            todoList.push(todoObject);
            return todoObject;
        } else {
            
            let projectName = projects.lastProjectClicked[0].title;
            // Invoke todo class constructor using values from input form, and the associated project name held by 'projectName' variable above, and return created object     
            const todoObject = new Todo(collectFormInput().newTitle, collectFormInput().newDescription, collectFormInput().newDate, collectFormInput().newPriority, false, todoNum, projectName);
            todoNum++;
            todoList.push(todoObject);
            return todoObject;
        }
    }

    function displayTodo (todoObject) {
        let mainContentSection = document.querySelector('#upperContent');
        mainContentSection.append(mainContent.createToDoCard(todoObject));
    }

    function switchForm () {    // this function will switch between to do and Project forms
        const formContainer = document.querySelector('#formContainer');
        const projectform = document.querySelector('#projectForm');

        if (formContainer.style.display == 'block') {
            formContainer.style.display = 'none';
            projectform.style.display = 'block';
        } else {
            formContainer.style.display = 'block';
            projectform.style.display = 'none';
        }
    }

    function collectProjectFormInput() {
        let projectName = document.querySelector('#projectNameInput').value;

        return projectName;
    }

    function createProjectBtnClicked() {
        const newProject = collectProjectFormInput();  
        const newProjectObject = projects.createProject(newProject);
        projects.addToProList(newProjectObject);
        projects.render();
        console.log(projects.projectList);
        document.querySelector('#projectNameInput').value = '';    // clear input
    } 

    return {todoForm, collectFormInput, todoList, Todo};
})();
