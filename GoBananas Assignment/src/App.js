// src/App.js

import React from 'react';
import PostList from './components/PostList';
import { CssBaseline } from '@mui/material';

const App = () => {
  return (
    <>
      <CssBaseline />
      <PostList />
    </>
  );
};

export default App;
