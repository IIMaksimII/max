import React from 'react';

const ProductImages = ({ images }) => {
    return (
        <div className="images-section">
            {images.map((image, index) => (
                <img key={index} src={image} alt={`Product Image ${index + 1}`} className="product-image" />
            ))}
        </div>
    );
};

export default ProductImages;