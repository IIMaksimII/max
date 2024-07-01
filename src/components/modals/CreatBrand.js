import React, {useContext, useState ,useEffect} from 'react';
import '../modals/creatBrand.css';
import { createBrand, fetchCategory } from '../http/productAPI';
import { Context } from '../..';

const CreatBrand = ({ onClose }) => {
    const { device } = useContext(Context);
    const [value, setValue] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

    useEffect(() => {
        fetchCategory().then(data => setCategories(data));
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            const category = categories.find(cat => cat.id === parseInt(selectedCategory));
            if (category) {
                setSubcategories(category.subcategories || []);
            } else {
                setSubcategories([]);
            }
        }
    }, [selectedCategory, categories]);

    const handleAddBrand = () => {
        if (!value || !selectedSubcategory) {
            alert("Пожалуйста, введите название бренда и выберите подкатегорию");
            return;
        }
    
        createBrand({ name: value, subcategoryId: selectedSubcategory })
            .then(data => {
                console.log("Бренд успешно добавлен:", data);
                setValue('');
                setSelectedSubcategory('');
                onClose();
            })
            .catch(error => {
                alert("Ошибка при добавлении бренда: " + (error.response ? error.response.data.message : error.message));
            });
    };

    return (
        <div className="modal-overlay-Brand">
            <div className="modal-content-Brand">
                <h2>Добавить бренд</h2>
                <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                    <option value="">Выберите категорию</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {selectedCategory && (
                    <select value={selectedSubcategory} onChange={e => setSelectedSubcategory(e.target.value)}>
                        <option value="">Выберите подкатегорию</option>
                        {subcategories.map(subcategory => (
                            <option key={subcategory.id} value={subcategory.id}>
                                {subcategory.name}
                            </option>
                        ))}
                    </select>
                )}
                <input
                    type="text"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder="Название бренда"
                />
                <div className="modal-buttons-Brand">
                    <button className="cancel-button-Brand" onClick={onClose}>Закрыть</button>
                    <button className="add-button-Brand" onClick={handleAddBrand}>Добавить</button>
                </div>
            </div>
        </div>
    );
};



export default CreatBrand;