import * as SessionActions from "../actions/session_actions"

const _nullSession = {
    currentId: null
}

const sessionReducer = (oldState ={}, action) => {
    Object.freeze(oldState)

    switch(action.type){
        case SessionActions.RECEIVE_CURRENT_USER:
            const currentId = action.currentUser.id
            return Object.assign({}, {currentId})
        case SessionActions.LOGOUT_CURRENT_USER:
            return _nullSession;
        default:
            return state;
    }
}

export default sessionReducer;