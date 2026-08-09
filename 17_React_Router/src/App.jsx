import "./App.css";

// Link and NavLink are React Router components used for client-side navigation.
// They update the URL and render the matching route without causing a full page reload.
import { Link, NavLink } from "react-router";

// Outlet is the placeholder where the currently matched child route will be rendered.
import { Outlet } from "react-router";

// App acts as the layout for our nested routes. The route configuration says:
//  "/"           -> App + Home
//  "/contact-us" -> App + Contact
//  "/about"      -> App + About
// App itself does not change when we move between these routes. Only the content inside <Outlet /> changes.
function App() {
    // NavLink can automatically tell us whether its route is currently active. React Router passes an object to the style function:
    // { isActive: true }  -> The current URL matches this NavLink
    // { isActive: false } -> The current URL does not match this NavLink
    // We can use isActive to change the appearance of the active navigation link.

    const navStyle = ({ isActive }) => {
        return {
            textDecoration: "none",
            fontWeight: isActive ? "bold" : "normal",
        };
    };

    const random = Math.floor(Math.random() * 20) + 1;
    return (
        <div>
            <h1>App</h1>

            {/* <Link> is React Router's basic navigation component. It is used when we simply want to navigate to another route. <Link> performs client-side navigation.
            The "to" prop specifies the URL that React Router should navigate to.
            This means React Router changes the URL and renders the matching route without requesting a completely new HTML page from the server.
            <a href="/about">: Browser navigation --> Page may reload
            <Link to="/about">: React Router navigation --> URL changes --> Matching route renders --> No full page reload             
            It does NOT automatically provide information about whether the link is currently active.
             */}
            <div
                style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "center",
                    margin: "2rem",
                }}
            >
                <Link to="/contact-us">Contact</Link>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </div>
            {/*
            <NavLink> is similar to <Link>, but it is designed specifically for navigation menus where we want to know which route is active.
            NavLink provides an "isActive" value that we can use to change the appearance of the currently active link.
            For example, if the current URL is "/about":
            About   -> isActive: true
            Home    -> isActive: false
            Contact -> isActive: false
            This makes NavLink useful for Navigation bars, Sidebars, Menus, Tabs
            The "style" prop can receive a function. React Router calls that function and gives us information about the current state of the link.
            */}
            <div
                style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "center",
                    margin: "2rem",
                }}
            >
                <NavLink to="/contact-us" style={navStyle}>
                    Contact
                </NavLink>
                <NavLink to="/" style={navStyle}>
                    Home
                </NavLink>
                <NavLink to="/about" style={navStyle}>
                    About
                </NavLink>
                <NavLink to={`/${random}`} style={navStyle}>
                    Post
                </NavLink>
                <NavLink to="/dashboard" style={navStyle}>
                    Dashboard
                </NavLink>
            </div>

            {/*
            <Outlet /> is one of the most important concepts when learning nested routes.
            React Router looks at the current URL and renders the matching child route here.
            For example:
            URL: "/" * Outlet -> <Home />
            URL: "/contact-us" Outlet -> <Contact />
            URL: "/about" Outlet -> <About />
            Think of Outlet as: "Put the currently matched child route here."
            */}
            <Outlet />
        </div>
    );
}

export default App;
