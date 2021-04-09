/* import { createActions, handleActions, combineActions, handleAction } from 'redux-actions';

const defaultAppState = { 
    route: "main"
};

const { changeRoute } = createActions({

});

const reducer = handleActions({
    [combineActions(changeRoute)]: (
        state,
        { payload: { }}
    ) => {
         return {...state, route: "form"};
        }
    }, defaultAppState
);

export default reducer; */