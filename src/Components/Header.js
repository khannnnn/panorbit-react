import React from 'react';
import {
    Navbar, Nav, NavDropdown, Card, Button, DropdownButton, Dropdown,
    Image
} from 'react-bootstrap';
import {
    List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography,
    Tooltip
} from '@material-ui/core';

class Header extends React.Component {
    render() {
        return (
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Nav>
                    <DropdownButton alignRight id="dropdown-menu-align-right" title="Irfan">
                        <Card.Body>
                            <Card.Img variant="top" src="https://www.online-image-editor.com/styles/2019/images/power_girl_editor.png" />
                            <Card.Title>Irfan Kha</Card.Title>
                            <Card.Text>About user</Card.Text>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                <ListItemText style={{ paddingTop: "10px" }}
                                    primary="Irfan Khan"
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </Card.Body>
                    </DropdownButton>
                </Nav>
            </Navbar>
        )
    }
}

export default Header;