import { connect } from "pwa-helpers/connect-mixin";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";

export default class SettingsView extends connect(store)(LitElement) {
    static get is() { return 'settings-view'; }

    createRenderRoot() { return this; }
    render() {
        return html`
        <div class="container-fluid">
            <h1 class="h3 mb-4 text-gray-800">Settings</h1>
        </div>
        `;
    }
}

window.customElements.define(SettingsView.is, SettingsView);