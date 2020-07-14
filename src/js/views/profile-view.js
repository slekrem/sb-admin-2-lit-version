import { LitElement, html } from "lit-element";
import { connect } from "pwa-helpers/connect-mixin";
import { store } from "../redux/store";
import { updateProfileDetailsAsync } from '../services/profileService'
import { setProfileData } from "../redux/actions/profileActions";

export default class ProfileView extends (connect(store))(LitElement) {
    static get is() { return 'profile-view'; }
    static get properties() {
        return {
            _loading: Boolean,
            _firstName: String,
            _lastName: String
        };
    }

    constructor() {
        super();
        this._loading = false;
        this._firstName = '';
        this._lastName = '';
    }

    _renderProfileForm() {
        return html`
        <form @submit="${this._onFormSubmitAsync}">
            <div class="form-group row">
                <label class="col-4 col-form-label" for="firstName">First Name</label>
                <div class="col-8">
                    <input id="firstName" name="firstName" placeholder="Max" required class="form-control" ?disabled="${this._loading}" value="${this._firstName}">
                </div>
            </div>
            <div class="form-group row">
                <label for="lastName" class="col-4 col-form-label">Last Name</label>
                <div class="col-8">
                    <input id="lastName" name="lastName" placeholder="Mustermann" required class="form-control" ?disabled="${this._loading}" value="${this._lastName}">
                </div>
            </div>
            <div class="form-group row">
                <div class="offset-4 col-8">
                    <button name="submit" type="submit" class="btn btn-primary" ?disabled="${this._loading}">Submit</button>
                </div>
            </div>
        </form>
        `;
    }

    createRenderRoot() { return this; }
    render() {
        return html`
        <div class="container-fluid">
            <h1 class="h3 mb-4 text-gray-800">Profile</h1>
            
            <div class="row">
                <div class="col-xl-12">
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">Profile Details</h6>
                        </div>
                        <div class="card-body">
                            ${this._renderProfileForm()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    stateChanged(state) { 
        this._firstName = state.profile.profileData.firstName;
        this._lastName = state.profile.profileData.lastName;
    }

    async _onFormSubmitAsync(event) {
        event.preventDefault();
        const form = event.srcElement || event.target,
            formData = new FormData(form);

        this._loading = true;
        const result = await updateProfileDetailsAsync(formData);
        this._loading = false;

        if (result.succeeded)
            store.dispatch(setProfileData(result.payload));
    }
}
window.customElements.define(ProfileView.is, ProfileView);