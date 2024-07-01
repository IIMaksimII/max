import React, { useState, useEffect } from 'react';
import CreateCategory from '../components/modals/CreatCategory';
import CreateSubcategory from '../components/modals/CreatSubcategory';
import CreateBrand from '../components/modals/CreatBrand';
import CreateProduct from '../components/modals/CreatProduct';

import EditUserModal from '../components/modals/EditUserModal';

import '../pages/pagesCSS/admin.css';
import { fetchUsers, deleteUserAPI  } from '../components/http/userAPI';
import { fetchOrders, fetchProducts } from '../components/http/productAPI';



const Admin = () => {
    const [currentView, setCurrentView] = useState('products');
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [isSubcategoryModalOpen, setIsSubcategoryModalOpen] = useState(false);
    const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isProductInfoVisible, setIsProductInfoVisible] = useState(false);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    const [showOrders, setShowOrders] = useState(false);

    useEffect(() => {
        if (currentView === 'users') {
            fetchUsers().then((data) => setUsers(data));
        } else if (currentView === 'infoProduct') {
            fetchProducts().then((data) => setProducts(data));
        } else if (currentView === 'orders') {
            fetchOrders().then((data) => setOrders(data));
        }
    }, [currentView]);

    const handleOpenCategoryModal = () => setIsCategoryModalOpen(true);
    const handleCloseCategoryModal = () => setIsCategoryModalOpen(false);

    const handleOpenSubcategoryModal = () => setIsSubcategoryModalOpen(true);
    const handleCloseSubcategoryModal = () => setIsSubcategoryModalOpen(false);

    const handleOpenBrandModal = () => setIsBrandModalOpen(true);
    const handleCloseBrandModal = () => setIsBrandModalOpen(false);

    const handleOpenProductModal = () => setIsProductModalOpen(true);
    const handleCloseProductModal = () => setIsProductModalOpen(false);

    const handleShowProductInfo = () => {
        setCurrentView('infoProduct');
        setIsProductInfoVisible(true);
        setShowOrders(false);
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setIsEditUserModalOpen(true);
        setShowOrders(false);
    };

    const handleDeleteUser = async (userId) => {
        try {
            await deleteUserAPI(userId);
            setUsers(users.filter((user) => user.id !== userId));
            alert('Пользователь успешно удален');
        } catch (error) {
            console.error('Ошибка при удалении пользователя:', error);
            alert('Ошибка при удалении пользователя');
        }
    };

    const handleToggleOrders = () => {
        setShowOrders(!showOrders);
        setCurrentView('orders');
        setIsProductInfoVisible(false);
    };

    return (
        <div className="admin-panel">
            <div className="admin-navigation">
                <button className="nav-button" onClick={() => setCurrentView('products')}>
                    Товар
                </button>
                <button className="nav-button" onClick={() => setCurrentView('users')}>
                    Пользователи
                </button>
                <button className="nav-button" onClick={handleShowProductInfo}>
                    Информация о товаре
                </button>
                <button className="nav-button" onClick={handleToggleOrders}>
                    Заказы
                </button>
            </div>

            {currentView === 'products' && (
                <div className="container_admin">
                    <h2 className="header_admin">Работа с товаром</h2>
                    <div className="button-container">
                        <button className="button" onClick={handleOpenCategoryModal}>
                            Добавить категорию
                        </button>
                        <button className="button" onClick={handleOpenSubcategoryModal}>
                            Добавить подкатегорию
                        </button>
                        <button className="button" onClick={handleOpenBrandModal}>
                            Добавить бренд
                        </button>
                        <button className="button" onClick={handleOpenProductModal}>
                            Добавить товар
                        </button>
                    </div>
                    {isCategoryModalOpen && <CreateCategory onClose={handleCloseCategoryModal} />}
                    {isSubcategoryModalOpen && <CreateSubcategory onClose={handleCloseSubcategoryModal} />}
                    {isBrandModalOpen && <CreateBrand onClose={handleCloseBrandModal} />}
                    {isProductModalOpen && <CreateProduct onClose={handleCloseProductModal} />}
                </div>
            )}

            {currentView === 'infoProduct' && isProductInfoVisible && (
                <div className="orders-container">
                    <h2>Информация о товаре</h2>
                    <div className="product-info-container">
                        <table className="product-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Название</th>
                                    <th>Бренд</th>
                                    <th>Цена</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.brand ? product.brand.name : 'N/A'}</td>
                                        <td>{product.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {currentView === 'users' && (
                <div className="orders-container">
                    <h2>Пользователи</h2>
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Email</th>
                                <th>Роль</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button onClick={() => handleEditUser(user)}>Редактировать</button>
                                        <button onClick={() => handleDeleteUser(user.id)}>Удалить</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {currentView === 'orders' && showOrders && (
                <div className="orders-frame">
                    <h2>Заказы</h2>
                    <div className="orders-table-container">
                        <table className="orders-table">
                            <thead>
                                <tr>
                                    <th>Пользователь</th>
                                    <th>Номер заказа</th>
                                    <th>Вид доставки</th>
                                    <th>Адрес</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                        <td>{order.user ? order.user.email : 'N/A'}</td>
                                        <td>{order.orderNumber}</td>
                                        <td>{order.deliveryType}</td>
                                        <td>{order.address}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {isEditUserModalOpen && (
                <EditUserModal user={selectedUser} onClose={() => setIsEditUserModalOpen(false)} />
            )}
        </div>
    );
};

export default Admin;