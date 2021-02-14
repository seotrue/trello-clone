
export const ADD_CARD = 'ADD_CARD';
export const CHANGE_CARD_TEXT = 'CHANGE_CARD_TEXT';
export const DELETE_CARD = 'DELETE_CARD';
export const DELETE_LIST = 'DELETE_LIST';

const card = (state = {}, action) => {
    switch (action.type) {
        case ADD_CARD: {

        }
        case  CHANGE_CARD_TEXT: {

        }
        case DELETE_CARD:{

        }
        case DELETE_LIST:{

        }
        default:
            return state
    }
};

export default card
