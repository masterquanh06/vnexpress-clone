'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';
function Page() {
    const handleBtn = () => {
        router.push('/');
    };
    const router = useRouter();
    return (
        <div>
            Facebook page
            <div>
                <Button variant='danger'>Hỏi dân it</Button>
                <button onClick={handleBtn}>Back Home</button>
            </div>
        </div>
    );
}

export default Page;