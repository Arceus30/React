import createStore from "./store.js";
import reducer from "./reducer.js";

const store = createStore(reducer);

console.log(store.getState());

store.subscribe(() => {
    console.log("State changed:");
    console.log(store.getState());
});

store.dispatch({
    type: "INCREMENT",
});

store.dispatch({
    type: "INCREMENT",
});

store.dispatch({
    type: "DECREMENT",
});
