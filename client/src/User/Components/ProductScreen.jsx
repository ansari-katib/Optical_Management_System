import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';

const ProductScreen = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {product.category}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          View Product
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductScreen;
