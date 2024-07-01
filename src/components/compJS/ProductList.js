import React, { useContext, useState , useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import ProductItems from './ProductItems';
import ProductInfo from './ProductInfo';
import '../compCSS/productList.css';
const ProductList = observer(() => {
    const { product } = useContext(Context);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 15;

    if (!product.product) return <p>Loading...</p>;

    let filteredProducts = product.product;

    if (product.searchQuery) {
        filteredProducts = filteredProducts.filter(prod => 
            prod.name.toLowerCase().includes(product.searchQuery.toLowerCase())
        );
    } else if (product.selectedBrand) {
        filteredProducts = filteredProducts.filter(prod => prod.brandId === product.selectedBrand.id);
    } else if (product.selectedSubcategory) {
        filteredProducts = filteredProducts.filter(prod => prod.subcategoryId === product.selectedSubcategory.id);
    } else if (product.selectedCategory) {
        filteredProducts = filteredProducts.filter(prod => {
            return product.subcategory.some(sub => sub.categoryId === product.selectedCategory.id && sub.id === prod.subcategoryId);
        });
    }

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="product-list-container">
            <div className="products">
                {currentProducts.length > 0 ? (
                    currentProducts.map(prod => (
                        <ProductItems key={prod.id} product={prod} />
                    ))
                ) : (
                    <p>Товары отсутствуют</p>
                )}
            </div>
            <div className="pagination">
                {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
                    <button key={index + 1} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
});

export default ProductList;