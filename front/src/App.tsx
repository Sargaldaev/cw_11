import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import AppToolbar from './components/AppToolbar/AppToolbar.tsx';
import RegisterForm from './features/Users/RegisterForm.tsx';
import LoginForm from './features/Users/LoginForm.tsx';

function App() {

  return (
    <>
      <CssBaseline/>
      <header style={{marginBottom: 70}}>

        <AppToolbar/>
      </header>
      <Container>
        <Routes>
          <Route path={'/register'} element={<RegisterForm/>}/>
          <Route path={'/login'} element={<LoginForm/>}/>
          <Route path={'*'} element={<h1>Not Found</h1>}/>
        </Routes>
      </Container>
    </>
  );
}

export default App;
