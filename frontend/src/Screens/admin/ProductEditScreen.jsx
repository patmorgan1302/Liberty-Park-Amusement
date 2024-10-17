import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../Components/Message';
import Loader from '../../Components/Loader';
import FormContainer from '../../Components/FormContainer';
import { toast } from 'react-toastify';
import {
    useUpdateProductMutation,
    useGetProductDetailsQuery
} from '../../Slices/productsApiSlice';

const ProductEditScreen = () => {
    const { id: productId } = useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);
    
    

    return (
        <div>
            Product Edit Screen
        </div>
    );
};

export default ProductEditScreen;