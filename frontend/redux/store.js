import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/root.reducer";
import thunk from "redux-thunk";

const middleware = [thunk];

export const store = createStore(rootReducer, applyMiddleware(...middleware));
