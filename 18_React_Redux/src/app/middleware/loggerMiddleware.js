// const loggerMiddleware = (store) => {
//     return (next) => {
//         return (action) => {
//             console.log("Dispatching:", action);
//             const result = next(action);
//             console.log("New state:", store.getState());
//             return result;
//         };
//     };
// };

// store: Gives middleware access to the Redux store.
// action: The action being dispatched
// next: Passes the action further down the middleware chain.
// Don't do this
// const middleware = store => next => action => {
//     store.dispatch(action);
// };
// Because you're dispatching the same action back into the middleware chain, which can create an infinite loop.
const loggerMiddleware = (store) => (next) => (action) => {
    console.log("Dispatching:", action);

    // Pass the action to the next middleware/reducer
    const result = next(action);
    console.log("New state:", store.getState());
    // Return whatever the next middleware returned
    return result;
};

export default loggerMiddleware;
