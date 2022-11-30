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
        dueDate.innerHTML = dateToString(todo);

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
            return 'rgb(0, 231, 39)';
        } else if (todo.priority == 'medium') {
            return 'rgb(255, 255, 0)';
        } else {
            return 'rgb(255, 0, 0)';
        }
    }

    function dateToString(todo) {
        console.log(todo.date);
        let day = (todo.date).slice(8);
        if (day[0] == "0") {
            day = day.slice(1);
        }
        let month = (todo.date).slice(5,7);
        
        console.log("month is: " + month);
        console.log(day);
        console.log(day.length)

        let monthName = "";
        let daySuffix = "";
        switch (day){
            case ('1'):
            case ('21'):
            case ('31'):
                daySuffix = "st";
                break;
            case ('2'):
            case ('22'):
                daySuffix = "nd";
                break;
            case ('3'):
            case ('23'):
                daySuffix = "rd";
                break;
            default:
                daySuffix = "th";
                break;
        }

        switch(month) {
            case ('1'):
                monthName = "January";
                break;
            case ('2'):
                monthName = "Febuary";
                break;
            case ('3'):
                monthName = "March";
                break;
            case ('4'):
                monthName = "April";
                break;
            case ('5'):
                monthName = "May";
                break;
            case ('6'):
                monthName = "June";
                break;
            case ('7'):
                monthName = "July";
                break;
            case ('8'):
                monthName = "August";
                break;
            case ('9'):
                monthName = "September";
                break;
            case ('10'):
                monthName = "October";
                break;
            case ('11'):
                monthName = "November";
                break;
            case ('12'):
                monthName = "December";
                break;
        }
        let newFormatDate =  day+daySuffix + " " + monthName;
        
        return newFormatDate;
    }

    return {createToDoCard}
})();



    