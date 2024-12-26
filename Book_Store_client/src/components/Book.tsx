import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddToCart from "./AddToCart";
import "../book.css";

interface Book {
  id: number;
  name: string;
  author: string;
  category: string;
  price: number;
}

interface CartItem {
  bookId: number;
  name: string;
  quantity: number;
  price: number;
  totalPrice: number; // Quantity * Price
}

function Book() {
  const [books, setBooks] = useState<Book[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<Book[]>("/api/books")
      .then((response) => {
        const updatedBooks = response.data.map((book) => ({
          ...book,
          price: parseFloat(book.price),
        }));
        setBooks(updatedBooks);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  const handleAddToCart = (bookId: number, quantity: number) => {
    const selectedBook = books.find((book) => book.id === bookId);
    if (!selectedBook) return;

    const existingItemIndex = cart.findIndex((item) => item.bookId === bookId);
    const itemTotalPrice = selectedBook.price * quantity;

    if (existingItemIndex === -1) {
      setCart((prevCart) => [
        ...prevCart,
        {
          bookId: bookId,
          name: selectedBook.name,
          quantity: quantity,
          price: selectedBook.price,
          totalPrice: itemTotalPrice,
        },
      ]);
    } else {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      updatedCart[existingItemIndex].totalPrice += itemTotalPrice;
      setCart(updatedCart);
    }
  };

  const handleViewCart = () => {
    navigate("/cart-summary", { state: { cart } });
  };

  return (
    <div>
      <div className="book-grid">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <h2>{book.name}</h2>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            <p>
              <strong>Category:</strong> {book.category}
            </p>
            <p>
              <strong>Price:</strong> ${book.price.toFixed(2)}
            </p>
            <AddToCart book={book} onAddToCart={handleAddToCart} />
          </div>
        ))}
      </div>
      <button onClick={handleViewCart} disabled={cart.length === 0}>
        View Cart
      </button>
      <div className="cart-summary">
        <h2>Cart Summary</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.bookId}>
                {item.name} - Quantity: {item.quantity}, Total: $
                {item.totalPrice.toFixed(2)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Book;
