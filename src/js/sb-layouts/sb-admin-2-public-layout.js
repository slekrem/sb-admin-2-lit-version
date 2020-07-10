import { connect } from "pwa-helpers/connect-mixin";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";

import '../views/login-view';
import '../views/register-view';
import '../views/forgot-view';

export default class SbAdmin2PublicLayout extends connect(store)(LitElement) {
    static get is() { return 'sb-admin-2-public-layout'; }
    static get properties() {
        return {
            _viewName: String
        };
    }

    constructor() {
        super();
        this._viewName = '';
        document.body.classList.remove(...document.body.classList);
        document.body.classList.add('bg-gradient-primary');
    }

    createRenderRoot() { return this; }
    render() {
        switch (this._viewName) {
            case 'login':
                return html`<login-view></login-view>`;
            case 'register':
                return html`<register-view></register-view>`;
            case 'forgot':
                return html`<forgot-view></forgot-view>`;
            default:
                return html``;
        }
    }

    stateChanged(state) {
        this._viewName = state.app.viewData.name;;
    }
}

window.customElements.define(SbAdmin2PublicLayout.is, SbAdmin2PublicLayout);