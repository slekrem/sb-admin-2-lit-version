import { connect } from "pwa-helpers/connect-mixin";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";

export default class NotFoundView extends connect(store)(LitElement) {
    static get is() { return 'not-found-view'; }

    createRenderRoot() { return this; }
    render() {
        return html`
        <div class="container-fluid">
            <div class="text-center">
                <div class="error mx-auto" data-text="404">404</div>
                <p class="lead text-gray-800 mb-5">Page Not Found</p>
                <p class="text-gray-500 mb-0">It looks like you found a glitch in the matrix...</p>
                <a href="/">&larr; Back to Dashboard</a>
            </div>
        </div>
        `;
    }
}

window.customElements.define(NotFoundView.is, NotFoundView);