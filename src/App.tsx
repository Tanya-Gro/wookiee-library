import { Component, type ReactNode } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import CardForm from './components/CardForm';
import MyButton from './components/UI/button/MyButton';
import Pagination from './components/Pagination';

type AppState = {
  searchQuery: string;
  currentPage: number;
  countPages: number;
  isLoading: boolean;
  hasError: boolean;
};

class App extends Component<object, AppState> {
  state = {
    searchQuery: localStorage.getItem('searchQuery') || '',
    currentPage: 1,
    countPages: 1,
    isLoading: false,
    hasError: false,
  };

  handleSearchChange = (newValue: string): void => {
    this.setState({ searchQuery: newValue });
    localStorage.setItem('searchQuery', newValue);
  };

  handlePageChange = (newPage: number): void => {
    this.setState({ currentPage: newPage });
  };

  handleFirstPage = (): void => {
    this.setState({ currentPage: 1 });
  };

  updatePagesCount = (newPage: number): void => {
    this.setState({ countPages: newPage });
  };

  render(): ReactNode {
    return (
      <>
        <SearchForm
          searchQuery={this.state.searchQuery}
          onSearchQueryChange={this.handleSearchChange}
          updatePagesCount={this.updatePagesCount}
          handleFirstPage={this.handleFirstPage}
        />
        <CardForm
          searchQuery={this.state.searchQuery}
          currentPage={this.state.currentPage}
          updatePagesCount={this.updatePagesCount}
        />
        <hr />
        <Pagination
          currentPage={this.state.currentPage}
          countPages={this.state.countPages}
          onPageChange={this.handlePageChange}
        />
        <hr />
        <div className="wrapper right">
          <MyButton onClick={() => console.error('error')}>
            Error Button
          </MyButton>
        </div>
      </>
    );
  }
}

export default App;
