class Modal {
    constructor() {
        this.bindModal(
            ".popup_engineer_btn", 
            ".popup_engineer", 
            ".popup_engineer .popup_close"
        );

        this.bindModal(
            ".phone_link", 
            ".popup", 
            ".popup .popup_close"
        );

        this.bindModal(
            ".popup_calc_btn",
            ".popup_calc",
            ".popup_calc_close"
        )

        this.showModalByTime(".popup", 3000)
    }

    bindModal(triggerSelector, modalSelector, closeSelector) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector);
        
        trigger.forEach(triggerItem => {
            triggerItem.addEventListener('click', (event) => {
                if(event.target) event.preventDefault();   
                
                
                modal.style.display = "block";
                document.body.style.overflow = "hidden";
                // document.body.classList.add("modal-open");
            })
        })


        close.addEventListener("click", () => {
            modal.style.display = "none";
            document.body.style.overflow = "";
            // document.body.classList.remove("modal-open");
        })

        modal.addEventListener('click', (event) => {
            if(event.target === modal) {
                modal.style.display = "none";
                document.body.style.overflow = "";
                // document.body.classList.remove("modal-open");
            }
        })
    }
    
    showModalByTime(selector, time) {
        setTimeout(() => {
            const modal = document.querySelector(selector)
            modal.style.display = "block"
            document.body.style.overflow = "hidden";
        }, time)
    }
}

export default Modal;