import React, { useContext, useEffect  } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '..'; // Проверьте правильность пути к вашему контексту
import '../pages/pagesCSS/productPage.css';
import { fetchProductById } from '../components/http/productAPI';

const ProductPage = observer(() => {
  const { product, basket, user } = useContext(Context);
  const selectedProduct = product.selectedProduct;

  useEffect(() => {
      const loadProduct = async () => {
          if (!selectedProduct || !selectedProduct.id) return;
          try {
              const productData = await fetchProductById(selectedProduct.id);
              product.setSelectedProduct(productData);
          } catch (error) {
              console.error('Failed to fetch product:', error);
          }
      };

      loadProduct();
  }, [selectedProduct?.id, product]);

  const handleAddToBasket = () => {
      if (user.checkAuth()) {
          basket.addToBasket(user.user.id, selectedProduct);
      } else {
          alert('Авторизуйтесь, чтобы добавить товар в корзину');
      }
  };

  if (!selectedProduct || !selectedProduct.name) {
      return <div className="product-page">Выберите продукт для отображения</div>;
  }

  return (
      <div className="product-page">
          <div className="product-container">
              <div className="product-image">
                  <img src={process.env.REACT_APP_API_URL + selectedProduct.img} alt={selectedProduct.name} />
              </div>
              <div className="product-details">
                  <h2>{selectedProduct.name}</h2>
                  <h3>Цена: {selectedProduct.price} ₽</h3>
                  <div className="right">
                      <button
                          className={`add-to-cart ${user.checkAuth() ? '' : 'disabled'}`}
                          onClick={handleAddToBasket}
                          disabled={!user.checkAuth()}>
                          {user.checkAuth() ? 'Добавить в корзину' : 'Авторизуйтесь, чтобы добавить в корзину'}
                      </button>
                  </div>
              </div>
          </div>
          <div className="section">
              <h1 className="title">О товаре</h1>
              {selectedProduct.descriptions && selectedProduct.descriptions.map(info => (
                  <div key={info.id} className="characteristic">
                      <span className='title'>{info.title}:</span>
                      <span className='desc'>{info.description}</span>
                  </div>
              ))}
          </div>
      </div>
  );
});
export default ProductPage;