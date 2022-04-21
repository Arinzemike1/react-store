import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../src/App.css';

const ProductComponent = ({ searchTerm }) => {
    const products = useSelector((state) => state.allProducts.products);
    
    const renderList = products.filter((product) => {
        if (searchTerm === "") {
            return true;
        }
        else if (product.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return true
        }
        return false;
    }).map((product) => {
        const { id, title, image, price, category } = product;
        return (
            <>
                <Link to={`product/${id}`} className="store">
                    <div>
                        <img src={image} className="" alt={title} height="220" width="200" />
                    </div>
                    <div className="content-2 text-start">
                        <div className="title mt-3 mb-3">{title}</div>
                        <div className="red-color mb-3">${price}</div>

                        <div className="row">
                            <div className="col">
                                <div className="category">{category}</div>
                            </div>
                            {/* <div className="col">
                                <button className="atc-btn">Add to Cart</button>
                            </div> */}
                        </div>
                    </div>

                </Link>
            </>
        );
    })

    return <>{renderList}</>
}

export default ProductComponent
