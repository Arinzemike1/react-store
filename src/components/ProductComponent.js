import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../src/App.css';
import Loader from '../components/Loader';

const ProductComponent = ({ loader }) => {
    const products = useSelector((state) => state.allProducts.products);

    const renderList = products.map((product) => {
        const { id, title, image, price, category } = product;
        return (
            <div key={id}>
                {
                    loader ? <Loader /> :
                        <Link to={`product/${id}`} className="store">
                            <div>
                                <img src={image} className="" alt={title} height="220" width="200" />
                            </div>
                            <div className="content-2 text-start">
                                <div className="title mt-3 mb-3">{title}</div>
                                <div className="red-color mb-3">${price}</div>
                                <div className="category">{category}</div>
                            </div>

                        </Link>
                }

            </div>
            // <Link to={`product/${id}`} className="store" key={id}>

            //     <div>
            //         <img src={image} className="" alt={title} height="220" width="200" />
            //     </div>
            //     <div className="content-2 text-start">
            //         <div className="title mt-3 mb-3">{title}</div>
            //         <div className="red-color mb-3">${price}</div>
            //         <div className="category">{category}</div>
            //     </div>
            // </Link>


        );
    })

    return <>{renderList}</>
}

export default ProductComponent
