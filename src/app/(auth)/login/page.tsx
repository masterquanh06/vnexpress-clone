'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            // Mô phỏng xử lý đăng nhập
            if (email === 'admin@example.com' && password === 'password') {
                alert('Đăng nhập thành công!');
            } else {
                setShowError(true);
            }
        }

        setValidated(true);
    };

    return (
        <Container fluid className="bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
            <Row className="justify-content-center w-100">
                <Col xs={12} sm={10} md={8} lg={6} xl={4}>
                    <Card className="shadow-sm border-0">
                        <Card.Body className="p-4">
                            <div className="text-center mb-4">
                                <h2 className="fw-bold">Đăng nhập</h2>
                                <p className="text-muted">Vui lòng nhập thông tin đăng nhập của bạn</p>
                            </div>

                            {showError && (
                                <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
                                    Email hoặc mật khẩu không chính xác.
                                </Alert>
                            )}

                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Nhập email của bạn"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Vui lòng nhập email hợp lệ.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="password">
                                    <Form.Label>Mật khẩu</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Nhập mật khẩu của bạn"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={6}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Mật khẩu phải có ít nhất 6 ký tự.
                                    </Form.Control.Feedback>

                                    <Form.Group className="my-3 d-flex align-items-center justify-content-between">
                                        <Form.Check
                                            required
                                            label="Nhớ mật khẩu"

                                        />
                                        <a href="#" className="text-decoration-none small">Quên mật khẩu?</a>
                                    </Form.Group>

                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100 py-2">
                                    Đăng nhập
                                </Button>

                                <div className="text-center mt-4">
                                    <p className="mb-0">
                                        Chưa có tài khoản? <Link href="/register" className="text-decoration-none fw-bold">Đăng ký</Link>
                                    </p>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}