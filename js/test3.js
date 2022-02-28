class AppTest extends HTMLElement {
    constructor() {
        super();

        this.innerText = '(this text has been created using a simple web-component)';
    }

}

window.customElements.define('app-test', AppTest)