import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLogoutMutation } from '../Slices/usersApiSlice';
import { logout } from '../Slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Components_Css/Header.css';
import { LinkContainer } from 'react-router-bootstrap';

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
          <Navbar.Brand eventkey="3" as={Link} to='/' style={{ color: 'black'}}>
            Liberty Park Amusement
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav' >
            <Nav className='ms-auto'>
              <Nav.Link eventkey="1" as={Link} to='/cart' >
                <FaShoppingCart /> Cart
                {cartItems.length > 0 && (
                  <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </Badge>
                )}
              </Nav.Link>
              {userInfo? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <NavDropdown.Item eventkey="2"as={Link} to='/profile' >
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item eventkey="5"to='/login' onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer eventkey='6' to='/login' >
                   <Nav.Link eventkey="4"as={Link} to='/login' >
                      <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
               
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu' >
                  <LinkContainer eventkey="7" to='/admin/userlist' >
                    <NavDropdown.Item eventkey="8" as={Link} to='/admin/userlist' >
                      Users
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer eventkey="9" to='/admin/productlist'>
                    <NavDropdown.Item eventkey="10" as={Link} to='/admin/productlist' >
                      Products
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer eventkey="11" to='/admin/orderlist' >
                    <NavDropdown.Item eventkey="12" as={Link} to='/admin/orderlist' >
                      Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
    )
};

export default Header;