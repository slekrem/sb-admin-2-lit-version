import { connect } from "pwa-helpers/connect-mixin";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";

export default class ActivityLogView extends connect(store)(LitElement) {
    static get is() { return 'activity-log-view'; }

    createRenderRoot() { return this; }
    render() {
        return html`
        <div class="container-fluid">
            <h1 class="h3 mb-4 text-gray-800">Activity Log</h1>
        </div>
        `;
    }
}

window.customElements.define(ActivityLogView.is, ActivityLogView);