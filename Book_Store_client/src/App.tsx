import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Book from "./components/Book";
import CartSummary from "./components/CartSummary";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Book />} />
        <Route path="/cart-summary" element={<CartSummary />} />
      </Routes>
    </Router>
  );
}

export default App;
