import { Component, type ReactNode } from 'react';
import MyButton from './UI/button/MyButton';

type SearchFormProps = {
  searchQuery: string;
  isLoading: boolean;
  onSearchQueryChange: (searchQuery: string) => void;
};

type SearchFormState = {
  searchQuery: string;
};

export default class SearchForm extends Component<
  SearchFormProps,
  SearchFormState
> {
  state = {
    searchQuery: this.props.searchQuery,
  };

  render(): ReactNode {
    const { searchQuery } = this.state;
    const isLoading = this.props.isLoading;

    return (
      <div className="wrapper">
        <input
          type="text"
          value={searchQuery}
          name="SearchInput"
          className="input search_input"
          disabled={isLoading}
          placeholder="Looking for..."
          onChange={(e): void => {
            this.setState({ searchQuery: e.target.value });
          }}
        />
        <MyButton
          disabled={isLoading}
          onClick={() => {
            this.props.onSearchQueryChange(searchQuery.trim());
          }}
        >
          Search images
        </MyButton>
      </div>
    );
  }
}
