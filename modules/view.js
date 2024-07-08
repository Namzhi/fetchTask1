export class View {
    constructor() {
        this.app = document.querySelector('.app');
        // this.title = this.createElement('h1', 'title');
        // this.title.textContent = "Github Search Repositories"

        this.searchLine = this.createElement('div', 'search-line')
        this.searchInput = this.createElement('input', 'search-input')
        // this.searchCounter = this.createElement('span', 'counter')
        this.searchLine.append(this.searchInput)
        // this.searchLine.append(this.searchCounter)

        this.usersWrapper = this.createElement('div', 'users-wrappers')
        this.usersList = this.createElement('ul', 'users')
        this.usersWrapper.append(this.usersList)
        this.searchLine.append(this.usersWrapper)
        // this.main = this.createElement('div', 'main')
        // this.main.append(this.usersWrapper)
        // this.button = this.createElement("button", "button")
        
        this.sel = this.createElement('ul', 'sel')
        this.app.append(this.sel)
        // this.app.append(this.title)
        this.app.append(this.searchLine)
        // this.app.append(this.searchInput)
        // this.app.append(this.main)
        // this.app.append(this.usersWrapper)
    }
    createElement(elementTag, elementClass) {
        const element = document.createElement(elementTag);
        if(elementClass) {
            element.classList.add(elementClass);
        }
        return element;
    }
    createUser(userData) {
        const userElement = this.createElement('li', 'user-prev');
        userElement.innerHTML = `<span class='user-name'>${userData.name}</span>`
        this.usersList.append(userElement);
        // const userEl = this.createElement('li', 'user-pr');
        //     userEl.innerHTML = `<span class='user-prev>'${userData.name}</span>
        //                             <span class="user-prev-owner">${userData.owner.login}</span>
        //                             <span class="user-prev-count">${userData.stargazers_count}</span>
        //                             `
                            }
    saveData(userData) {
        const userEl = this.createElement('li', 'item');
        userEl.innerHTML = `<span class='user-na'>Name: ${userData.name}</span><br>
                            <span class="user-prev-owner">Owner: ${userData.owner.login}</span><br>
                            <span class="user-prev-count">Stars: ${userData.stargazers_count}</span>
                               
                                `
        let button = this.createElement("div", "button")
        
        userEl.append(button)
        button.addEventListener('click', function() {
            console.log(123)
            button.parentNode.remove()
        })
        this.sel.append(userEl);
    }
}
