import PropTypes from 'prop-types';
import { LoadMore } from './ButtonStyled';
export const Button = ({ addPage }) => {
  return (
    <LoadMore type="button" onClick={addPage}>
      LoadMore
    </LoadMore>
  );
};

Button.propTypes = {
  addPage: PropTypes.func.isRequired,
};
