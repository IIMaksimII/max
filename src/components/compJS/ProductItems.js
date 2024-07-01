import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCT_ROUTE } from '../../utils/consts';
import { Context } from '../../index';
import { Image } from 'react-bootstrap';
import '../compCSS/productList.css';

const ProductItems = ({ product }) => {
    const { product: productStore } = useContext(Context);
    const productLink = `${PRODUCT_ROUTE}/${product.id}`;

    const handleClick = () => {
        productStore.setSelectedProduct(product);
    };

   
     
    return (
        <Link to={productLink} className="product-card" onClick={handleClick}>
            
            <Image src={process.env.REACT_APP_API_URL + product.img}/>
            
            <p>{product.name}</p>
            <p className="price">Цена: {product.price} ₽</p>
        </Link>
        
    );
};

export default ProductItems;