import React, { useContext, useState , useEffect} from 'react';
import { observer } from 'mobx-react-lite';
import { ListGroup } from 'react-bootstrap';
import { Context } from '../../index';
import '../compCSS/typeBar.css';
import { type } from '@testing-library/user-event/dist/type';

const TypeBar = observer(() => {
    const { product } = useContext(Context);
    const [selectedItem, setSelectedItem] = useState(null);

    

    const handleCategoryClick = (category) => {
        if (product.selectedCategory && product.selectedCategory.id === category.id) {
            product.setSelectedCategory(null);
            product.setSelectedSubcategory(null);
            product.setSelectedBrand(null);
            setSelectedItem(null);
        } else {
            product.setSelectedCategory(category);
            product.setSelectedSubcategory(null);
            product.setSelectedBrand(null);
            setSelectedItem(category.name);
        }
    };

    const handleSubcategoryClick = (subcategory) => {
        if (product.selectedSubcategory && product.selectedSubcategory.id === subcategory.id) {
            product.setSelectedSubcategory(null);
            product.setSelectedBrand(null);
            setSelectedItem(null);
        } else {
            product.setSelectedSubcategory(subcategory);
            product.setSelectedBrand(null);
            setSelectedItem(subcategory.name);
        }
    };

    const handleBrandClick = (brand) => {
        product.setSelectedBrand(brand);
        setSelectedItem(brand.name);
    };

    if (!Array.isArray(product.category)) return <p>Loading...</p>; // Обработка асинхронной загрузки

    return (
        <div className="sidebar">
            <h2>Раздел {selectedItem && `: ${selectedItem}`}</h2>
            <div className="categories">
                {product.category.map(category => (
                    <div key={category.id}>
                        <button className="category-btn" onClick={() => handleCategoryClick(category)}>
                            {category.name} {product.selectedCategory && product.selectedCategory.id === category.id ? <span className="arrow-down"></span> : <span className="arrow-right"></span>}
                        </button>
                        {product.selectedCategory && product.selectedCategory.id === category.id && (
                            <div className={`sub-categories ${product.selectedCategory.id === category.id ? 'expanded' : ''}`}>
                                {Array.isArray(product.subcategory) && product.subcategory
                                    .filter(sub => sub.categoryId === category.id)
                                    .map(subcategory => (
                                        <div key={subcategory.id} className="subcategory-container">
                                            <button className="subcategory-btn" onClick={() => handleSubcategoryClick(subcategory)}>
                                                {subcategory.name} {product.selectedSubcategory && product.selectedSubcategory.id === subcategory.id ? <span className="arrow-down"></span> : <span className="arrow-right"></span>}
                                            </button>
                                            {product.selectedSubcategory && product.selectedSubcategory.id === subcategory.id && (
                                                <div className={`brands ${product.selectedSubcategory.id === subcategory.id ? 'expanded' : ''}`}>
                                                    {Array.isArray(product.brand) && product.brand
                                                        .filter(brand => brand.subcategoryId === subcategory.id)
                                                        .map(brand => (
                                                            <button key={brand.id} className="brand-btn" onClick={() => handleBrandClick(brand)}>
                                                                {brand.name}
                                                            </button>
                                                        ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
});


export default TypeBar;