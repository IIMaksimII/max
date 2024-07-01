import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';

const ProductInfo = observer(() => {
    const { product } = useContext(Context);
    const selectedProduct = product.selectedProduct;

    if (!selectedProduct || !selectedProduct.name) {
        return <div className="product-info">Выберите продукт для отображения</div>;
    }

    return (
        <div className="product-info">
            <h2>{selectedProduct.name}</h2>
            {selectedProduct.img && (
                <img src={process.env.REACT_APP_API_URL + selectedProduct.img} alt={selectedProduct.name} className="product-image" />
            )}
            <ul>
                {selectedProduct.descriptions && selectedProduct.descriptions.map((desc, index) => (
                    <li key={index}>
                        <strong>{desc.title}:</strong> {desc.description}
                    </li>
                ))}
            </ul>
            <p>Цена: {selectedProduct.price} ₽</p>
        </div>
    );
});

export default ProductInfo;