import { useState, useEffect } from "react";
import axios from "axios";

export const DataFetching = () => {
    const [posts, setPosts] = useState([]);
    const [postId, setPostId] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `https://jsonplaceholder.typicode.com/posts/${postId}`,
                );
                console.log(res.data);
                if (postId !== "") {
                    setPosts(res.data.slice(0, 10));
                } else {
                    setPosts([res.data]);
                }
            } catch {
                console.error(err);
            }
        };
        fetchData();
    }, [postId]);

    return (
        <div>
            <input
                type="text"
                value={postId}
                onChange={(e) => {
                    setPostId(e.target.value);
                }}
            />
            {posts && (
                <>
                    <h2>Posts:</h2>
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            style={{
                                margin: "1rem",
                                textAlign: "left",
                            }}
                        >
                            <p>
                                {post.id} title: {post.title}
                            </p>
                            <p>body: {post.body}</p>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};
