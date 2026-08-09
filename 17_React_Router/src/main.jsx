import { createRoot } from "react-dom/client";

// createBrowserRouter creates the application's route configuration. It uses the browser's URL (history API) to determine which UI to render.
import { createBrowserRouter } from "react-router";

// RouterProvider makes the router available to the entire React application. It watches the URL and renders the matching route.
import { RouterProvider } from "react-router/dom";

import App from "./App";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";
import { Redirect } from "./pages/Redirect";
import { Error } from "./pages/Error";
import { ProtectedRoute } from "./component/ProtectedRoute";
import { Dashboard } from "./pages/Dashboard";
import { Post } from "./pages/Post";

import "./index.css";

// There are 3 modes: each mode gives React Router progressively more responsibility.
// Declarative:
// Only routing (<Routes>, <Route>, navigation).
// You handle data fetching yourself, for example with useEffect etc.
// Use it when: you want straightforward client-side routing and don't need React Router to manage your data loading.

// Data Mode:
// Routing + data fetching/mutations (loaders, actions, pending states).
// Data Mode adds data loading and mutations to the routing system
// Use it when: your app has meaningful route-based data fetching and mutations.

// Framework Mode:
// Full application routing framework (SSR, code splitting, loaders/actions, deployment features).
// React Router becomes more like an application framework rather than simply a routing library.
// Use it when: you're building a larger production application and want React Router to provide the application's routing/data architecture.

// Simple way to remember
// Declarative --> "I need routing."
// Data --> "I need routing + route-aware data."
// Framework --> "I want React Router to structure my whole web app."

// The router is the central configuration for our application's URLs.
// Each object inside this array represents a route.
// The route tree looks like this:
// /
// ├── Home
// ├── /contact-us
// └── /about
// App is the parent route, so it acts as a layout for all of its child routes.

// createBrowserRouter accepts an array of object and these objects are called route objects
const router = createBrowserRouter([
    {
        // The parent route matches the root URL: "/"
        path: "/",

        // App is rendered whenever this parent route matches.
        // Without App element we'll have prefix route.
        // Prefix Route: A route with just a path and no component creates a group of routes with a path prefix. This creates the routes without introducing a layout component.

        element: <App />,

        // Route/loader/rendering error --> errorElement --> Error.jsx
        // errorElement: <Error />,

        // These routes are nested inside the "/" route. Because they are children of App, their components will be rendered wherever <Outlet /> is placed inside App.
        children: [
            // Index routes are defined by setting index: true on a route object without a path. Index routes render into their parent's Outlet at their parent's URL (like a default child route).
            // Eg: When the parent path "/" is matched exactly, render the Home component. So: "/" -> Home
            // Note that index routes can't have children.
            { index: true, Component: Home },

            // This path is relative to the parent "/".
            // "contact-us" becomes: "/" + "contact-us" = "/contact-us"
            { path: "contact-us", Component: Contact },

            // Similarly, this becomes the URL "/about".
            { path: "about", Component: About },

            { path: "home", Component: Redirect },

            // ":postId" is a dynamic route segment. Any single URL segment at this position will match this route. Example: "/123" -> postId = "123"
            // Order in which routes are defined
            // This dynamic route can match any single path segment such as "/123", "/abc", or "/hello".
            // More specific routes such as "about" and "dashboard" are defined separately, so they match their specific paths instead of being treated as post IDs.

            {
                path: ":postId",
                Component: Post,
                // Loader:  Route loaders provide data to route components before they are rendered.
                loader: ({ params }) => {
                    return { message: "Hello" };
                },
                // Action: Route actions allow server-side data mutations with automatic revalidation of all loader data on the page when called from <Form>, useFetcher, and useSubmit.
                action: async ({ request }) => {
                    const data = await request.formData();
                    const todo = await fakeDb.addItem({
                        title: data.get("title"),
                    });
                    return { ok: true };
                },
            },

            // Splats: Also known as "catchall" and "star" segments. If a route path pattern ends with /* then it will match any characters following the /, including other / characters.
            {
                path: "files/*",
                loader: async ({ params }) => {
                    params["*"]; // will contain the remaining URL after files/
                },
            },
            // const { "*": splat } = params;

            // "*" is a splat/catch-all route. It matches URLs that were not matched by the routes above.
            // Unknown URL --> path: "*" --> NotFound.jsx
            { path: "*", Component: NotFound },
        ],
    },

    // Layout Routes: Omitting the path in a route creates new Nested Routes for its children without adding any segments to the URL.
    {
        // ProtectedRoute decides whether the user is allowed to see Dashboard. If the user is not authenticated/authorized, ProtectedRoute can redirect or render something else instead of Dashboard.
        Component: ProtectedRoute,

        // Route middleware runs sequentially before and after navigations. This gives you a singular place to do things like logging and authentication. The next function continues down the chain, and on the leaf route the next function executes the loaders/actions for the navigation.
        middleware: [isLoggedIn],
        children: [
            {
                path: "/dashboard",
                Component: Dashboard,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    // Create the React application and attach it to the DOM. RouterProvider receives our router and makes React Router responsible for deciding which route should be displayed.
    <RouterProvider router={router} />,
);
