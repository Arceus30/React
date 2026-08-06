// {expressions} for JS. Curly braces drop any JavaScript expression into JSX — a variable, a call, a ternary. Statements (if, for) are not allowed inside.

export const CandidateProfile = () => {
    const name = "Peter Parker";
    const role = "Web Developer";
    const yearsOfExperience = 5;
    const isAvailable = false;

    return (
        <>
            <h2>{name}</h2>
            <p>
                {role} with {yearsOfExperience} years of experience
            </p>
            <p>
                Status: {isAvailable ? "Available for hire" : "Not available"}
            </p>
        </>
    );
};
