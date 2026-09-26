function Post({ post }) {
    return (
        <article>
            <h3>{post.title}</h3>

            <p>{post.body}</p>
        </article>
    );
}

export default Post;
