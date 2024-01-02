import { Container } from '@mui/material';
import Counter from '@/components/Counter/Counter';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Container sx={{ py: 2, position: 'relative' }}>
      <Outlet />
      <Counter />
    </Container>
  );
};

export default Layout;
