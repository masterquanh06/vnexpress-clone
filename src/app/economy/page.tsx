'use client';
import axios from "axios";
import Link from "next/link";
import { Card, Col, Container, Row } from "react-bootstrap";
import useSWR from "swr";

const fetcher = async (url: string) => await axios.get(url).then(res => res.data);

function Economy() {
    const { data, error, isLoading } = useSWR(
        `http://localhost:8000/v1/posts?category=economy`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    if (isLoading) return <p className="text-center mt-5">Đang tải...</p>;
    if (error) return <p className="text-danger text-center mt-5">Lỗi khi tải bài viết!</p>;

    return (
        <Container className="mt-5">
            <h2 className="mb-4 text-center">Tin Tức Kinh Tế</h2>
            <Row xs={1} sm={2} md={3} className="g-4">
                {data.map((post: any) => (
                    <Col key={post._id}>
                        <Card className="h-100 shadow-sm">
                            <Card.Img
                                variant="top"
                                src={post.imageUrl}
                                alt={post.title}
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text className="flex-grow-1">
                                    {post.content.length > 120
                                        ? post.content.slice(0, 120) + "..."
                                        : post.content}
                                </Card.Text>
                                <Link
                                    href={`/economy/${post._id}`}
                                    className="btn btn-primary mt-auto"
                                >
                                    Xem thêm
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Economy;
