import { useReducer } from "react";

const initialState = {
    items: [], // {id, name, price, quantity}
    totalAmount: 0,
    totalItems: 0,
};

const reducer = (state, action) => {
    if (action == null) return state;
    switch (action.type) {
        case "Add": {
            if (
                !action.payload ||
                action.payload.price == null ||
                action.payload.price < 0 ||
                !Number.isFinite(action.payload.price) ||
                action.payload.id == null
            ) {
                return state;
            }
            const existingItemIndex = state.items.findIndex(
                (item) => item.id === action.payload.id,
            );
            let newItems = [];
            if (existingItemIndex === -1) {
                newItems = [...state.items, { ...action.payload, quantity: 1 }];
            } else {
                newItems = [...state.items];
                newItems[existingItemIndex] = {
                    ...newItems[existingItemIndex],
                    quantity: (newItems[existingItemIndex].quantity || 0) + 1,
                };
            }
            return {
                items: newItems,
                totalAmount: parseFloat(
                    (state.totalAmount + action.payload.price).toFixed(2),
                ),
                totalItems: state.totalItems + 1,
            };
        }
        case "Delete": {
            if (
                !action.payload ||
                action.payload.id == null ||
                !state.items ||
                !state.items.length
            ) {
                return state;
            }
            const existingItemIndex = state.items.findIndex(
                (item) => item.id === action.payload.id,
            );
            if (existingItemIndex === -1) {
                return state;
            }
            let newItems = [];
            newItems = [...state.items];
            newItems[existingItemIndex] = {
                ...newItems[existingItemIndex],
                quantity: newItems[existingItemIndex].quantity - 1,
            };
            const deletedItem = newItems[existingItemIndex];
            if (newItems[existingItemIndex].quantity === 0) {
                newItems.splice(existingItemIndex, 1);
            }
            return {
                items: newItems,
                totalAmount: Math.max(
                    0,
                    parseFloat(
                        (state.totalAmount - deletedItem.price).toFixed(2),
                    ),
                ),
                totalItems: Math.max(0, state.totalItems - 1),
            };
        }
        default:
            return state;
    }
};

export const ShoppingCart = () => {
    const [cart, dispatch] = useReducer(reducer, initialState);

    const products = [
        {
            id: 1,
            name: "React",
            price: 49.99,
        },
        {
            id: 2,
            name: "Vue",
            price: 29.99,
        },
        {
            id: 3,
            name: "NodeJS",
            price: 39.99,
        },
    ];

    return (
        <div>
            <h2>Products</h2>
            {products.map(({ id, name, price }) => (
                <div
                    key={id}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        justifyContent: "center",
                    }}
                >
                    <h3>{name}</h3>
                    <p>${price}</p>
                    <button
                        onClick={() =>
                            dispatch({
                                type: "Add",
                                payload: { id, name, price },
                            })
                        }
                    >
                        Add to Cart
                    </button>
                </div>
            ))}
            <h3>Cart Summary</h3>
            {!cart.items.length ? (
                <div>Cart is empty</div>
            ) : (
                <>
                    <p>Items:</p>
                    {cart.items.map((item) => (
                        <div key={item.id}>
                            <p>
                                {item.name} - {item.quantity} - {item.price} -{" "}
                                {item.price * item.quantity}
                            </p>
                            <button
                                onClick={() =>
                                    dispatch({ type: "Delete", payload: item })
                                }
                            >
                                -1
                            </button>
                        </div>
                    ))}
                    <p>Total Amount: {cart.totalAmount}</p>
                    <p>Total Items: {cart.totalItems}</p>
                </>
            )}
        </div>
    );
};
