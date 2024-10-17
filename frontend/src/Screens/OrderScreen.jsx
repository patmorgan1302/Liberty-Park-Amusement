import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { 
    Row, 
    Col, 
    Image, 
    ListGroup, 
    Card, 
    Button 
} from 'react-bootstrap';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { 
    PayPalButtons, 
    usePayPalScriptReducer 
} from '@paypal/react-paypal-js'; 
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { 
    useGetOrderDetailsQuery, 
    usePayOrderMutation, 
    useGetPayPalClientIdQuery,
    useDeliverOrderMutation 
} from '../Slices/ordersApiSlice';

const OrderScreen = () => {
    const { id: orderId } = useParams(); // get the order id from the URL

    const { data: order, refetch, error, isLoading } = useGetOrderDetailsQuery(orderId);

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

    const [deliverOrder, { isLoading: loadingDeliver}] = useDeliverOrderMutation();

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    const { 
        data: paypal, 
        isLoading: loadingPayPal, 
        error: errorPayPal 
    } = useGetPayPalClientIdQuery();

    const { userInfo } = useSelector(state => state.auth);

    useEffect(() => {
        if (!errorPayPal && !loadingPayPal && paypal.clientId) {
          const loadPaypalScript = async () => {
            paypalDispatch({
              type: 'resetOptions',
              value: {
                'client-id': paypal.clientId,
                currency: 'USD',
              },
            });
            paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
          };
          if (order && !order.isPaid) {
            if (!window.paypal) {
              loadPaypalScript();
            }
          }
        }
      }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

    function onApprove(data, actions) {
        return actions.order.capture().then(async function(details) { 
            try {
                await payOrder({ orderId, details });
                toast.success('Order Paid');
                refetch();
            } catch (err){
                toast.error(err?.data?.message || err.message);
            }
        })
    };


    async function onApproveTest() {
                await payOrder({ orderId, details: { payer: {} } });
                toast.success('Order Paid');
                refetch();
    };


    function onError(err) {
        toast.error(err.message);
    };


    function createOrder(data, actions) {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: order.totalPrice,
                    },
                },
            ],
        }).then((orderID) => {
            return orderID;
        });
    }

    const deliverOrderHandler = async () => {
        try {
            await deliverOrder(orderId);
            refetch();
            toast.success('Order Delivered');
        } catch (err) {
            toast.error(err?.data?.message || err.message)
        }
    };


    return (
        isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <>
                <h1>Order {order._id}</h1>
                <Row>
                    <Col md={8}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name:</strong> {order.user.name}
                                    </p>
                                    <p>
                                        <strong>Email:</strong> {order.user.email}
                                    </p>
                                    <p>
                                        <strong>Address:</strong> {' '}{order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                                        {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                    </p>
                                    { order.isDelivered ? (
                                        <Message variant='success'>Delivered At {order.deliveredAt}</Message>
                                    ) : (
                                        <Message variant='danger'>Not Delivered</Message>
                                    )}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h2>Payment Method</h2>
                                    <p>
                                        <strong>Method:</strong> {order.paymentMethod}
                                    </p>
                                    { order.isPaid ? (
                                        <Message variant='success'>Paid On{order.paidAt}</Message>
                                    ) : (
                                        <Message variant='danger'>Not Paid</Message>
                                    )}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h2>
                                        Order Items
                                    </h2>
                                    { order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index} className='py-2' style={{ marginBottom: '10px'}}>
                                            <Row className='my-1'>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card>
                            <ListGroup>
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${order.itemsPrice}</Col>
                                    </Row>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${order.shippingPrice}</Col>
                                    </Row>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${order.taxPrice}</Col>
                                    </Row>
                                    <Row>
                                        <Col>Total Price</Col>
                                        <Col>${order.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                {!order.isPaid && (
                                    <ListGroup.Item>
                                    {loadingPay && <Loader />}

                                    {isPending ? (
                                        <Loader />
                                    ) : (
                                        <div>
                                        {/* THIS BUTTON IS FOR TESTING! REMOVE BEFORE PRODUCTION! */}
                                        <Button
                                            style={{ marginBottom: '10px' }}
                                            onClick={onApproveTest}
                                        >
                                            Test Pay Order
                                        </Button>

                                            <div>
                                                <PayPalButtons
                                                createOrder={createOrder}
                                                onApprove={onApprove}
                                                onError={onError}
                                                ></PayPalButtons>
                                            </div>
                                        </div>
                                    )}
                                    </ListGroup.Item>
                                )}

                                { loadingDeliver && <Loader />}

                                {userInfo && userInfo.isAdmin && order.isPaid &&
                                !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button type='button' className='btn btn-block' 
                                        onClick={deliverOrderHandler}>Mark As Delivered</Button>
                                    </ListGroup.Item>
                                    )}
                                </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </>
        )
    );
};

export default OrderScreen;