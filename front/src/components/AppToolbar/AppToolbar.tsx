import { useEffect, useState } from 'react';
import { AppBar, Button, styled, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { Link as NavLink, useLocation } from 'react-router-dom';
import AnonymousMenu from './AnonymousMenu';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import UserMenu from './userMenu.tsx';
import { fetchCategories } from '../../store/category/categoryThunk.ts';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  }
});

const AppToolbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {search} = useLocation();
  const searchQuery = new URLSearchParams(search);
  const categorySearch = searchQuery.get('category');
  const {user} = useSelector((state: RootState) => state.user);
  const {categories} = useSelector((state: RootState) => state.category);
  const [value, setValue] = useState('');
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(fetchCategories());

      setValue(categorySearch || '/');

  }, [dispatch, categorySearch]);
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
    </>

  );
};

export default AppToolbar;