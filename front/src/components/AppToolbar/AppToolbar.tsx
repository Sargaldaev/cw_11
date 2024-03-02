import { AppBar, Button, styled, Toolbar, Typography } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import AnonymousMenu from './AnonymousMenu';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import UserMenu from './userMenu.tsx';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  }
});

const AppToolbar = () => {
  const {user} = useSelector((state: RootState) => state.user);

  return (
    <>
      <AppBar position="sticky" sx={{mb: 2}}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{flexGrow: 1}}>
            <Link to="/">Lalafo</Link>
          </Typography>
          {user ? <UserMenu user={user}/> : <AnonymousMenu/>}
          {user ? <Button component={Link} sx={{color: 'white'}} to={`/products/new`} size="small"> Add
            Product</Button> : <></>}

        </Toolbar>
      </AppBar>
    </>

  );
};

export default AppToolbar;