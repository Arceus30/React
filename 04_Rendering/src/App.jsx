import "./App.css";
import { UserDetails } from "./UserDetails";
import { ProductList } from "./ProductList";

function App() {
    return (
        <div>
            <UserDetails
                name="Clark Kent"
                isOnline={true}
                isPremium={true}
                role="admin"
            />
            <UserDetails name="Bruce Wayne" isOnline={false} isNew={true} />
            <ProductList />
        </div>
    );
}

export default App;
