import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers/cellsReducer";
import reducers from "./reducers";
import { ActionType } from "./action-types";

export const store = createStore(reducers, {}, applyMiddleware(thunk));

// store.dispatch({
//   type: ActionType.INSERT_CELL_BEFORE,
//   payload: {
//     id: null,
//     type: "text",
//   },
// });

// store.dispatch({
//   type: ActionType.INSERT_CELL_BEFORE,
//   payload: {
//     id: null,
//     type: "code",
//   },
// });

// const id = store.getState().cells?.order[0]

// const state = store.getState();

// console.log(state);
