import { Row, Col, Image } from 'react-bootstrap';
import Product from '../Components/Product';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { useGetProductsQuery } from '../Slices/productsApiSlice';


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
            <div>
                <Image src={'./LibertyParkAd.jpg'}/>
            </div>
            <div>
                <h1>Latest Products</h1>
                <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            </div>
            </>
            )}
           
       </>
    )
};

export default HomeScreen;