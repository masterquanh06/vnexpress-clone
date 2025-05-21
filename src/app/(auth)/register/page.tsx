'use client';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { register } from '@/services/authService';

type FormData = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function Register() {
    const router = useRouter();
    const [validated, setValidated] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setShowError(true);
            setErrorMessage('Mật khẩu và xác nhận mật khẩu không khớp.');
            return;
        }

        try {
            setLoading(true);
            await register({
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });
            alert('Đăng ký thành công!');
            router.push('/login');
        } catch (error: any) {
            setShowError(true);
            setErrorMessage(error.response?.data?.message || 'Đăng ký thất bại, vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Đăng ký tài khoản</title>
                <meta name="description" content="Trang đăng ký tài khoản" />
            </Head>

            <Container fluid className="bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
                <Row className="justify-content-center w-100">
                    <Col xs={12} sm={10} md={8} lg={6} xl={5}>
                        <Card className="shadow-sm border-0">
                            <Card.Body className="p-4">
                                <div className="text-center mb-4">
                                    <h2 className="fw-bold">Đăng ký tài khoản</h2>
                                    <p className="text-muted">Vui lòng nhập thông tin để tạo tài khoản mới</p>
                                </div>

                                {showError && (
                                    <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
                                        {errorMessage}
                                    </Alert>
                                )}

                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="username">
                                        <Form.Label>Tên người dùng</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="username"
                                            placeholder="Nhập tên người dùng"
                                            value={formData.username}
                                            onChange={handleChange}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Vui lòng nhập tên người dùng.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="Nhập địa chỉ email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Vui lòng nhập email hợp lệ.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label>Mật khẩu</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="Nhập mật khẩu"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            minLength={6}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Mật khẩu phải có ít nhất 6 ký tự.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-4" controlId="confirmPassword">
                                        <Form.Label>Xác nhận mật khẩu</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Nhập lại mật khẩu"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                            minLength={6}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Vui lòng xác nhận mật khẩu.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Check
                                            required
                                            label="Tôi đồng ý với điều khoản và điều kiện"
                                            feedback="Bạn phải đồng ý trước khi đăng ký."
                                            feedbackType="invalid"
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className="w-100 py-2" disabled={loading}>
                                        {loading ? <Spinner animation="border" size="sm" /> : 'Đăng ký'}
                                    </Button>

                                    <div className="text-center mt-4">
                                        <p className="mb-0">
                                            Đã có tài khoản?{' '}
                                            <Link href="/login" className="text-decoration-none fw-bold">
                                                Đăng nhập
                                            </Link>
                                        </p>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
