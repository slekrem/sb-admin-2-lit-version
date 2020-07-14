import { SET_PROFILE_DATA } from "../actions/profileActions";

const INITIAL_STATE = {
    profileData: {
        firstName: 'Max',
        lastName: 'Mustermann'
    }
};

const profile = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_PROFILE_DATA:
            return {
                ...state,
                profileData: action.payload
            }
        default:
            return state;
    }
};

export default profile;