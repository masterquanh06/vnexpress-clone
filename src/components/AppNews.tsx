'use client';

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import useSWR from 'swr';

const fetcher = async (url: string) => await axios.get(url).then(res => res.data);

export default function AppNews() {
    const { data, error, isLoading } = useSWR(
        'http://localhost:8000/v1/posts',
        fetcher,
        {

            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    if (isLoading) return <p>Đang tải...</p>;
    if (error) return <p>Lỗi khi tải bài viết!</p>;

    // Giải nén dữ liệu từ API

    return (
        <Container className="py-4">
            <h2 className="mb-4 text-center">Tin Tức</h2>
            <div className="row">
                {data.map((post: any) => (
                    <div key={post._id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="card-img-top"
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text flex-grow-1">
                                    {post.content.length > 120
                                        ? post.content.slice(0, 120) + '...'
                                        : post.content}
                                </p>
                                <a href={`/economy/${post._id}`} className="btn btn-primary mt-auto">
                                    Xem thêm
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
}
