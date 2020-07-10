import { connect } from "pwa-helpers/connect-mixin";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";

import '../sb-components/sb-admin-2-sidebar';
import '../sb-components/sb-admin-2-topbar';
import '../sb-components/sb-admin-2-footer';

import '../views/index-view';
import '../views/not-found-view';
import '../views/buttons-view';
import '../views/cards-view';
import '../views/colors-view';
import '../views/borders-view';
import '../views/animations-view';
import '../views/others-view';
import '../views/blank-view';
import '../views/charts-view';
import '../views/tables-view';

export default class SbAdmin2PrivateLayout extends connect(store)(LitElement) {
    static get is() { return 'sb-admin-2-private-layout'; }
    static get properties() {
        return {
            _viewName: String,
        };
    }

    constructor() {
        super();
        this._viewName = '';
        document.body.classList.remove(...document.body.classList);
    }

    _renderViews() {
        switch (this._viewName) {
            case 'index':
                return html`<index-view></index-view>`;
            case 'buttons':
                return html`<buttons-view></buttons-view>`;
            case 'cards':
                return html`<cards-view></cards-view>`;
            case 'colors':
                return html`<colors-view></colors-view>`;
            case 'borders':
                return html`<borders-view></borders-view>`;
            case 'animations':
                return html`<animations-view></animations-view>`;
            case 'others':
                return html`<others-view></others-view>`;
            case 'blank':
                return html`<blank-view></blank-view>`;
            case 'charts':
                return html`<charts-view></charts-view>`;
            case 'tables':
                return html`<tables-view></tables-view>`;
            case '404':
            default:
                return html`<not-found-view></not-found-view>`;
        }
    }

    createRenderRoot() { return this; }
    render() {
        return html`
        <div id="wrapper">
            <sb-admin-2-sidebar></sb-admin-2-sidebar>
            <div id="content-wrapper" class="d-flex flex-column">
                <div id="content">
                    <sb-admin-2-topbar></sb-admin-2-topbar>
                    ${this._renderViews()}
                </div>
                <sb-admin-2-footer></sb-admin-2-footer>
            </div>
        </div>

        <!--<a class="scroll-to-top rounded" href="#page-top">
            <i class="fas fa-angle-up"></i>
        </a>-->
        
        <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                        <a class="btn btn-primary" href="/login">Logout</a>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    stateChanged(state) {
        this._viewName = state.app.viewData.name;;
    }
}

window.customElements.define(SbAdmin2PrivateLayout.is, SbAdmin2PrivateLayout);