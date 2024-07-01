import React, { useContext, useEffect } from 'react';
import '../pages/pagesCSS/shop.css'
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { Container,Row,Col } from 'react-bootstrap';
import TypeBar from '../components/compJS/TypeBar';
import ProductList from '../components/compJS/ProductList';
import { fetchBrands, fetchCategory, fetchProducts,fetchSubcategory } from '../components/http/productAPI';



const Shop = observer(() => {
  const { product } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await fetchCategory();
        product.setCategory(categoryData);
        
        const subcategoryData = await fetchSubcategory();
        product.setSubcategory(subcategoryData);
        
        const brandData = await fetchBrands();
        product.setBrand(brandData);
        
        const productData = await fetchProducts();
        product.setProduct(productData);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData();
  }, []);
   
  return (
    <Container fluid className="shop-container">
      <Row>
        <Col md={3} className="sidebar-container">
          <TypeBar />
        </Col>
        <Col md={9} className="product-list-container">
          <ProductList />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;