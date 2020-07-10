export const SET_VIEW_DATA = 'SET_VIEW_DATA';

export const setViewData = (viewData) => (dispatch) => {
    dispatch({
        type: SET_VIEW_DATA,
        payload: viewData
    });
};