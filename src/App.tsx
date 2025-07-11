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
  countPages: number;
  isLoading: boolean;
  hasError: boolean;
  cards: Card[];
};

class App extends Component<object, AppState> {
  state = {
    searchQuery: localStorage.getItem('searchQuery') || '',
    currentPage: 1,
    countPages: 1,
    isLoading: false,
    hasError: false,
    cards: [],
  };

  handleSearchChange = (newValue: string): void => {
    this.setState({ searchQuery: newValue, currentPage: 1 });
    localStorage.setItem('searchQuery', newValue);
  };

  handlePageChange = (newPage: number): void => {
    this.setState({ currentPage: newPage });
  };

  fetchCards(): void {
    const COUNT_CARDS_PER_PAGE = 10;

    this.setState({ isLoading: true });

    DataFetcher(this.state.searchQuery, this.state.currentPage)
      .then((data) => {
        if (data) {
          this.setState({
            cards: data.cards,
            countPages:
              Math.ceil(data.totalCountCards / COUNT_CARDS_PER_PAGE) | 1,
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
    const { searchQuery, currentPage, countPages, cards, isLoading } =
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
          countPages={countPages}
          onPageChange={this.handlePageChange}
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
