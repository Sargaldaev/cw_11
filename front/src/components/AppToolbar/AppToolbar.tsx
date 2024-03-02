import { useState } from 'react';
import { AppBar, Button, styled, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import AnonymousMenu from './AnonymousMenu';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import CATEGORY from '../../../Constants.ts';
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
  const [value, setValue] = useState('AllItems');
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };
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
      <Tabs value={value}>
        {CATEGORY.map((category, index) => (
          <Tab
            key={index}
            label={category}
            value={category}
            onChange={() => handleChange(category)}
            component={Link}
            to={category === 'AllItems' ? '/' : `/products?category=${category}`}
          />
        ))}
      </Tabs>
    </>

  );
};

export default AppToolbar;