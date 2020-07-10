import { LitElement, html } from "lit-element";
import { installRouter } from 'pwa-helpers/router';
import { getView } from "./services/appService";
import { store } from "./redux/store";
import { connect } from 'pwa-helpers/connect-mixin.js';
import { setViewData } from "./redux/actions/appActions";

import './sb-layouts/sb-admin-2-private-layout';
import './sb-layouts/sb-admin-2-public-layout';

export default class AppShell extends connect(store)(LitElement) {
    static get is() { return 'app-shell'; }
    static get properties() {
        return {
            _layout: String
        };
    }

    constructor() {
        super();
        this._layout = '';
        installRouter((location) => this._handleNavigation(location));
    }

    createRenderRoot() { return this; }
    render() {
        switch (this._layout) {
            case 'public':
                return html`<sb-admin-2-public-layout></sb-admin-2-public-layout>`;
            case 'private':
                return html`<sb-admin-2-private-layout></sb-admin-2-private-layout>`;
            default:
                return html`404`;
        }
    }

    stateChanged(state) {
        this._layout = state.app.viewData.layout;;
    }

    _handleNavigation(location) {
        const viewData = getView(location.pathname);
        store.dispatch(setViewData(viewData));
    }
}

window.customElements.define(AppShell.is, AppShell);