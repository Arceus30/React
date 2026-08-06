// props destructured
export const Product = ({
    title,
    price,
    inStock,
    categories = ["General"], // default props
}) => {
    return (
        <div>
            <h3>{title}</h3>
            <p>Price: ${price}</p>
            <p>In stock: {inStock ? "Yes" : "No"}</p>
            <p>Categories: {categories.join(",")}</p>
        </div>
    );
};
