import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setProducts } from '../redux/actions/productActions';
import Axios from 'axios';
import '../../src/App.css'
import ProductComponent from '../components/ProductComponent'
import Loader from './Loader';

const ProductListing = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

    const fetchProducts = () => {
        setLoader(true);
        Axios.get("https://fakestoreapi.com/products")
            .then((response) => {
                console.log("res: ", response);
                setLoader(false);
                dispatch(setProducts(response.data));
            })
            .catch((err) => {
                console.log("Error: ", err)
            })
    }

    useEffect(() => {
        fetchProducts();

        //eslint-disable-next-line
    }, []);

    return (
        <div className="full-block" style={{ marginTop: '50px' }}>
            {
                loader ? <Loader /> : 
                <ProductComponent />
            }
        </div>
    )
}

export default ProductListing
