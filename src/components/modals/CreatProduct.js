import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import '../modals/creatProduct.css';
import { Context } from '../..';
import { createBrand, fetchCategory, fetchBrands, fetchSubcategory,createProducts } from '../http/productAPI';


const CreateProduct = observer(({ onClose }) => {
    const { device } = useContext(Context);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState(null);
    const [characteristics, setCharacteristics] = useState([]);

    useEffect(() => {
        fetchCategory().then(data => setCategories(data));
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            const category = categories.find(cat => cat.id === parseInt(selectedCategory));
            if (category) {
                setSubcategories(category.subcategories || []);
                setSelectedSubcategory('');
                setBrands([]);
                setSelectedBrand('');
            } else {
                setSubcategories([]);
                setBrands([]);
                setSelectedBrand('');
            }
        }
    }, [selectedCategory, categories]);

    useEffect(() => {
        if (selectedSubcategory) {
            const subcategory = subcategories.find(sub => sub.id === parseInt(selectedSubcategory));
            if (subcategory) {
                setBrands(subcategory.brands || []);
                setSelectedBrand('');
            } else {
                setBrands([]);
                setSelectedBrand('');
            }
        }
    }, [selectedSubcategory]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSubcategoryChange = (event) => {
        setSelectedSubcategory(event.target.value);
    };

    const handleBrandChange = (event) => {
        setSelectedBrand(event.target.value);
    };

    const handleAddCharacteristic = () => {
        setCharacteristics([...characteristics, { title: '', description: '' }]);
    };

    const handleCharacteristicChange = (index, key, value) => {
        const newCharacteristics = [...characteristics];
        newCharacteristics[index][key] = value;
        setCharacteristics(newCharacteristics);
    };

    const handleRemoveCharacteristic = (index) => {
        const newCharacteristics = characteristics.filter((_, i) => i !== index);
        setCharacteristics(newCharacteristics);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('brandId', selectedBrand);
        formData.append('subCategoryId', selectedSubcategory);
        formData.append('img', file);
        formData.append('characteristics', JSON.stringify(characteristics));

        try {
            await createProducts(formData);
            onClose();
        } catch (error) {
            console.error('Failed to create product:', error);
        }
    };

    return (
        <div className="modal-pr">
            <div className="modal-content-pr">
                <h2>Добавить товар</h2>
                <div className="form-group-pr">
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="" disabled>Категории</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <select value={selectedSubcategory} onChange={handleSubcategoryChange}>
                        <option value="" disabled>Подкатегории</option>
                        {subcategories.map(subcategory => (
                            <option key={subcategory.id} value={subcategory.id}>
                                {subcategory.name}
                            </option>
                        ))}
                    </select>
                    <select value={selectedBrand} onChange={handleBrandChange}>
                        <option value="" disabled>Бренд</option>
                        {brands.map(brand => (
                            <option key={brand.id} value={brand.id}>
                                {brand.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group-pr">
                    <input
                        type="text"
                        placeholder="Название товара"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Цена товара"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <span>руб.</span>
                </div>
                <div className="form-group-pr">
                    <label>Выберите фото</label>
                    <input type="file" onChange={handleFileChange} />
                    {file && (
                        <div className="selected-photo">
                            <img src={URL.createObjectURL(file)} alt="Выбранное фото" />
                            <span>{file.name}</span>
                        </div>
                    )}
                </div>
                <div className="form-group-pr">
                    <button className='btX' onClick={handleAddCharacteristic}>Добавить Характеристику</button>
                    <div className="characteristics-container">
                        {characteristics.map((characteristic, index) => (
                            <div key={index} className="characteristic">
                                <input
                                    type="text"
                                    placeholder="тип"
                                    value={characteristic.title}
                                    onChange={(e) => handleCharacteristicChange(index, 'title', e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="свойство"
                                    value={characteristic.description}
                                    onChange={(e) => handleCharacteristicChange(index, 'description', e.target.value)}
                                />
                                <button onClick={() => handleRemoveCharacteristic(index)}>удалить</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="form-actions-pr">
                    <button onClick={onClose} className="close-button-pr">Закрыть</button>
                    <button onClick={handleSubmit} className="submit-button-pr">Добавить</button>
                </div>
            </div>
        </div>
    );
});



export default CreateProduct;