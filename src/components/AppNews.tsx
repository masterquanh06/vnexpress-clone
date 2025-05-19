'use client';

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge, Card, Carousel, Col, Container, Image, Row } from 'react-bootstrap';
import useSWR from 'swr';

const fetcher = async (url: string) => await axios.get(url).then(res => res.data);

export default function AppNews() {
    const { data, error, isLoading } = useSWR(
        'http://localhost:8000/v1/posts',
        fetcher,
        {
            fallbackData: {
                news: [],
                sideNews: [],
                additionalNews: [],
                bookNews: [],
            },
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    if (isLoading) return <p>Đang tải...</p>;
    if (error) return <p>Lỗi khi tải bài viết!</p>;

    // Giải nén dữ liệu từ API
    const { news = [], sideNews = [], additionalNews = [], bookNews = [] } = data;

    return (
        <Container className="py-4">
            <Row>
                <Col md={3}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Badge bg="warning" text="dark" className="mb-2">Cách mạng tinh gọn bộ máy</Badge>
                            <Badge bg="info" text="dark" className="mb-2 mx-2">50 năm giải phóng miền Nam</Badge>
                            <Badge bg="danger" text="white" className="mb-2">Sắp nhập tỉnh th ành</Badge>
                        </Card.Body>
                    </Card>
                    {sideNews.map((item: any) => (
                        <Card key={item.id} className="mb-3">
                            <Row className="g-0">
                                <Col md={4}>
                                    <Image src={item.image} alt={item.title} fluid />
                                </Col>
                                <Col md={8}>
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: '1rem' }}>{item.title}</Card.Title>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                </Col>
                <Col md={6}>
                    {news.map((item) => (
                        <Card key={item.id} className="mb-3">
                            <Card.Img variant="top" src={item.image} />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>{item.description}</Card.Text>
                                <ul>
                                    {item.details.map((detail: string, index: number) => (
                                        <li key={index}>{detail}</li>
                                    ))}
                                </ul>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
                <Col md={3}>
                    {additionalNews.map((item) => (
                        <Card key={item.id} className="mb-3">
                            <Row className="g-0">
                                <Col md={4}>
                                    <Image src={item.image} alt={item.title} fluid />
                                </Col>
                                <Col md={8}>
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: '1rem' }}>{item.title}</Card.Title>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h3 className="text-danger">BOOKS</h3>
                    <Carousel>
                        {bookNews.map((item) => (
                            <Carousel.Item key={item.id}>
                                <Row>
                                    <Col md={3}>
                                        <Image src={item.image} alt={item.title} fluid />
                                    </Col>
                                    <Col md={9}>
                                        <h5>{item.title}</h5>
                                    </Col>
                                </Row>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>
            </Row>
        </Container>
    );
}
