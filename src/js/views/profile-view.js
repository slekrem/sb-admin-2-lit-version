import { LitElement, html } from "lit-element";
import { connect } from "pwa-helpers/connect-mixin";
import { store } from "../redux/store";

export default class ProfileView extends (connect(store))(LitElement) {
    static get is() { return 'profile-view'; }

    createRenderRoot() { return this; }
    render() {
        return html`
        <div class="container-fluid">
            <h1 class="h3 mb-4 text-gray-800">Profile</h1>
        </div>
        `;
    }
}

window.customElements.define(ProfileView.is, ProfileView);