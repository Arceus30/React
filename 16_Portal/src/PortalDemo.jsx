import { createPortal } from "react-dom";

// Portal: A way to render children into a different DOM location
// The important detail is that the DOM location changes, but the React tree does not. Context still works, and events bubble according to the React tree.

// Why use a Portal? It's especially useful for:
// Modals/dialogs
// Popovers
// Tooltips
// Dropdowns
// Toast notifications
// Elements affected by overflow: hidden or stacking contexts

export const PortalDemo = () => {
    return createPortal(
        <h1>Portal Dmeo</h1>,
        document.getElementById("portal-root"),
    );
};
