import axios from "axios";

interface Post {
    _id: string;
    title: string;
    content: string;
    author: string;
    imageUrl: string;
}

export default async function PostDetail({ params }: { params: { id: string } }) {
    const res = await axios.get(`http://localhost:8000/v1/posts/${params.id}`);
    const post: Post = res.data;

    return (
        <div style={{ padding: '2rem' }}>
            <h1>{post.title}</h1>
            <p><strong>Tác giả:</strong> {post.author}</p>
            {post.imageUrl && (
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', margin: '1rem 0' }}
                />
            )}
            <p style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p>
        </div>
    );
}
