import { combineReducers, createStore } from "redux";
import throttle from 'lodash.throttle';
import reducer from "./reducer";
import seed from './seed'

const saveState = state => {
    try {
        // 객체 -> Json 문자열로 번환
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state',serializedState);
    } catch (err) {
        // ignore write errors
        console.log('err', 'saveState()', err)
    }
};

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return  JSON.parse(serializedState)
    } catch (err) {
        console.log('err','loadState()', err);
        return undefined
    }
};

const persistedState = loadState();
const store = createStore(reducer, persistedState);

store.subscribe(
    throttle(() => {
        saveState(store.getState())
    })
);

console.log(store.getState());
if (!store.getState().board.list.length) {
    console.log('SEED');
    seed(store)
}
export default store