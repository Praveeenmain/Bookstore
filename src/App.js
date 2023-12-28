import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Books from './Components/Books';
import BookDetails from './Components/BookDetails';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
import NotFound from './Components/NotFound';
import { CartProvider } from './Context/cartcontext';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
       
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>
    </Router>
  );
};

export default App;
