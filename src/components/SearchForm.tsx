import { Component, type ReactNode } from 'react';
import Button from './UI/button/Button';

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
      <div className="wrapper" data-testid="search-form">
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
        <Button
          disabled={isLoading}
          onClick={() => {
            this.props.onSearchQueryChange(searchQuery.trim());
          }}
        >
          Search images
        </Button>
      </div>
    );
  }
}
