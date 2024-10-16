import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLogoutMutation } from '../Slices/usersApiSlice';
import { logout } from '../Slices/authSlice';
import { useNavigate } from 'react-router-dom';
// import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import './Components_Css/Header.css';

const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth); // Destructure cart from state to get cartItems

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();
    
    const logoutHandler = async () => {
      try {
          await logoutApiCall().unwrap();
          dispatch(logout());
          // dispatch(resetCart());
          navigate('/login');
      } catch (err) {
          console.log(err);
      }
  }
    return (
        <header>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect={true} >
        <Container>
          <Navbar.Brand eventkey="3" as={Link} to='/' style={{ color: 'black'} }>
            Liberty Park Amusement
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav' >
            <Nav className='ms-auto'>
              <Nav.Link eventkey="1" as={Link} to='/cart' style={{ color: 'black'}}>
                <FaShoppingCart /> Cart
                {cartItems.length > 0 && (
                  <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </Badge>
                )}
              </Nav.Link>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username' style={{ color: 'black'}}>
                    <NavDropdown.Item eventkey="2"as={Link} to='/profile' style={{ color: 'black'}}>
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item eventkey="5"to='/login' onClick={logoutHandler} style={{ color: 'black'}}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link eventkey="4"as={Link} to='/login' style={{ color: 'black'}}>
                  <FaUser /> Sign In
                </Nav.Link>
              )}

              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
    )
};

export default Header;