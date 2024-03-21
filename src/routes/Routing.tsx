import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import Test from '@/pages/Test/Test';
import Layout from '@/pages/Layout/Layout';
import SignIn from '@/pages/Sign/SignIn/SignIn';
import SignOn from '@/pages/Sign/SignOn/SignOn';
import Report from '@/pages/Report/Report';

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-on" element={<SignOn />}></Route>
        <Route path="/report/:email" element={<Report />}></Route>
        <Route path="/test" element={<Test />} />
      </Route>
    </Routes>
  );
};

export default Routing;
