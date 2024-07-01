
import React, { useState, useEffect } from 'react';
import '../modals/createSub.css'; // Путь к CSS-файлу для стилей модального окна
import { createSubcategory,fetchCategory } from '../http/productAPI';

const CreateSubcategory = ({ onClose }) => {
    const [categories, setCategories] = useState([]); // Состояние для списка категорий
    const [selectedCategory, setSelectedCategory] = useState(''); // Состояние для выбранной категории
    const [subcategoryName, setSubcategoryName] = useState(''); // Состояние для названия подкатегории

    useEffect(() => {
        // Функция для загрузки категорий при монтировании компонента
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await fetchCategory(); // Получаем категории с сервера
                setCategories(fetchedCategories); // Обновляем состояние с категориями
                if (fetchedCategories.length > 0) {
                    setSelectedCategory(fetchedCategories[0].id); // Устанавливаем первую категорию по умолчанию
                }
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchCategories(); // Вызываем функцию загрузки категорий
    }, []);

    const addSubcategory = async () => {
        if (!selectedCategory || !subcategoryName) {
            alert('Выберите категорию и введите название подкатегории');
            return;
        }

        try {
            // Отправляем запрос на сервер для создания подкатегории
            const newSubcategory = {
                name: subcategoryName,
                categoryId: selectedCategory,
            };

            const createdSubcategory = await createSubcategory(newSubcategory); // Создаем подкатегорию
            console.log('Created subcategory:', createdSubcategory);

            // Очищаем поля и закрываем модальное окно
            setSubcategoryName('');
            onClose();
        } catch (error) {
            console.error('Failed to create subcategory:', error);
        }
    };

    return (
        <div className="modal-overlay-Sub">
            <div className="modal-content-Sub">
                <h2>Добавить подкатегорию</h2>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">Выберите категорию</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    value={subcategoryName}
                    onChange={(e) => setSubcategoryName(e.target.value)}
                    placeholder="Название подкатегории"
                />
                <div className="modal-buttons-Sub">
                    <button className="cancel-button-Sub" onClick={onClose}>
                        Закрыть
                    </button>
                    <button className="add-button-Sub" onClick={addSubcategory}>
                        Добавить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateSubcategory;