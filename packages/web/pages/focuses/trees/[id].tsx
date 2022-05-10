import { NextPage } from 'next';
import { Container } from '@mui/material';
import dynamic from 'next/dynamic';

const FocusTreeViewer = dynamic(
  () => import('../../../components/FocusTreeViewer'),
  { ssr: false },
);

const FocusTreeInfo: NextPage<any> = ({ province }) => {
  return (
    <Container maxWidth="lg">
      <FocusTreeViewer />
    </Container>
  );
};

export default FocusTreeInfo;
