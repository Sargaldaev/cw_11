import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import AppToolbar from './components/AppToolbar/AppToolbar.tsx';
import RegisterForm from './features/Users/RegisterForm.tsx';
import LoginForm from './features/Users/LoginForm.tsx';
import ProductsInfo from './features/Products/ProductsInfo.tsx';
import Products from './features/Products/Products.tsx';
import NewProduct from './features/Products/NewProduct.tsx';

function App() {

  return (
    <>
      <CssBaseline/>
      <header style={{marginBottom: 70}}>

        <AppToolbar/>
      </header>
      <Container>
        <Routes>
          <Route path={'/'} element={<Products/>}/>
          <Route path='/:category' element={<Products/>}/>
          <Route path='/products/new' element={<NewProduct/>}/>
          <Route path={'/products/:id'} element={<ProductsInfo/>}/>
          <Route path={'/register'} element={<RegisterForm/>}/>
          <Route path={'/login'} element={<LoginForm/>}/>
          <Route path={'*'} element={<h1>Not Found</h1>}/>
        </Routes>
      </Container>
    </>
  );
}

export default App;
