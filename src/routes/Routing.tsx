import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import Test from '@/pages/Test/Test';
import Layout from '@/pages/Layout/layout';

const Routing = () => {
  return (
    <Routes>
      <Route path="*" element={<Layout />}>
        <Route index element={<Home />}></Route>
      </Route>
      <Route path="/test" element={<Test />} />
    </Routes>
  );
};

export default Routing;
