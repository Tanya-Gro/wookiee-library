import type { Card } from './app/types';

import { Component, type ReactNode } from 'react';
import SearchForm from './components/SearchForm';
import CardForm from './components/CardForm';
import Pagination from './components/Pagination';
import Loader from './components/UI/loader/Loader';
import getCards from './api/getCards';
import { isFetchError } from './helpers/isFetchError';
import './App.css';

type AppState = {
  searchQuery: string;
  currentPage: number;
  pageCount: number;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
  cards: Card[];
};

class App extends Component<object, AppState> {
  state = {
    searchQuery: localStorage.getItem('searchQuery') || '',
    currentPage: 1,
    pageCount: 1,
    isLoading: false,
    hasError: false,
    errorMessage: '',
    cards: [],
  };

  handleSearchChange = (query: string): void => {
    this.setState({ searchQuery: query, currentPage: 1 });
    localStorage.setItem('searchQuery', query);
  };

  handlePageChange = (page: number): void => {
    this.setState({ currentPage: page });
  };

  async componentDidMount(): Promise<void> {
    this.setState({ isLoading: true });
    const data = await getCards(this.state.searchQuery, this.state.currentPage);

    if (!isFetchError(data)) {
      this.setState({
        cards: data.cards,
        pageCount: data.pageCount,
        isLoading: false,
        hasError: false,
      });
    } else {
      this.setState({
        hasError: true,
        errorMessage: data.message,
        isLoading: false,
      });
    }
  }

  componentDidUpdate(_: object, prevState: AppState): void {
    const { searchQuery, currentPage } = this.state;
    if (
      prevState.searchQuery !== searchQuery ||
      prevState.currentPage !== currentPage
    ) {
      this.componentDidMount();
    }
  }

  render(): ReactNode {
    const {
      searchQuery,
      currentPage,
      pageCount,
      cards,
      isLoading,
      errorMessage,
      hasError,
    } = this.state;

    if (hasError) {
      throw new Error(errorMessage);
    }
    return (
      <>
        <SearchForm
          searchQuery={searchQuery}
          isLoading={isLoading}
          onSearchQueryChange={this.handleSearchChange}
        />
        {isLoading ? <Loader /> : <CardForm cards={cards} />}
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChange={this.handlePageChange}
          isLoading={isLoading}
        />
      </>
    );
  }
}

export default App;
