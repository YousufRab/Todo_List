
const mainContent = () => {
    
    function createToDoCard (todo) {

        const todoCard = document.createElement('div');
        todoCard.classList.add('todoCard');
        
        const title = document.createElement('div');
        title.classList.add('todoTitle');
        title.innerHTML = todo.title;

        const description = document.createElement('p');
        description.classList.add('todo-Description');
        description.innerHTML = todo.description;

        const dueDate = document.createElement('div');
        dueDate.classList.add('todoDate');
        //dueDate.innerHTML = dateToString(todo.dueDate);
    
        const priority = document.createElement('input');
        priority.setAttribute('type', 'radio');

    }
}