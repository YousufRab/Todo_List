
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
    }
}