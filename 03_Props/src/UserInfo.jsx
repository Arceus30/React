export const UserInfo = ({ name, age, city, email }) => {
    return (
        <>
            <p>{name}</p>
            <p>Age: {age}</p>
            <p>City: {city}</p>
            <p>Email: {email}</p>
        </>
    );
};
