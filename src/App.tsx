import type { Card } from './app/types';

import { Component, type ReactNode } from 'react';
import SearchForm from './components/SearchForm';
import CardForm from './components/CardForm';
import MyButton from './components/UI/button/MyButton';
import Pagination from './components/Pagination';
import DataFetcher from './api/DataFetcher';
import './App.css';
import MyLoader from './components/UI/loader/MyLoader';

type AppState = {
  searchQuery: string;
  currentPage: number;
  pageCount: number;
  isLoading: boolean;
  hasError: boolean;
  cards: Card[];
};

class App extends Component<object, AppState> {
  state = {
    searchQuery: localStorage.getItem('searchQuery') || '',
    currentPage: 1,
    pageCount: 1,
    isLoading: false,
    hasError: false,
    cards: [],
  };

  handleSearchChange = (query: string): void => {
    this.setState({ searchQuery: query, currentPage: 1 });
    localStorage.setItem('searchQuery', query);
  };

  handlePageChange = (page: number): void => {
    this.setState({ currentPage: page });
  };

  fetchCards(): void {
    const CARDS_PER_PAGE = 10;

    this.setState({ isLoading: true });

    DataFetcher(this.state.searchQuery, this.state.currentPage)
      .then((data) => {
        if (data) {
          this.setState({
            cards: data.cards,
            pageCount: Math.max(
              1,
              Math.ceil(data.totalCountCards / CARDS_PER_PAGE)
            ),
            isLoading: false,
            hasError: false,
          });
        } else {
          this.setState({ hasError: true, isLoading: false });
        }
      })
      .catch(() => {
        this.setState({ hasError: true, isLoading: false });
      });
  }

  componentDidMount(): void {
    this.fetchCards();
  }

  componentDidUpdate(_: object, prevState: AppState): void {
    const { searchQuery, currentPage } = this.state;

    if (
      prevState.searchQuery !== searchQuery ||
      prevState.currentPage !== currentPage
    ) {
      this.fetchCards();
    }
  }

  render(): ReactNode {
    const { searchQuery, currentPage, pageCount, cards, isLoading } =
      this.state;

    if (this.state.hasError) {
      throw new Error('Test error');
    }
    return (
      <>
        <SearchForm
          searchQuery={searchQuery}
          onSearchQueryChange={this.handleSearchChange}
        />
        {isLoading ? <MyLoader /> : <CardForm cards={cards} />}
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChange={this.handlePageChange}
          isLoading={isLoading}
        />
        <div className="wrapper right">
          <MyButton
            onClick={() => {
              this.setState({ hasError: true });
            }}
          >
            Throw error
          </MyButton>
        </div>
      </>
    );
  }
}

export default App;
