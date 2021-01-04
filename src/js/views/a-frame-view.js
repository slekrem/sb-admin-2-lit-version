import { connect } from "pwa-helpers/connect-mixin";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";

export default class AFrameView extends connect(store)(LitElement) {
    static get is() { return 'a-frame-view'; }

    createRenderRoot() { return this; }
    render() {
        return html`
        <div class="container-fluid">
            <h1 class="h3 mb-4 text-gray-800">A-FRAME</h1>
            <div class="row" style="min-height: 50%;">
                <div class="col-lg-12">
                    <div class="card mb-4">
                        <div class="card-header">
                            Example
                        </div>
                        <div class="card-body" style="height: 500px">
                        <asd-test></asd-test>
                            <a-scene embedded background="color: red">
                                <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
                                <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
                                <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
                                <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
                                <a-sky color="#ECECEC"></a-sky>
                            </a-scene>
                        </div>
                    </div>
                </div>            
            </div>
        </div>
        `;
    }
}

window.customElements.define(AFrameView.is, AFrameView);