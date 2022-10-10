import React from "react";


import { Navbar, Container, Nav, Button } from 'react-bootstrap'

import logo from "../img/logo.png"

const Menu = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand to="/">
                        <img
                            src={logo}
                            width="90"
                            height="40"
                            className="d-inline-block align-top"
                            alt="Motopres logo"
                        />{' '}
                        Motopres
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}

export default Menu


