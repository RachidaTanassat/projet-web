import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("home");
    }

    async getHtml() {
        return `
            <h1>Welcome to  create Article</h1>
            <p>
                <a href="/articles" data-link>View recent articles</a>.
            </p>
        `;
    }
}