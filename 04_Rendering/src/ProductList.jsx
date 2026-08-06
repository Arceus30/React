// Rendering Lists
// In React JSX: map is used to for list rendering and looping
import { Product } from "./Product";

export const ProductList = () => {
    const productList = [
        { name: "Laptop", price: 999 },
        { name: "Phone", price: 699 },
        { name: "Tablet", price: 499 },
    ];
    const productElements = productList.map((elem, idx) => (
        // Whatever jsx element returned by the map per item has to have a unique key with it
        // The key prop goes on the outermost repeated element
        // key is a special prop that React uses internally.
        // It's not a prop that you pass to a child component and destructure there to get access to it

        // Index is used by many devlopers but
        // The problem with using index as a key is that the index represents the position and not the item itself
        // That can lead to subtle and confusing bugs when the order of the items changes in the list

        // When is it actually safe to use index as a key? Ex: Navigation Menu Links
        // 1. Your items don't have a unique ID (if they do, always use that instead!)
        // 2. The list is completely static - you never add or remove items
        // 3. The list is never reordered or filtered
        <div key={idx}>
            <Product elem={elem} />
        </div>
    ));

    return (
        <div>
            <h2>Our Products</h2>
            {productElements}
        </div>
    );
};
