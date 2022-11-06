import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './SearchbarStyled';
import { AiOutlineSearch } from 'react-icons/ai';

export const Searchbar = ({ changeInputValue }) => {
  const [inputValue, setInputValue] = useState('');
  const resetForm = () => setInputValue('');
  const handleChange = e => setInputValue(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    changeInputValue(inputValue);
    resetForm();
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          {' '}
          <AiOutlineSearch color={'grey'} size={'20px'} />
          <SearchFormButtonLabel></SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          name="findValue"
          value={inputValue}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </SearchForm>{' '}
    </Header>
  );
};

SearchForm.propTypes = {
  changeInputValue: PropTypes.func,
};
