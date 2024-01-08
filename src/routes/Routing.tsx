import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import Test from '@/pages/Test/Test';
import Layout from '@/pages/Layout/Layout';
import Counter from '@/components/Counter/Counter';

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="count" element={<Counter />}></Route>
        <Route path="test" element={<Test />} />
      </Route>
    </Routes>
  );
};

export default Routing;
