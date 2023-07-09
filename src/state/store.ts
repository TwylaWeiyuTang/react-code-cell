import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers/cellsReducer";
import reducers from "./reducers";

export const store = createStore(reducers, {}, applyMiddleware(thunk));
