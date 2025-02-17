import React, { useState } from 'react';
import { Typography, Button, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

// Example items2 array with categories
const items2 = [
  { text: 'EYEGLASSES', url: '/eye-glasses' },
  { text: 'SUNGLASSES', url: '/sun-glasses' },
  { text: 'POWER SUNGLASSES', url: '/power-glasses' },
  { text: 'COMPUTER GLASSES', url: '/computer-glasses' },
  { text: 'READING GLASSES', url: '/reading-glasses' },
  { text: 'CONTACT LENSES', url: '/contact-lenses' }
];

const FilterProduct = ({ products, onFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGender, setSelectedGender] = useState('');

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilter(category); // Call parent function to filter products by category
  };

  // Handle gender selection change
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    // You can add logic to filter products based on gender as well if needed
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filter by Category:
      </Typography>

      {/* Gender Dropdown */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Select by Gender</InputLabel>
        <Select
          value={selectedGender}
          label="Select by Gender"
          onChange={handleGenderChange}
        >
          <MenuItem value="Men">Men</MenuItem>
          <MenuItem value="Women">Women</MenuItem>
          <MenuItem value="Kid">Kid</MenuItem>
        </Select>
      </FormControl>

      {/* Category Buttons */}
      <Box display="flex" flexDirection="column" gap={2}>
        {items2.map((item, index) => (
          <Button
            key={index}
            variant={selectedCategory === item.text ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => handleCategoryChange(item.text)}
            sx={{ width: '100%', color: 'black' }}
          >
            {item.text}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default FilterProduct;
