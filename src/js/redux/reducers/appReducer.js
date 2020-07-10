import { SET_VIEW_DATA } from "../actions/appActions";

const INITIAL_STATE = {
    viewData: {}
};

const app = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_VIEW_DATA:
            return {
                ...state,
                viewData: action.payload
            };
        default:
            return state;
    }
};

export default app;