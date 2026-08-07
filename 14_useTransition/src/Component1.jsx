import { useState, useEffect, useTransition } from "react";
import Names from "./MOCK_DATA.json";
import { useDebounced } from "./hooks/useDebounced.jsx";

export const Component1 = () => {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);

    const [isPending, startTransition] = useTransition();
    const debouncedQuery = useDebounced(query);

    useEffect(() => {
        startTransition(() => {
            if (!debouncedQuery.trim()) {
                setResult(Names);
                return;
            }
            const filteredNames = Names.filter((name) => {
                const searchedQuery = debouncedQuery.toLowerCase();
                return (
                    name.first_name.toLowerCase().includes(searchedQuery) ||
                    name.last_name.toLowerCase().includes(searchedQuery)
                );
            });
            setResult(filteredNames);
        });
    }, [debouncedQuery]);

    return (
        <div>
            <div>
                <input
                    type="text"
                    name="query"
                    id="query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <h1>Names:</h1>

            {isPending && <p>Searching...</p>}

            {result.map((name) => (
                <div key={name.id}>
                    <h5>
                        {name.first_name} {name.last_name}
                    </h5>
                </div>
            ))}
        </div>
    );
};
