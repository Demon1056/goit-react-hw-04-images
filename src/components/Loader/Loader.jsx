import { InfinitySpin } from 'react-loader-spinner';
import { LoaderStyled } from './LoaderStyled';
export const Loadrer = () => (
  <LoaderStyled>
    <InfinitySpin width="200" color=" #3f51b5" />
  </LoaderStyled>
);
