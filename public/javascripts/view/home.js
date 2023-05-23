import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("home");
        
    }

    async getHtml() {
        return `
        <div id="h1">
          <h1> Welcome to my Blog </h1>
          <p>
            <a href="/articles" data-link>View recent articles</a>
          </p>
        </div>
        
      `;
    }
}