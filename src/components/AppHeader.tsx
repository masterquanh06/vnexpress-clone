'use client'

import { useAuthStore } from '@/stores/authStore';
import { Bell, Search } from 'lucide-react';
import Image from 'next/image';
import Link from "next/link";
import { useEffect, useRef, useState } from 'react';
import { Container, Nav, Navbar } from "react-bootstrap";
const AppHeader = () => {
    const { user, logout } = useAuthStore();
    console.log("current user", user);
    const [showMenu, setShowMenu] = useState(false);
    const avatarRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (avatarRef.current && !avatarRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    })
    return (

        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>
                    <Link href={"/"} className="nav-link">
                        <Image src="https://s1.vnecdn.net/vnexpress/restruct/i/v9602/v2_2019/pc/graphics/logo.svg" width={150} height={40} alt='' />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav justify-content-end">
                    <Nav className="me-auto">
                        <Link href={"/polistic"} className="nav-link">Politic</Link>
                        <Link href={"/economy"} className="nav-link">Economy</Link>
                        <Link href={"/technology"} className="nav-link">Technology</Link>
                    </Nav>
                    <Nav className='align-items-center'>
                        {
                            user ? (
                                <div className='d-flex align-items-center' style={{ cursor: 'pointer' }} onClick={() => setShowMenu((prev) => !prev)}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="8" r="4" fill="#222222" />
                                        <path d="M5.33788 17.3206C5.99897 14.5269 8.77173 13 11.6426 13H12.3574C15.2283 13 18.001 14.5269 18.6621 17.3206C18.79 17.8611 18.8917 18.4268 18.9489 19.0016C19.0036 19.5512 18.5523 20 18 20H6C5.44772 20 4.99642 19.5512 5.0511 19.0016C5.1083 18.4268 5.20997 17.8611 5.33788 17.3206Z" fill="#222222" />
                                    </svg>
                                    {showMenu && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '110%',
                                                right: 0,
                                                background: '#fff',
                                                border: '1px solid #eee',
                                                borderRadius: 6,
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                                zIndex: 1000,
                                                minWidth: 120,
                                            }}
                                        >
                                            <button
                                                className="dropdown-item w-100 text-start"
                                                onClick={logout}
                                                style={{ padding: '8px 16px', background: 'none', border: 'none', cursor: 'pointer' }}
                                            >
                                                Đăng xuất
                                            </button>
                                        </div>
                                    )}

                                </div>
                            ) : (
                                <Link href="/login" className="nav-link">Login</Link>
                            )
                        }
                    </Nav>
                    <Search className="mx-2" size={20} color="#000" />
                    <Bell className="mx-2" size={20} color="#000" />
                </Navbar.Collapse>
            </Container>
        </Navbar >


    )

}

export default AppHeader;