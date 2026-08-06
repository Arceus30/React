// JSX Component passed as prop
// children is an entire JSX component
export const CardWrapper = ({ title, children }) => {
    return (
        <div className="card">
            <h2>{title}</h2>
            <div className="card-content">{children}</div>
        </div>
    );
};
