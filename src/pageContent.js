export function pageContent() {

    const container = document.createElement('div');
    container.id = 'container';

    const header = document.createElement('div');
    header.id = 'header';
    header.innerHTML = 'Todo List';

    const sideBar = document.createElement('div');
    sideBar.id = 'sideBar';

    const content = document.createElement('div');
    content.id = 'content';

    container.append(header, sideBar, content);

    // Create sidebar links

    const homeLink = document.createElement('li');
    homeLink.classList.add('sideBarLinks');
    homeLink.innerHTML = 'Home';

    const todayLink = document.createElement('li');
    todayLink.classList.add('sideBarLinks');
    todayLink.innerHTML = 'Today';

    const weekLink = document.createElement('li');
    weekLink.classList.add('sideBarLinks');
    weekLink.innerHTML = 'This week';

    const projectLink = document.createElement('ul');
    projectLink.classList.add('sideBarLinks');
    projectLink.innerHTML = 'Projects:';
    projectLink.id = 'dataList';


    sideBar.append(homeLink, todayLink, weekLink, projectLink);

    return container;
}

export const projects = (() => {

    function render() {
        let projectList = ['eat', 'food', 'errday'];
        let listContainer = document.querySelector('#dataList');

        projectList.forEach(list => {
            const listElement = document.createElement('li');
            console.log('list element created');
            listElement.classList.add('proList');
            listElement.innerText = list;
            listContainer.appendChild(listElement);
        })
    }

    return {render};
})();