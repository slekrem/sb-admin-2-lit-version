import { connect } from "pwa-helpers/connect-mixin";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";

export default class SbAdmin2Footer extends connect(store)(LitElement) {
    static get is() { return 'sb-admin-2-footer'; }

    createRenderRoot() { return this; }
    render() {
        return html`
        <footer class="sticky-footer bg-white">
            <div class="container my-auto">
                <div class="copyright text-center my-auto">
                    <span>Copyright &copy; Your Website 2020</span>
                </div>
            </div>
        </footer>
        `;
    }
}

window.customElements.define(SbAdmin2Footer.is, SbAdmin2Footer);