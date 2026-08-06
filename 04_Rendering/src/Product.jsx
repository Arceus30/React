export const Product = ({ elem }) => {
    const { name, price } = elem;

    return (
        <>
            <h3>{name}</h3>
            <p>Price: ${price}</p>
        </>
    );
};
