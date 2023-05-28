import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("home");
        
    }

    async getHtml() {
        $('#h1').show();
        return ` `;
    }
}