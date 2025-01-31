import { NotificationStatus } from "./status";

class Forms {
    constructor() {
        const forms = document.querySelectorAll("form"),
            inputs = document.querySelectorAll("input"),
            phoneInputs = document.querySelectorAll('input[name="user_phone"]');  

        phoneInputs.forEach(item => {
            item.addEventListener("input", this.handlerReplaceString)
        })
        
        this.forms = forms
        this.inputs = inputs

        this.formEvents()
    }

    handlerReplaceString(event) {
        const item = event.currentTarget
        // "/\D/" ищет все не цифры
        item.value = item.value.replace(/\D/, "");
    }

    createStatusMessage(element) {
        let statusMessage = document.createElement("div");
        statusMessage.classList.add("status");
        element.appendChild(statusMessage);
    }

    async postData(url, data) {
        const status = document.querySelector(".status");
        status.textContent = NotificationStatus.LOADING;

        try {
            let response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: data
            })

            if(!response.ok && response.status >= 400) {
                console.log(`${response.error} - ${response.status}`)
                throw new Error(`${response.error} - ${response.status}`)
            }

            return await response.text()
        } catch(error) {
            console.log(error)
            throw new Error(error)
        }
    }

    clearInputs() {this.inputs.forEach(inputItem => inputItem.value = "")}

    formEvents() {
        this.forms.forEach(formItem => {
            formItem.addEventListener("submit", (event) => {
                event.preventDefault()

                let statusMessage = this.createStatusMessage(formItem)

                const formData = new FormData(formItem);
                this.postData("/src/assets/server.php", formData)
                    .then(results => {
                        console.log(results);
                        statusMessage.textContent = NotificationStatus.SUCCESS
                    })
                    .catch(() => {
                        statusMessage.textContent = NotificationStatus.FAILURE
                    })
                    .finally(() => {
                        this.clearInputs()
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 5000);
                    })
            })
        })
    }
}

export default Forms;