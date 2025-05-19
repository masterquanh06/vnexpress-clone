// pages/register.js
'use client';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

export default function Register() {
    const [validated, setValidated] = useState(false);
    const [showError, setShowError] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setShowError(true);
            return;
        }

        // Xử lý đăng ký ở đây
        console.log('Form data:', formData);
        alert('Đăng ký thành công!');
    };

    return (
        <>
            <Head>
                <title>Đăng ký tài khoản</title>
                <meta name="description" content="Trang đăng ký tài khoản" />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                />
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
                                        Mật khẩu và xác nhận mật khẩu không khớp.
                                    </Alert>
                                )}

                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="fullName">
                                        <Form.Label>Họ và tên</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="fullName"
                                            placeholder="Nhập họ và tên của bạn"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Vui lòng nhập họ và tên.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="Nhập địa chỉ email của bạn"
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
                                            placeholder="Nhập mật khẩu của bạn"
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
                                            placeholder="Nhập lại mật khẩu của bạn"
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

                                    <Button variant="primary" type="submit" className="w-100 py-2">
                                        Đăng ký
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