const repPerPage = 5

export class Search {
    constructor(view) {
        this.view = view
        this.view.searchInput.addEventListener(
            "keyup",
            this.debounce(this.loadRep.bind(this), 500)
        )
        this.selectedList = this.view.sel
    }

    async loadRep() {
        this.clearRep()
        const searchValue = this.view.searchInput.value
        if (searchValue) {
            return await fetch(
                `https://api.github.com/search/repositories?q=${searchValue}&per_page=${repPerPage}`
            ).then((res) => {
                if (res.ok) {
                    res.json().then((res) => {
                        res.items.forEach((rep) => this.view.createRep(rep))
                        this.addRep(this.selectedList)
                    })
                }
            })
        } else {
            this.clearRep()
        }
    }

    clearRep() {
        this.view.rep.innerHTML = ""
    }
    clearInput() {
        this.view.searchInput.value = ""
    }

    async addRep() {
        this.list = document.querySelectorAll(".rep__item")
        let search = this
        let view = this.view
        let selectedList = document.querySelector(".selected-list")
        document.querySelectorAll(".selected-list__button").forEach((btn) =>
            btn.addEventListener("click", function () {
                this.parentNode.remove()
            })
        )
        for (let i = 0; i < this.list.length; i++) {
            this.list[i].addEventListener("click", function () {
                document.querySelector(".rep").innerHTML = ""
                addInfo(this.querySelector(".rep__name").innerHTML)
                view.app.append(selectedList)
                search.clearInput()
            })
        }

        async function addInfo(name) {
            return await fetch(
                `https://api.github.com/search/repositories?q=${name}&per_page=1`
            ).then((res) => {
                if (res.ok) {
                    res.json().then((res) => {
                        res.items.forEach((rep) => view.saveData(rep))
                    })
                } else {
                }
            })
        }
    }

    debounce(func, wait, immediate) {
        let timeout
        return function () {
            var context = this,
                args = arguments
            var later = function () {
                timeout = null
                if (!immediate) func.apply(context, args)
            }
            var callNow = immediate && !timeout
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
            if (callNow) func.apply(context, args)
        }
    }
}
