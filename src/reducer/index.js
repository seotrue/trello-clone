import { combineReducers, createStore } from "redux";
import List from './list'
import Bord from './bord'
import Card from './card'

const reducer = combineReducers({
   List,
   Bord,
   Card
});

export default reducer