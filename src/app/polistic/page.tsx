'use client';
import axios from "axios";
import Link from "next/link";
import { Card } from "react-bootstrap";
import useSWR from "swr";

const fetcher = async (url: string) => await axios.get(url).then(res => res.data);

function Polistic() {
    const { data, error, isLoading } = useSWR(
        'http://localhost:8000/v1/posts?category=polistic',
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    if (isLoading) return <p>Đang tải...</p>;
    if (error) return <p>Lỗi khi tải bài viết!</p>;

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Tin Tức Chính Trị</h2>
            <div className="row">
                {data.map((post: any) => (
                    <div key={post._id} className="col-md-4 mb-4">
                        <Card className="h-100 shadow-sm">
                            {post.imageUrl && (
                                <Card.Img
                                    variant="top"
                                    src={post.imageUrl}
                                    alt={post.title}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                            )}
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text className="flex-grow-1">
                                    {post.content.length > 120
                                        ? post.content.slice(0, 120) + "..."
                                        : post.content}
                                </Card.Text>
                                <Link
                                    href={`/polistic/${post._id}`}
                                    className="btn btn-primary mt-auto"
                                >
                                    Xem thêm
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Polistic;
