import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectedProduct, removeSelectedProduct } from '../redux/actions/productActions';
import Axios from 'axios';
import Loader from '../components/Loader';
import '../../src/App.css'

const ProductDetail = () => {
    const product = useSelector((state) => state.product);
    const { image, title, price, category, description } = product;
    const { productId } = useParams();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

    const fetchProductDetail = () => {
        setLoader(true);
        Axios.get(`https://fakestoreapi.com/products/${productId}`)
            .then((response) => {
                setLoader(false);
                dispatch(selectedProduct(response.data));
            })
            .catch((err) => {
                console.log("Error: ", err)
            })
    }

    useEffect(() => {
        if (productId) {
            fetchProductDetail();
            return dispatch(removeSelectedProduct());
        }
        //eslint-disable-next-line
    }, [productId])
    return (
        <div className="container mt-5 pt-5">
            {
                loader ? <Loader /> :

                    <div className="row">
                        <div className="col-md-5 image-container">
                            <img src={image} alt={title} className="image-size" />
                        </div>

                        <div className="col-md-7 text-start ps-5">
                            <h2 className="pb-3">{title}</h2>
                            <h2 className="price-tag ui teal tag label">
                                ${price}
                            </h2>
                            <p className="category mb-5">{category}</p>
                            <p className="description">{description}</p>
                            <button className="add-to-cart-btn text-white">Add to Cart</button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default ProductDetail
