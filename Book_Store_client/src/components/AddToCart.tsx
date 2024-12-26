import { useState } from "react";

interface Book {
  id: number;
  name: string;
  author: string;
  category: string;
  price: number;
}

interface AddToCartProps {
  book: Book;
  onAddToCart: (bookId: number, quantity: number) => void;
}

const AddToCart: React.FC<AddToCartProps> = ({ book, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(book.id, quantity);
  };

  return (
    <div className="add-to-cart">
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={handleQuantityChange}
      />
      <button
        onClick={handleAddToCart}
        disabled={quantity < 1}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCart;
