import { combineReducers, createStore } from "redux";

import { filtersReducer } from "./filters";


const rootReducer = combineReducers({
 
  filters: filtersReducer,
});

const store = createStore(rootReducer);

export default store;

export type IRootState = ReturnType<typeof store.getState>;

export type IAppDispatch = typeof store.dispatch;