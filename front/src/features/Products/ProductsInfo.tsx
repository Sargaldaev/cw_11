import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { deleteProduct, fetchProductInfo } from '../../store/product/productThunk.ts';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Button, CircularProgress, Typography } from '@mui/material';
import CardActions from '@mui/material/CardActions';

const ProductsInfo = () => {
  const {id} = useParams() as { id: string };
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {productInfo, fetchLoadInfo} = useSelector((state: RootState) => state.product);
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
      {
        fetchLoadInfo ? <CircularProgress/> :
          productInfo ?
            <Card
              sx={{width: 345}}
            >
              <CardMedia
                sx={{height: 350}}
                image={`http://localhost:8000/${productInfo.image}`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {productInfo.title}
                </Typography>

                <Typography gutterBottom variant="h5" component="div">
                  {productInfo.description}
                </Typography>

                <Typography gutterBottom variant="h5" component="div">
                  {productInfo.category}
                </Typography>

                <Typography gutterBottom variant="h5" component="div">
                  {productInfo.user.username}
                </Typography>

                <Typography gutterBottom variant="h5" component="div">
                  {productInfo.price} Kgz
                </Typography>
              </CardContent>
              <CardActions>
                {
                  user?._id === productInfo.user._id ? (
                    <Button
                      onClick={() => deleteProductId(productInfo._id)}
                    >
                      delete
                    </Button>
                  ) : null
                }

              </CardActions>
            </Card> : null
      }

    </>
  );
};

export default ProductsInfo;