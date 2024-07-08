export class View {
    constructor() {
        this.app = document.querySelector(".app")

        this.search = this.createElement("div", "search", "search--position")
        this.searchInput = this.createElement("input", "search__input")
        this.search.append(this.searchInput)

        this.repWrapper = this.createElement("div", "rep-wrapper")
        this.rep = this.createElement("ul", "rep", "rep--areas")
        this.repWrapper.append(this.rep)
        this.search.append(this.repWrapper)

        this.selectedList = this.createElement(
            "ul",
            "selected-list",
            "selected-list--position",
            "rep--areas"
        )
        this.app.append(this.selectedList)
        this.app.append(this.search)
    }
    createElement(elementTag, ...elementClass) {
        const element = document.createElement(elementTag)
        if (elementClass.length !== 0) {
            elementClass.forEach((cl) => element.classList.add(cl))
        }
        return element
    }
    createRep(repData) {
        const repItem = this.createElement("li", "rep__item")
        repItem.innerHTML = `<span class='rep__name'>${repData.name}</span>`
        this.rep.append(repItem)
    }
    saveData(repData) {
        const selectedListItem = this.createElement("li", "selected-list__item")
        selectedListItem.innerHTML = `<span class='rep-na'>Name: ${repData.name}</span><br>
                            <span class="rep__owner">Owner: ${repData.owner.login}</span><br>
                            <span class="rep__stars">Stars: ${repData.stargazers_count}</span>
                               
                                `
        let button = this.createElement("div", "selected-list__button")

        selectedListItem.append(button)
        button.addEventListener("click", function () {
            button.parentNode.remove()
        })
        this.selectedList.append(selectedListItem)
    }
}
