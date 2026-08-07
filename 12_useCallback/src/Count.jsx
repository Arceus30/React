export const Count = ({ text, count }) => {
    console.log(`Rendering ${text}`);
    return (
        <div>
            {text} - {count}
        </div>
    );
};

// import { memo } from "react";
// export const Count = memo(({ text, count }) => {
//     console.log(`Rendering ${text}`);
//     return (
//         <div>
//             {text} - {count}
//         </div>
//     );
// });
