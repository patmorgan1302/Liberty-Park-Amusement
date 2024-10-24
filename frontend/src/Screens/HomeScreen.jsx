import { Row, Col, Image } from 'react-bootstrap';
import Product from '../Components/Product';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import GHOST from './GHOST.jpg';
import { useGetProductsQuery } from '../Slices/productsApiSlice';
import ProductCarousel from '../Components/ProductCarousel';


const HomeScreen = () => {
    const { data: products, isLoading, error } = useGetProductsQuery();


    return (
        <>

            {isLoading ? (
                <Loader />
            ) : error ? ( 
                <Message variant='danger'>{ error?.data?.message || error.error} </Message>
            ) : (
            <>
                <Row>
                    <Image src={GHOST} alt='Liberty Park' fluid />
                </Row>
                <Row className='my-4'>
                    <Col>
                    <h1 style={{
                                marginTop: '45px',
                                marginBottom: '25px',
                                color: '#6d6d6d',
                                fontSize: '2rem',
                                textDecoration: 'underline',
                                textShadow: '1px 1px 2px #faf73c'
                            }}>Featured Menu Items</h1>
                    <ProductCarousel />
                    </Col>
                        
                </Row>
                <Row>
                    <Col>
                        <div >
                            
                            <Row>
                                {products.map((product) => (
                                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product={product} />
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </Col>
                </Row>
            </>
            )}
          </>
    )
};

export default HomeScreen;