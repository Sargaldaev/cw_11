import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Container, FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select, SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { ProductPost } from '../../types';
import { createProduct, fetchProduct } from '../../store/product/productThunk.ts';
import { fetchCategories } from '../../store/category/categoryThunk.ts';


const NewPost = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState('');
  const {user} = useSelector((state: RootState) => state.user);
  const {categories} = useSelector((state: RootState) => state.category);

  const [state, setState] = useState<ProductPost>({
    title: '',
    description: '',
    price: '',
    image: null,
    category: ''
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const defaultTheme = createTheme();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    dispatch(fetchCategories());
  }, [user, navigate]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError('');
  };

  const inputChangeHandlerSelect = (event: SelectChangeEvent) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(createProduct(state));
      navigate('/');
      await dispatch(fetchProduct());
    } catch {
      // nothing
    }
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }

    if (inputRef.current?.files) {
      const image = inputRef.current?.files[0];
      setState((prevState) => ({
        ...prevState,
        image
      }));
    }
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            New post
          </Typography>
          <Box component="form" noValidate onSubmit={submitFormHandler} sx={{mt: 3}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="title"
                  name="title"
                  type="text"
                  autoComplete="new-username"
                  value={state.title}
                  onChange={inputChangeHandler}
                  fullWidth={true}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="description"
                  name="description"
                  type="text"
                  autoComplete="new-description"
                  value={state.description}
                  onChange={inputChangeHandler}
                  fullWidth={true}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="price"
                  name="price"
                  type="text"
                  autoComplete="new-price"
                  value={state.price}
                  onChange={inputChangeHandler}
                  fullWidth={true}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category-select"
                    name="category"
                    value={state.category}
                    onChange={inputChangeHandlerSelect}
                    required
                  >
                    <MenuItem value="" disabled>
                      Choose category
                    </MenuItem>
                    {categories.map((category) => category.title !== 'AllItems' && (
                      <MenuItem key={category._id} value={category._id}>
                        {category.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <input
                  style={{display: 'none'}}
                  type="file"
                  name="image"
                  onChange={onFileChange}
                  ref={inputRef}
                />
                <Grid container direction="row" mt={2} alignItems="center">
                  <Grid item xs mr={2}>
                    <TextField
                      disabled
                      label="Browse image"
                      value={filename}
                      onClick={activateInput}
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <Button variant="contained" onClick={activateInput}>
                      Browse
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {error.length !== 0 && (
              <Alert severity="error" sx={{mt: 1, width: '100%'}}>
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
            >
              Create post
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default NewPost;
