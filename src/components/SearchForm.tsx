import { Component, type ReactNode } from 'react';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';

type SearchFormProps = {
  searchQuery: string;
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

    return (
      <div className="wrapper">
        <MyInput
          type="text"
          value={searchQuery}
          name="SearchInput"
          className="my_input"
          onChange={(e): void => {
            this.setState({ searchQuery: e.target.value });
          }}
          onBlur={(e): void => {
            const trimmed = e.target.value.trim();
            if (trimmed !== searchQuery) {
              this.setState({ searchQuery: trimmed });
            }
          }}
        />
        <MyButton
          onClick={() => {
            this.props.onSearchQueryChange(searchQuery);
          }}
        >
          Search images
        </MyButton>
      </div>
    );
  }
}
