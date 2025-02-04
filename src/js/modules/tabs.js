class Tabs {
    constructor(headerSelector, tabSelector, contentSelector, activeClass, display = "block") {
        const header = document.querySelector(headerSelector),
            tab = document.querySelectorAll(tabSelector),
            content = document.querySelectorAll(contentSelector);

        this.header = header
        this.tab = tab
        this.content = content

        this.headerSelector = headerSelector
        this.tabSelector = tabSelector
        this.contentSelector = contentSelector
        this.activeClass = activeClass
        this.display = display
        
        this.tabsInit()
    }


    tabsInit() {
        this.hideTabContent();
        this.showTabContent();

        this.handleTabSwitch();
    }


    hideTabContent() {
        this.content.forEach(contentItem => {
            contentItem.style.display = "none";
        })

        this.tab.forEach(tabItem => {
            tabItem.classList.remove(this.activeClass);
        })
    }

    showTabContent(index = 0) {
        this.content[index].style.display = this.display;
        this.tab[index].classList.add(this.activeClass);
    }

    handleTabSwitch() {
        this.header.addEventListener("click", (event) => {
            const target = event.target;
            
            if(target &&
                (target.classList.contains(
                this.tabSelector.replace(/\./, "")
            ) || target.parentNode.classList.contains(
                this.tabSelector.replace(/\./, "")
            ))) {
                this.tab.forEach((item, i) => {
                    if(target === item || target.parentNode == item) {
                        this.hideTabContent();
                        this.showTabContent(i);
                    }
                })
            }
        })
    }
}

export default Tabs;