// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import { fetchPosts } from "./postsSlice.js";

// import {
//     selectPosts,
//     selectPostsLoading,
//     selectPostsError,
// } from "./postsSelector.js";

// import Post from "./Post.jsx";

// function Posts() {
//     const dispatch = useDispatch();

//     const posts = useSelector(selectPosts);
//     const loading = useSelector(selectPostsLoading);
//     const error = useSelector(selectPostsError);

//     useEffect(() => {
//         dispatch(fetchPosts());
//     }, [dispatch]);

//     if (loading) {
//         return <p>Loading posts...</p>;
//     }

//     if (error) {
//         return <p>Error: {error}</p>;
//     }

//     return (
//         <div>
//             <h2>Posts</h2>

//             {posts.map((post) => (
//                 <Post key={post.id} post={post} />
//             ))}
//         </div>
//     );
// }

// export default Posts;

// using RTK Query
import {
    useGetPostsQuery,
    useCreatePostMutation,
} from "../../app/api/apiSlice.js";
function Posts() {
    const { data: posts = [], isLoading, isError, error } = useGetPostsQuery();
    // When the above command runs. RTK Query essentially handles:
    // Component  -->  useGetPostsQuery()  -->  Check cache  -->  Need data?  -->  API request  -->  Store result  -->  Component receives data
    // It also tracks request state.
    if (isLoading) {
        return <p>Loading posts...</p>;
    }
    if (isError) {
        return <p>Something went wrong. {error}</p>;
    }

    // const [createPost, { isLoading, isSuccess, isError }] = useCreatePostMutation();
    return (
        <div>
            <h2>Posts</h2>
            {posts.map((post) => (
                <article key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </article>
            ))}
        </div>
    );
}
export default Posts;
