
export const ADD_LIST = 'ADD_LIST';
export const MOVE_LIST = 'MOVE_LIST';
export const DELETE_LIST = 'DELETE_LIST';

const initialState = {
    lists: []
};

const bord = (state = initialState, action) =>{
    switch (action.type) {
        case ADD_LIST: {
            const { listId } = action.payload;
            return {
                ...state,
                lists: [...state.lists, listId]
            }
        }
        case MOVE_LIST: {
            const { oldListIndex, newListIndex } = action.payload;
            // 기존리스트
            const newLists = Array.from(state.lists);
            // 기존 리스트에서 삭제한다 보드를
            const [removedList] = newLists.splice(oldListIndex,1);
            newLists.splice(newListIndex,0, removedList);
            return {
                lists: newLists
            }
        }
        case DELETE_LIST: {
            const { listId } = action.payload;
            const filterDeleted = tmpListId => tmpListId !== listId;
            const newLists = state.lists.filter(filterDeleted);
            return {
                lists: newLists
            }
        }
        default:
            return state
    }
}

export default bord