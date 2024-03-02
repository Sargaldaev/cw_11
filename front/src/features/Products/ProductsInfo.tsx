import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { deleteProduct, fetchProductInfo } from '../../store/product/productThunk.ts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import CardActions from '@mui/material/CardActions';

const ProductsInfo = () => {
  const {id} = useParams() as { id: string };
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {productInfo, fetchLoadInfo,deleteLoad} = useSelector((state: RootState) => state.product);
  const {user} = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductInfo(id));
    }
  }, [dispatch, id]);

  const deleteProductId = async (id: string) => {
    await dispatch(deleteProduct(id));
    navigate('/');
  };
  return (
    <>
      <Button component={Link} to={`/`} size="small">Back</Button>

      <Box
        display={'flex'}
      >

        <img
          style={{width:'500px'}}
          src={`http://localhost:8000/${productInfo?.image}`}
          alt="img"/>
        {
          fetchLoadInfo ? <CircularProgress/> :
            productInfo ?
              <Card
                sx={{width: 545}}
              >

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <span style={{fontWeight:900}}>Title:</span>{productInfo.title}
                  </Typography>

                  <Typography gutterBottom variant="h5" component="div">
                    <span style={{fontWeight:900}}>description:</span> {productInfo.description}
                  </Typography>

                  <Typography gutterBottom variant="h5" component="div">
                    <span style={{fontWeight:900}}>Category:</span> {productInfo.category}
                  </Typography>

                  <Typography gutterBottom variant="h5" component="div">
                    <span style={{fontWeight:900}}>Username:</span> {productInfo.user.username}
                  </Typography>


                  <Typography gutterBottom variant="h5" component="div">
                    <span style={{fontWeight:900}}>Phone:</span> {productInfo.user.phone}
                  </Typography>

                  <Typography gutterBottom variant="h5" component="div">
                    <span style={{fontWeight:900}}>Title:</span> {productInfo.price} Kgz
                  </Typography>
                </CardContent>
                <CardActions>
                  {
                    user?._id === productInfo.user._id ? (
                      <Button
                        disabled={!!deleteLoad}
                        onClick={() => deleteProductId(productInfo._id)}
                      >
                        delete
                      </Button>
                    ) : null
                  }

                </CardActions>
              </Card> : null
        }

      </Box>
    </>
  );
};

export default ProductsInfo;