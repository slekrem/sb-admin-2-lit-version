export const SET_PROFILE_DATA = 'SET_PROFILE_DATA';

export const setProfileData = (payload) => dispatch => dispatch({
    type: SET_PROFILE_DATA,
    payload
});