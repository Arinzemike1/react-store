import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setProducts } from '../redux/actions/productActions';
import Axios from 'axios';
import '../../src/App.css'
import ProductComponent from '../components/ProductComponent'
import Loader from './Loader';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai';

const ProductListing = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchProducts = () => {
        setLoader(true);
        Axios.get("https://fakestoreapi.com/products")
            .then((response) => {
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

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }

    return (
        <>
            <div className="row mt-4">
                <div className="col">
                    <Header className="ms-5" />
                </div>
                <div className="col">
                    <form>
                        <div className="search">
                            <AiOutlineSearch className="search-icon" />
                            <input type="text" className="search-bar" placeholder="Search..." onChange={handleChange} />
                        </div>
                    </form>
                </div>
                <div className="col d-flex justify-content-end me-5" style={{ fontSize: '30px' }}>
                    <Link to="">
                        <AiOutlineShoppingCart className="cart-icon" />
                    </Link>
                </div>
            </div>
            <div className="full-block" style={{ marginTop: '50px' }}>
                {
                    loader ? <Loader /> :
                        <ProductComponent searchTerm={searchTerm} />
                }
            </div>
        </>
    )
}

export default ProductListing
