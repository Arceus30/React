function createStore(reducer) {
    let state; // The store owns the current state.

    const listeners = [];

    // Allows components/code to ask:
    function getState() {
        return state;
    }

    // We give the reducer current state + action and receive new state
    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach((listener) => {
            listener();
        });
    }

    // This allows something to say: "Tell me whenever the Redux state changes."
    function subscribe(listener) {
        listeners.push(listener);
        return function unsubscribe() {
            const index = listeners.indexOf(listener);
            if (index !== -1) {
                listeners.splice(index, 1);
            }
        };
    }

    // Our reducer has: state = initialState, so when the first action reaches it:
    // reducer(undefined, {
    //     type: "@@INIT"
    // });
    // it returns: { count: 0 } This initializes the store.
    dispatch({ type: "@@INIT" });
    return {
        getState,
        dispatch,
        subscribe,
    };
}

export default createStore;
