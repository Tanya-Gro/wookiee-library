import { Component, type ReactNode } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';

class App extends Component {
  state = {
    searchQuery: '',
  };

  handleSearchChange = (newValue: string): void => {
    this.setState({ searchQuery: newValue });
  };

  render(): ReactNode {
    return (
      <SearchForm
        searchQuery={this.state.searchQuery}
        onSearchQueryChange={this.handleSearchChange}
      />
    );
  }
}

export default App;
