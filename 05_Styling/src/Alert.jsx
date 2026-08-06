// Although Alert.css file is imported in Alert.jsx it is used globally
// So if there is any other file which have a class which is already defined in this css file it will pick up those styles
// For example look at the button which had error class and since error class is defined in Alert.css to have red color, the button will have red background color
// import "./Alert.css";

// 3.) CSS Modules
// Inside of creating plain old css file, we create a module css file.Advantages:
// a.) External CSS file
// b.) locally scoped classes
import styles from "./Alert.module.css";

export const Alert = ({ children, type = "success" }) => {
    // 1.) Inline Styles
    // the use of double curly braces: First One to tell jsx it is an js expression and second one to define a js object
    // return (
    //     <div
    //         style={{
    //             backgroundColor: type === "success" ? "#10b981" : "#ef4444",
    //             color: "#000",
    //             padding: "16px",
    //             margin: "16px",
    //             borderRadius: "8px",
    //         }}
    //     >
    //         {children}
    //     </div>
    // );

    // 2.) External CSS
    // return <div className={`alert ${type}`}>{children}</div>;

    // 3.) External Module CSS
    // CSS module generate unique class name so that it can be made locally scoped
    // the button component having the error class will be unaffected.
    return <div className={`${styles.alert} ${styles[type]}`}>{children}</div>;
};
