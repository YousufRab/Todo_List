
function pageContent() {

    const superContainer = document.createElement('div');
    superContainer.id = 'superContainer';

    const container = document.createElement('div');
    container.id = 'container';

    superContainer.appendChild(container);

    const header = document.createElement('div');
    header.id = 'header';

    const sideBar = document.createElement('div');
    sideBar.id = 'sideBar';

    const content = document.createElement('div');
    content.id = 'content';

    container.append(header, sideBar, content);

    // Create sidebar links

    


}