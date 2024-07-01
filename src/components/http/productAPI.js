import { jwtDecode } from "jwt-decode";
import { $authHost, $host } from ".";

export const createCategory = async (category) => {
  const { data } = await $authHost.post('/api/category', category);
  return data;
};

export const fetchCategory = async () => {
  const { data } = await $host.get('/api/category');
 
  return data.categories;
};

export const createSubcategory = async (subcategory) => {
  const { data } = await $authHost.post('/api/subcategory', subcategory);
  return data;
};

export const fetchSubcategory = async () => {
  const { data } = await $host.get('/api/subcategory');
  return data.subcategory;
};

export const createBrand = async (brand) => {
  const { data } = await $authHost.post('/api/brand', brand);
  return data.brand;
};

export const fetchBrands = async () => {
  const { data } = await $host.get('/api/brand');
  return data.brand;
};

export const createProducts = async (products) => {
  const { data } = await $authHost.post('/api/product', products);
  return data;
};

export const fetchProducts = async () => {
  const { data } = await $host.get('/api/product');
  return data;
};

export const fetchBasketItems = async () => {
  try {
    const { data } = await $authHost.get('/api/basket');
    console.log("Товары из корзины были  выбраны:", data);
    return data;
  } catch (error) {
    console.error("Ошибка", error);
    throw error; // Optionally re-throw the error for handling in components
  }
};

export const addProductToBasket = async (userId, productId, quantity) => {
  const { data } = await $authHost.post('/api/basket', { userId, productId, quantity });
  return data;
};
export const removeProductFromBasket = async (userId, productId) => {
  const { data } = await $authHost.delete('/api/basket', { data: { userId, productId } });
  return data;
};

export const addOrder = async (order) => {
  try {
      const { data } = await $authHost.post('/api/order', order);
      return data;
  } catch (error) {
      console.error('Ошибка при создании заказа:', error);
      throw error;
  }
};
export const createOrder = async (order) => {
    try {
        const { data } = await $authHost.post('/api/order', order);
        return data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

export const fetchOrders = async () => {
    try {
        const { data } = await $authHost.get('/api/order');
        return data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export const fetchProductById = async (productId) => {
  const { data } = await $host.get(`/api/product/${productId}`);
  return data;
};







  
  
