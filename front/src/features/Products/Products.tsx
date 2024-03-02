import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import { useEffect, useState } from 'react';
import { fetchDataCategory, fetchProduct } from '../../store/product/productThunk.ts';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box, Button, CircularProgress, Tab, Tabs, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { fetchCategories } from '../../store/category/categoryThunk.ts';


const Products = () => {
  const {search} = useLocation();
  const searchQuery = new URLSearchParams(search);
  const categorySearch = searchQuery.get('category');
  const dispatch = useDispatch<AppDispatch>();
  const {products, fetchLoad} = useSelector((state: RootState) => state.product);

  const {categories} = useSelector((state: RootState) => state.category);
  const [value, setValue] = useState('/');
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(fetchCategories());

    setValue(categorySearch || '/');

  }, [dispatch, categorySearch]);
  useEffect(() => {


    if (!products.length) {
      dispatch(fetchProduct());
    }

  }, [dispatch, products]);


  useEffect(() => {

    dispatch(fetchDataCategory(categorySearch || ''));

  }, [dispatch, categorySearch]);
  return (
    <>
      <Tabs value={value}>
        {categories.map(({title, _id}, index) => (
          <Tab
            key={index}
            label={title}
            value={title === 'AllItems' ? '/' : _id}
            onChange={() => handleChange(title)}
            component={Link}
            to={title === 'AllItems' ? '/' : `/products?category=${_id}`}
          />
        ))}
      </Tabs>
      <Box
        sx={{marginTop: '90px'}}
      >

        <Box
          display={'flex'}
          sx={
            {
              gap: '30px',
              flexWrap: 'wrap'
            }
          }
        >
          {
            fetchLoad ? <CircularProgress/> :
              products.map(product => {
                return (
                  <Box
                    key={product._id}
                  >
                    <Card
                      sx={{width: 345}}
                    >
                      <CardMedia
                        sx={{height: 350}}
                        image={`http://localhost:8000/${product.image}`}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {product.title}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button component={Link} to={`/products/${product._id}`} size="small">Learn More</Button>
                      </CardActions>
                    </Card>
                  </Box>
                );
              })
          }
        </Box>

      </Box>
    </>
  );
};

export default Products;