// Default Export
// const NewButton = () => {
// return <button>Click Me (Export-Import button) </button>;
// };
// export default NewButton;

// or
// Named Export
export const NewButton = () => {
    return <button>Click Me (Export-Import button) </button>;
};

// Default Export:
// One per file
// Imported with any name
// No curly braces when importing

// Named Export:
// Multiple per file
// Imported using the exact exported name (unless aliased)
// Uses curly braces when importing
