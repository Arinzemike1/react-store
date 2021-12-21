import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setProducts } from '../redux/actions/productActions';
import Axios from 'axios';
import '../../src/App.css'
import ProductComponent from '../components/ProductComponent'

const ProductListing = () => {
    const dispatch = useDispatch();
    const [ loader, setLoader ] = useState(false);
    const [ res, setRes ] = useState([])

    const fetchProducts = async() => {
        setLoader(true);
        const response = await Axios.get("https://fakestoreapi.com/products")
        .catch((err) => {
            console.log("Error: ", err)
        })
        setLoader(false);
        dispatch(setProducts(response.data));
    }

    // const fetchProducts = () => {
    //     setLoader(true);
    //     Axios.get("https://fakestoreapi.com/products")
    //     .then((response) => {
    //         console.log("res: ", response);
    //         setRes(response.data);
    //         setLoader(false);
    //     })
    //     .catch((err) => {
    //         console.log("Error: ", err)
    //     })
    //     dispatch(setProducts(res));
    // }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="full-block" style={{marginTop: '50px'}}>
            <ProductComponent loader={loader} />
        </div>
    )
}

export default ProductListing
