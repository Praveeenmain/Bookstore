import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Components/Home";
import Books from "./Components/Books";
import BookDetails from "./Components/BookDetails";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import NotFound from './Components/NotFound';

const App = () => {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/bookdetails/:id" element={<BookDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
         </Routes>
      </Router>
   );
};

export default App;
