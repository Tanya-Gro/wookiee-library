import { useState, type ChangeEvent, type FC } from 'react';
import Button from '../UI/button/Button';

type SearchFormProps = {
  searchQuery: string;
  isLoading: boolean;
  onSearchQueryChange: (searchQuery: string) => void;
};

const SearchForm: FC<SearchFormProps> = ({
  searchQuery,
  isLoading,
  onSearchQueryChange,
}: SearchFormProps) => {
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const handleSearch = (): void => {
    onSearchQueryChange(inputValue.trim());
  };

  return (
    <div className="wrapper" data-testid="search-form">
      <input
        type="text"
        value={inputValue}
        name="SearchInput"
        className="input search_input"
        disabled={isLoading}
        placeholder="Looking for..."
        onChange={handleInputChange}
      />
      <Button disabled={isLoading} onClick={handleSearch}>
        Search images
      </Button>
    </div>
  );
};

export default SearchForm;
