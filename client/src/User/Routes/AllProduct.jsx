import React, { useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import FilterProduct from '../Components/FilterProduct';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ProductScreen from '../Components/ProductScreen';  // Import ProductScreen component

// Example product data
const allProducts = [
  { name: 'Product 1', category: 'EYEGLASSES', image: '/path/to/image1.jpg' },
  { name: 'Product 2', category: 'SUNGLASSES', image: '/path/to/image2.jpg' },
  { name: 'Product 3', category: 'CONTACT LENSES', image: '/path/to/image3.jpg' },
  { name: 'Product 4', category: 'EYEGLASSES', image: '/path/to/image4.jpg' },
  { name: 'Product 5', category: 'COMPUTER GLASSES', image: '/path/to/image5.jpg' },
  { name: 'Product 6', category: 'ACCESSORIES', image: '/path/to/image6.jpg' },
];

const AllProduct = () => {
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  // Filter products by category
  const handleFilter = (category) => {
    if (category === '') {
      setFilteredProducts(allProducts); // Show all products if no category is selected
    } else {
      setFilteredProducts(allProducts.filter((product) => product.category === category));
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Navbar />
      <Container sx={{ display: 'flex', flexDirection: 'row', paddingTop: 3 }}>
        {/* Filter Section */}
        <Box sx={{ flex: 1, padding: 2, backgroundColor: 'white', boxShadow: 2, borderRadius: 1 }}>
          <FilterProduct products={allProducts} onFilter={handleFilter} />
        </Box>

        {/* Product List Section */}
        <Box sx={{ flex: 4, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 3, padding: 2 }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <ProductScreen key={index} product={product} />
            ))
          ) : (
            <Typography variant="h6" color="textSecondary" align="center">
              No products found for this category.
            </Typography>
          )}
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default AllProduct;
