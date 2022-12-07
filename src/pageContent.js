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

    const newProject = document.createElement('div');
    newProject.id = 'newProjectBtn';
    newProject.innerHTML = '+';


    sideBar.append(homeLink, todayLink, weekLink, projectLink, newProject);

    return container;
}

export const projects = (() => {

    class Project {

        constructor(title, id) {
            this.title = title;
            this.id = id;
        }
    }
    let projectList = ['eat', 'pray', 'love'];
    let projectNum = 1;

    function createProject(projectName) {
        const myProject = new Project(projectName, projectNum);
        projectNum++;
        return myProject;
    }

    function render() {
        let listContainer = document.querySelector('#dataList');

        projectList.forEach(list => {
            const listElement = document.createElement('li');
            console.log('list element created');
            listElement.classList.add('proList');
            listElement.innerText = list.title;
            listContainer.appendChild(listElement);
        })
    }

    function addToProList (project) {
        projectList.push(project);
    }

    return {render, addToProList, createProject};
})();