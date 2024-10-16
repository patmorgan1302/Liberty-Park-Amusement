import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import CheckoutSteps from '../Components/CheckoutSteps';
import { toast } from 'react-toastify';
import { useCreateOrderMutation } from '../Slices/ordersApiSlice';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { clearCartItems } from '../Slices/cartSlice';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);

    const [createOrder, { isLoading }] = useCreateOrderMutation();

    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate('/payment');
        } else if (!cart.shippingAddress) {
            navigate('/shipping');
        }
    }, [cart.paymentMethod, cart.shippingAddress, navigate]);

    const placeOrderHandler = async () => {
        try {
        const res = await createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }).unwrap();
        dispatch(clearCartItems());
        navigate(`/order/${res._id}`);
        } catch (err) {
        toast.error(err);
        }
    }

    return (
        <>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
            <Col md={8}>
                <Card>
                <ListGroup variant='flush' rounded>
                    <ListGroupItem>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address:</strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city},
                            {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                        </p>
                    </ListGroupItem>

                    <ListGroupItem>
                        <h2>Payment Method</h2>
                        <strong>Method:</strong>
                        {cart.paymentMethod}
                    </ListGroupItem>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? (
                            <Message>Your Cart is Empty</Message>
                        ) : (
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={2}>
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fluid
                                                rounded
                                            />
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item._id}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                            {item.qty} x ${item.price} = $
                                            {(item.qty * (item.price * 100)) / 100}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
                </Card>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items:</Col>
                                <Col>
                                    ${cart.itemsPrice}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                            <Col>Shipping</Col>
                            <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                            <Col>Tax</Col>
                            <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                            <Col>Total</Col>
                            <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        {/* <ListGroup.Item>
                            { error && <Message variage='danger'>{error}</Message>}
                        </ListGroup.Item> */}

                        <ListGroup.Item>
                        <Button
                            type='button'
                            className='btn-block'
                            disabled={cart.cartItems === 0}
                            onClick={placeOrderHandler}
                        >
                        Place Order
                        </Button>

                        {isLoading && <Loader />}

                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </>
    );
};

export default PlaceOrderScreen;