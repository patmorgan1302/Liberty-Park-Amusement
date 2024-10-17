import { Row, Col, Container, Image } from 'react-bootstrap';
import Product from '../Components/Product';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
// import LibertyPark from './libertypark.jpeg';
import FallFrenzy from './FallFrenzy.png';
import { useGetProductsQuery } from '../Slices/productsApiSlice';
import styles from './HomeScreen.css';


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
                    <Image src={FallFrenzy} alt='Liberty Park' fluid />
                </Row>
                <Row>
                    <Col>
                        <div >
                            <h1 style={{
                                marginTop: '45px',
                                color: '#fff2e6',
                                textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
                                textDecoration: 'underline'


                            }}>Latest Products</h1>
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