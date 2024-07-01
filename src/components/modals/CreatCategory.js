import React, { useState } from 'react';
import '../modals/сreateCategory.css';
import { createCategory } from '../http/productAPI';

const CreateCategory = ({ onClose }) => {

    const [type, setType] = useState('category'); // тип: category или subcategory
    const [name, setName] = useState('');

    const addType = () => {
        if (type === 'category') {
            createCategory({ name }).then(data => {
                setName('');
                onClose();
            });
        } 
    };

    return (
        <div className="modal-overlay-Type">
            <div className="modal-content-Type">
                <h2>Добавить {type === 'category' ? 'категорию' : 'подкатегорию'}</h2>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={`Название ${type === 'category' ? 'категории' : 'подкатегории'}`} />
                <div className="modal-buttons-Type">
                    <button className="cancel-button-Ty" onClick={onClose}>Закрыть</button>
                    <button className="cancel-button2-Ty" onClick={addType}>Добавить</button>
                </div>
            </div>
        </div>
    );
};

export default CreateCategory;