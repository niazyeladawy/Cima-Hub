import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/Navbar/Navbar';

import Search from './Pages/Search/Search';
import Series from './Pages/Series/Series';
import Movies from './Pages/Movies/Movies';
import Trending from './Pages/Trending/Trending';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <Container>
          <Routes>
            <Route path="/" element={<Trending />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Container>

      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>

  );
}

export default App;
