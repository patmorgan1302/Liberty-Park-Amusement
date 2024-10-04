import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import './Components_Css/Header.css';

const Header = () => {
    return (
        <header className="header">
            <Navbar bg='light' expand='md' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>
                        {/* <img src='./Components_Css/libertypark.ico' alt='Liberty Park Amusement' /> */}
                            Liberty Park Amusement
                        </Navbar.Brand>
                    </LinkContainer>
                    
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                        <Navbar.Collapse id='basic-navbar-nav'>
                            <Nav className='ms-auto'>

                                <LinkContainer to='/cart'>
                                    <Nav.Link>
                                        <FaShoppingCart /> Cart
                                    </Nav.Link>
                                </LinkContainer>

                                <LinkContainer to='/login'>
                                    <Nav.Link href='/login'>
                                        <FaUser /> Login
                                    </Nav.Link>
                                </LinkContainer>
                               
                            </Nav>
                        </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
};

export default Header;