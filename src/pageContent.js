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

    const homeLink = document.createElement('p');
    homeLink.classList.add('sideBarLinks');
    homeLink.innerHTML = 'Home';

    const todayLink = document.createElement('p');
    todayLink.classList.add('sideBarLinks');
    todayLink.innerHTML = 'Today';

    const weekLink = document.createElement('p');
    weekLink.classList.add('sideBarLinks');
    weekLink.innerHTML = 'This week';

    const projectLink = document.createElement('p');
    projectLink.classList.add('sideBarLinks');
    projectLink.innerHTML = 'Projects:';

    sideBar.append(homeLink, todayLink, weekLink, projectLink);

    return container;
}