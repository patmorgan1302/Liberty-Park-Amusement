import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import './Components_Css/Header.css';

const Header = () => {
    const { cartItems } = useSelector((state) => state.cart); // Destructure cart from state to get cartItems

    console.log(cartItems);
    return (
        <header className="header">
            <Navbar bg='light' expand='md' collapseOnSelect className="navbar">
                <Container>
                    <LinkContainer to='/' className="linkcontainer">
                        <Navbar.Brand style={{color: 'white'}}>
                        {/* <img src='./Components_Css/libertypark.ico' alt='Liberty Park Amusement' /> */}
                            Liberty Park Amusement
                        </Navbar.Brand>
                    </LinkContainer>
                    
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                        <Navbar.Collapse id='basic-navbar-nav'>
                            <Nav className='ms-auto'>

                                <LinkContainer to='/cart' className="linkcontainer">
                                    <Nav.Link >
                                        <FaShoppingCart style={{color: 'white'}}/> Cart
                                        {cartItems.length > 0 && (
                                    <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                                    </Badge>
                                    )}
                                    </Nav.Link>
                                </LinkContainer>

                                <LinkContainer to='/login' className="linkcontainer">
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