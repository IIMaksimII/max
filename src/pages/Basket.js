import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { Context } from '..';
import '../pages/pagesCSS/basket.css';
import { getPersistedStore } from 'mobx-persist-store';
import { addOrder } from '../components/http/productAPI';



Modal.setAppElement('#root');

const Basket = observer(() => {
    const { basket, user } = useContext(Context);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [deliveryMethod, setDeliveryMethod] = useState('Пункт выдачи');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [paymentType, setPaymentType] = useState('');

    
    useEffect(() => {
        if (user.user.id) {
            basket.loadBasket(user.user.id);
        }
    }, [basket, user.user.id]);

    const totalPrice = basket.basket.reduce((sum, item) => {
        const price = item.product?.price || 0;
        return sum + price * item.quantity;
    }, 0);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleMapClick = async (e) => {
        const coords = e.get('coords');
        setSelectedPoint(coords);

        try {
            const mapInstance = e.get('map');
            const geocoder = await mapInstance.geocode(coords);
            const address = geocoder.geoObjects.get(0).getAddressLine();
            setDeliveryAddress(address);
        } catch (error) {
            console.error('Ошибка геокодирования:', error);
            setDeliveryAddress('');
        }
    };

    const handleDeliveryMethod = (method) => {
        setDeliveryMethod(method);
        if (method === 'Курьером') {
            setDeliveryAddress('');
        }
    };

    const handleInputChange = (event) => {
        if (deliveryMethod === 'Курьером') {
            setDeliveryAddress(event.target.value);
        }
    };

    const handlePaymentTypeChange = (event) => {
        setPaymentType(event.target.value);
    };

    const handleIncreaseQuantity = (productId) => {
        basket.increaseQuantity(productId);
    };

    const handleDecreaseQuantity = (productId) => {
        basket.decreaseQuantity(productId);
    };

    const handleAddAddress = () => {
        setAddresses([...addresses, deliveryAddress]);
        setDeliveryAddress('');
        closeModal();
    };

    const handleCheckout = async () => {
        try {
            const orderData = {
                userId: user.user.id,
                deliveryType: deliveryMethod,
                address: deliveryMethod === 'Курьером' ? addresses[addresses.length - 1] : 'Пункт выдачи',
                paymentType,
                products: basket.basket.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.product.price
                })),
                totalPrice
            };

            const response = await addOrder(orderData);
            if (response) {
                console.log('Order created successfully:', response);
            } else {
                console.error('Error: Response does not contain expected data');
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (
        <div className="basket-container">
            <div className="basket-header">
                <h2>Корзина </h2>
                <span>{basket.basket.length} товара</span>
            </div>
            <ul className="basket-list">
                {basket.basket.map(item => (
                    <li key={item.id} className="basket-item">
                        <div className="basket-item-details">
                            <img
                                src={`${process.env.REACT_APP_API_URL}/${item.product?.img || ''}`}
                                alt={item.product?.name || 'Товар'}
                                className="basket-item-image"
                            />
                            <div className="basket-item-info">
                                <span className="basket-item-name">{item.product?.name || 'Товар'}</span>
                                <span className="basket-item-price">{item.product?.price || 0} ₽</span>
                            </div>
                        </div>
                        <div className="basket-item-quantity-controls">
                            <button className="quantity-button" onClick={() => handleDecreaseQuantity(item.productId)}>-</button>
                            <span>{item.quantity}</span>
                            <button className="quantity-button" onClick={() => handleIncreaseQuantity(item.productId)}>+</button>
                        </div>
                        <span className="basket-item-total-price">Итого: {item.product?.price * item.quantity || 0} ₽</span>
                        <button className="remove-button" onClick={() => basket.removeFromBasket(user.user.id, item.productId)}>Удалить</button>
                    </li>
                ))}
            </ul>
            <div className="basket-footer">
                <span className="basket-address" onClick={openModal}>Выбрать адрес доставки</span>
                {addresses.length > 0 && (
                    <div className="added-addresses">
                        {addresses.map((address, index) => (
                            <p key={index}>{address}</p>
                        ))}
                    </div>
                )}
                <div className="basket-summary">
                    <span>Итого:</span>
                    <span>{totalPrice} ₽</span>
                </div>
                <div className="payment-type">
                    <select value={paymentType} onChange={handlePaymentTypeChange}>
                        <option value="">Выберите тип оплаты</option>
                        <option value="Наличные">Наличные</option>
                        <option value="Карта">Карта</option>
                    </select>
                </div>
                <button className="checkout-button" onClick={handleCheckout}>Заказать</button>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Выбор адреса доставки"
                className="modal"
                overlayClassName="overlay">
                <div className="modal-content">
                    <div className="delivery-container">
                        <h2 className="delivery-title">Выберите способ доставки</h2>
                        <div className="delivery-buttons">
                            <button className={deliveryMethod === 'Пункт выдачи' ? 'active' : ''} onClick={() => handleDeliveryMethod('Пункт выдачи')}>Пункт выдачи</button>
                            <button className={deliveryMethod === 'Курьером' ? 'active' : ''} onClick={() => handleDeliveryMethod('Курьером')}>Курьером</button>
                        </div>
                        {deliveryMethod === 'Курьером' &&
                            <div className="address-input">
                                <input
                                    type="text"
                                    value={deliveryAddress}
                                    onChange={handleInputChange}
                                    placeholder="Введите адрес"
                                />
                            </div>
                        }
                        {deliveryMethod === 'Пункт выдачи' &&
                            <div className="pickup-message">
                                <p>Пунктов выдачи пока нет</p>
                            </div>
                        }
                        <button className="close-button" onClick={closeModal}>Закрыть</button>
                        <button className="add-button" onClick={handleAddAddress}>Добавить</button>
                    </div>
                    <div className="map-container">
                        <YMaps>
                            <Map
                                defaultState={{ center: [61.009418, 76.105640], zoom: 10 }}
                                style={{ width: '100%', height: '400px' }}
                                onClick={handleMapClick}>
                                {selectedPoint && <Placemark geometry={selectedPoint} />}
                            </Map>
                        </YMaps>
                    </div>
                </div>
            </Modal>
        </div>
    );
});








export default Basket;