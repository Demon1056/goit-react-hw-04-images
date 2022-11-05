import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './SearchbarStyled';
import { AiOutlineSearch } from 'react-icons/ai';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };
  resetForm = () => {
    this.setState({ inputValue: '' });
  };
  handleChange = e =>
    this.setState({
      inputValue: e.target.value,
    });
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputValue);
    this.resetForm();
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            {' '}
            <AiOutlineSearch color={'grey'} size={'20px'} />
            <SearchFormButtonLabel></SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            name="findValue"
            value={this.state.inputValue}
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </SearchForm>{' '}
      </Header>
    );
  }
}
SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
