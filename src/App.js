import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Components/Home";
import Books from "./Components/Books";
import BookDetails from "./Components/BookDetails";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";

const App=()=>{
   return(
    <Router>
         
            <Routes>
                   <Route path="/" element={<Home />}/>
                   <Route path="/Books" element={<Books />}/>
                   <Route path="/bookdetails" element={<BookDetails />}/>
                   <Route path="/cart" element={<Cart />}/>
                   <Route path="/checkout" element={<Checkout/>}/>








            </Routes>





    </Router>
   )
}
export default App