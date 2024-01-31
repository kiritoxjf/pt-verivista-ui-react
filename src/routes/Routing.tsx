import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import Test from '@/pages/Test/Test';
import Layout from '@/pages/Layout/Layout';
import Counter from '@/components/Counter/Counter';
import SignIn from '@/pages/Sign/SignIn/SignIn';
import SignOn from '@/pages/Sign/SignOn/SignOn';

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="sign-in" element={<SignIn />}></Route>
        <Route path="sign-on" element={<SignOn />}></Route>
        <Route path="count" element={<Counter />}></Route>
        <Route path="test" element={<Test />} />
      </Route>
    </Routes>
  );
};

export default Routing;
