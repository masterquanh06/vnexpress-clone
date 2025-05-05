'use client'

import { Bell, Search } from 'lucide-react';
import Link from "next/link";
import { Container, Nav, Navbar } from "react-bootstrap";
const AppHeader = () => {
    return (

        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>
                    <Link href={"/"} className="nav-link">Vn-express</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav justify-content-end">
                    <Nav className="me-auto">
                        <Link href={"/politics"} className="nav-link">Politic</Link>
                        <Link href={"/economy"} className="nav-link">Economy</Link>
                        <Link href={"/technology"} className="nav-link">Technology</Link>
                    </Nav>
                    <Nav>
                        <Link href={"/login"} className="nav-link">Login</Link>
                    </Nav>
                    <Search className="mx-2" size={20} color="#000" />
                    <Bell className="mx-2" size={20} color="#000" />
                </Navbar.Collapse>
            </Container>
        </Navbar>


    )

}

export default AppHeader;