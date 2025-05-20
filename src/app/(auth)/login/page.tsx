'use client';
import { login } from '@/services/authService';
import { useAuthStore } from '@/stores/authStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

export default function LoginPage() {
    const router = useRouter();
    const setAccessToken = useAuthStore((state) => state.setAccessToken);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (!form.checkValidity()) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        try {
            const res = await login({ username, password });
            const token = res.data.accessToken;
            const user = res.data.user || res.data;
            console.log("dsadas", res.data);
            localStorage.setItem('accessToken', token);
            if (user.admin === true) {
                router.push('/admin');
            } else {
                router.push('/');
            }

        } catch (error: any) {
            console.error(error);
            setShowError(true);
            setErrorMessage(error?.response?.data?.message || 'Đăng nhập thất bại.');
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
                                    {errorMessage}
                                </Alert>
                            )}

                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="username"
                                        placeholder="Nhập username của bạn"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Vui lòng nhập username hợp lệ.
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
                                        <Form.Check label="Nhớ mật khẩu" />
                                        <a href="#" className="text-decoration-none small">Quên mật khẩu?</a>
                                    </Form.Group>
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100 py-2">
                                    Đăng nhập
                                </Button>

                                <div className="text-center mt-4">
                                    <p className="mb-0">
                                        Chưa có tài khoản?{' '}
                                        <Link href="/register" className="text-decoration-none fw-bold">
                                            Đăng ký
                                        </Link>
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
