import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery';
import './App.css';
import Header from './Header'
import SearchConnection from './SearchConnection'
import Offer from './Offer'
import Footer from './Footer'



function App() {
  return (
    <>
      <Header />
      <SearchConnection />
      <Offer />
      <Footer />
    </>
  );
}

export default App;
