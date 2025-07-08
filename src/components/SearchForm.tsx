import { Component, type ReactNode } from 'react';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';

type MySearchFormProps = {
  searchQuery: string;
  onSearchQueryChange: (searchQuery: string) => void;
};

export default class SearchForm extends Component<MySearchFormProps> {
  render(): ReactNode {
    return (
      <div className="wrapper">
        <MyInput
          type="text"
          value={this.props.searchQuery}
          name="SearchInput"
          onChange={(e): void => {
            this.props.onSearchQueryChange(e.target.value);
          }}
        />
        <MyButton
          onClick={() => console.log('looking for:', this.props.searchQuery)}
        >
          Search images
        </MyButton>
      </div>
    );
  }
}
