import { makeAutoObservable } from "mobx";
import cur2 from '../main_menu/current/curr2.png' 
export default class DeviceStore {
    
    constructor() {
        this._category = [];
        this._subcategory = [];
        this._brand = [];
        this._product = [];
        this._description = [];
        this._selectedCategory = null;
        this._selectedSubcategory = null;
        this._selectedBrand = null;
        this._selectedProduct = null;
        this._selectedDescription = null;
        this._characteristics = [];
        this._searchQuery = ''; 
        this._cartItems = [];
        makeAutoObservable(this);
    }

    
    setDescription(description) {
        this._description = Array.isArray(description) ? description : [];
    }

    setCategory(category) {
        this._category = Array.isArray(category) ? category : [];
    }

    setSubcategory(subcategory) {
        this._subcategory = Array.isArray(subcategory) ? subcategory : [];
    }

    setBrand(brand) {
        this._brand = Array.isArray(brand) ? brand : [];
    }

    setProduct(product) {
        this._product = Array.isArray(product) ? product : [];
    }

    setSelectedCategory(category) {
        this._selectedCategory = category;
        this._selectedSubcategory = null;
        this._selectedBrand = null;
        this._selectedProduct = null;
        this._selectedDescription = null;
    }

    setSelectedSubcategory(subcategory) {
        this._selectedSubcategory = subcategory;
        this._selectedBrand = null;
        this._selectedProduct = null;
        this._selectedDescription = null;
    }

    setSelectedBrand(brand) {
        this._selectedBrand = brand;
        this._selectedProduct = null;
        this._selectedDescription = null;
    }

    setSelectedProduct(product) {
        this._selectedProduct = product;
        this._selectedDescription = null;
    }

    setSelectedDescription(description) {
        this._selectedDescription = description;
    }

    setProductPrice(price) {
        this._productPrice = price;
    }

    setImageFile(file) {
        this._imageFile = file;
    }

    setCharacteristics(characteristics) {
        this._characteristics = Array.isArray(characteristics) ? characteristics : [];
    }
    setSearchQuery(query) {
        this._searchQuery = query;
    }

    get description() {
        return this._description;
    }

    get category() {
        return this._category;
    }

    get subcategory() {
        return this._subcategory;
    }

    get brand() {
        return this._brand;
    }

    get product() {
        return this._product;
    }

    get selectedCategory() {
        return this._selectedCategory;
    }

    get selectedSubcategory() {
        return this._selectedSubcategory;
    }

    get selectedBrand() {
        return this._selectedBrand;
    }

    get selectedProduct() {
        return this._selectedProduct;
    }

    get selectedDescription() {
        return this._selectedDescription;
    }

    get productPrice() {
        return this._productPrice;
    }

    get imageFile() {
        return this._imageFile;
    }

    get characteristics() {
        return this._characteristics;
    }
    get searchQuery() {
        return this._searchQuery;
    }
}

    

