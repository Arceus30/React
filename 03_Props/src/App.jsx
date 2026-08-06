import "./App.css";
import { Welcome } from "./Welcome";
import { Product } from "./Product";
import { UserCard } from "./UserCard";
import { CardWrapper } from "./CardWrapper";

function App() {
    return (
        <div>
            <h1>React</h1>
            <Welcome name="Keshav" />
            <Welcome name="Aditya" />
            <Product
                title="Gaming Laptop"
                price={250000}
                inStock={true}
                categories={["Electronics", "Laptop"]}
            />
            <CardWrapper title="User Profile">
                <UserCard
                    id={102}
                    name="Keshav"
                    age={23}
                    city="Delhi"
                    email="Keshav@gmail.com"
                />
            </CardWrapper>
        </div>
    );
}

export default App;
