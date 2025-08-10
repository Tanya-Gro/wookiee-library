import type { ChangeEvent, FC } from 'react';

import { useState } from 'react';

import Button from '../UI/button/Button';
import { useQueryClient } from '@tanstack/react-query';

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

  const queryClient = useQueryClient();

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
      <Button
        onClick={() =>
          queryClient.invalidateQueries({ queryKey: ['cards', searchQuery] })
        }
      >
        Refresh
      </Button>
    </div>
  );
};

export default SearchForm;
