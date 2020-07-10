import { connect } from "pwa-helpers/connect-mixin";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";

export default class BlankView extends connect(store)(LitElement) {
    static get is() { return 'blank-view'; }

    createRenderRoot() { return this; }
    render() {
        return html`
        <div class="container-fluid">
            <h1 class="h3 mb-4 text-gray-800">Blank Page</h1>
        </div>
        `;
    }
}

window.customElements.define(BlankView.is, BlankView);