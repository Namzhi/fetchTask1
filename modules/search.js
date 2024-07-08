const userPerPage = 5

export class Search {
    constructor(view) {
        this.view = view
        this.view.searchInput.addEventListener(
            "keyup",
            this.debounce(this.loadUsers.bind(this), 500)
        )
        this.selectedList = this.view.createElement("ul", "selectedList");
        this.sel= this.view.sel;
       
    }

    async loadUsers() {
        this.clearUsers()
        const searchValue = this.view.searchInput.value
        if (searchValue) {
            return await fetch(
                `https://api.github.com/search/repositories?q=${searchValue}&per_page=${userPerPage}`
            ).then((res) => {
                if (res.ok) {
                    res.json().then((res) => {
                        res.items.forEach((user) => this.view.createUser(user))
                        // res.items.forEach((user) => this.view.saveData(user))
                        this.addUsers(this.selectedList)
                    })
                } else {
                }
            })
        } else {
            this.clearUsers()
        }
    }

    clearUsers() {
        this.view.usersList.innerHTML = ""
    }
    clearInput() {
        
        this.view.searchInput.value= ""
    }
    
    async addUsers(selectedList) {
        let select = []

        this.list = document.querySelectorAll(".user-prev")
        this.list2 = document.querySelectorAll(".user-pr")
        // this.list2.classList.toggle(`item`)
       
        // let wideData = this.view.sel
        // console.log(wideData)
        let cla = this.view;
        let search = this
        let sel = document.querySelector('.sel')
        document.querySelectorAll('.button').forEach(btn=>btn.addEventListener('click', function() {
            console.log(this)
            this.parentNode.remove()
        }))
        for (let i = 0; i < this.list.length; i++) {
            
            this.list[i].addEventListener("click", function () {
                // 
                let k = this.cloneNode(true)
                // // k = wideData[i];
                console.log(k)
                // k.classList.toggle('user-prev')
                // k.classList.toggle(`item`)
                // button.classList.add(`button-${i}`)
            
                // k.append(button)
                // sel.append(button)
                // selectedList.append(sel)
                console.log(sel)
                document.querySelector(".users").innerHTML = ""
                // let btn = document.querySelector(`.button-${i}`)
                let info = addInfo(this.querySelector('.user-name').innerHTML);
                console.log(info)
                cla.app.append(sel);
                // console.log(cla.button.innerHTML)
                
                
                // console.log("this",this.querySelector('.user-name').innerHTML)
               
                search.clearInput()
               
            })
            
               
        }
        // 
        console.log(selectedList )
        
        
        // this.view.app.append(sel);
        async function addInfo(name) {
            // let btn = document.querySelector(`.button-${k.textContent}`)
                //         let btn = document.querySelector(`.button-${name}`)
                       
                // console.log(btn)
                // deleteButton(btn); 
            return await fetch(
                `https://api.github.com/search/repositories?q=${name}&per_page=1`
            ).then((res) => {
                if (res.ok) {
                    res.json().then((res) => {
                      console.log(res.items[0].name)
                      console.log(cla)
                    //   return res.items[0].name
                        // res.items.forEach((user) => Search.view.createUser(user))
                        res.items.forEach((user) => cla.saveData(user))
                        
                    })
                } else {
                }})
            
        }
        function deleteButton(btn) {
           
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
