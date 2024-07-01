import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

import { fetchBasketItems,addProductToBasket , removeProductFromBasket,fetchProductById } from "../components/http/productAPI";
class BasketStore {

  basket = [];

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, { name: "BasketStore", properties: ["basket"], storage: window.localStorage });
  }

  setBasket(basket) {
    this.basket = basket;
  }

  async loadBasket(userId) {
    try {
      const items = await fetchBasketItems(userId);
      this.setBasket(items);
    } catch (error) {
      console.error("Failed to load basket items:", error);
    }
  }

  async addToBasket(userId, product) {
    try {
      const item = await addProductToBasket(userId, product.id, 1);
      const existingItem = this.basket.find(basketItem => basketItem.productId === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.setBasket([...this.basket, { ...product, ...item, quantity: 1 }]);
      }
    } catch (error) {
      console.error("Failed to add product to basket:", error);
    }
  }

  async removeFromBasket(userId, productId) {
    try {
      await removeProductFromBasket(userId, productId);
      this.setBasket(this.basket.filter(item => item.productId !== productId));
    } catch (error) {
      console.error("Failed to remove product from basket:", error);
    }
  }

  async increaseQuantity(productId) {
    try {
      const item = this.basket.find(item => item.productId === productId);
      if (item) {
        const product = await fetchProductById(productId);
        if (item.quantity < product.quantity) {
          await addProductToBasket(item.userId, productId, 1);
          item.quantity += 1;
          this.setBasket([...this.basket]);
        } else {
          throw new Error('Максимальное количесвто товара ');
        }
      }
    } catch (error) {
      console.error("Failed to increase quantity:", error);
      throw error;
    }
  }

  async decreaseQuantity(productId) {
    try {
      const item = this.basket.find(item => item.productId === productId);
      if (item && item.quantity > 1) {
        await addProductToBasket(item.userId, productId, -1);
        item.quantity -= 1;
        this.setBasket([...this.basket]);
      }
    } catch (error) {
      console.error("Не удалось уменьшить количество:", error);
    }
  }
}


  

export default BasketStore;