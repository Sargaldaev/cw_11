import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Alert, Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import { Login } from '../../types';
import { login } from '../../store/user/userThunk.ts';

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {loginError: error, loginLoad} = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [state, setState] = useState<Login>({
    username: '',
    password: '',
  });
  const defaultTheme = createTheme();

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await dispatch(login(state)).unwrap();
      navigate('/');
    } catch (e) {
      // nothing
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
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {
            error &&
            <Alert severity="error" sx={{mt: 3, width: '100%'}}>
              {error.error}
            </Alert>
          }
          <Box component="form" noValidate onSubmit={submitFormHandler} sx={{mt: 3}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="username"
                  name="username"
                  autoComplete="new-username"
                  value={state.username}
                  onChange={inputChangeHandler}
                  fullWidth={true}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={state.password}
                  onChange={inputChangeHandler}
                  fullWidth={true}
                  required
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
              disabled={!!loginLoad}
            >
              {loginLoad ? <CircularProgress/> : 'Sign In'}

            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/register" variant="body2">
                  Don't have an account? Sign up!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginForm;
