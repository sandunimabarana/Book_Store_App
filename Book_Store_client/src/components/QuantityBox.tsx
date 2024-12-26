import { useState } from "react";

interface QuantityBoxProps {
  bookId: number;
  bookName: string;
  bookPrice: number;
  onAddToCart: (id: number, quantity: number) => void;
}

const QuantityBox: React.FC<QuantityBoxProps> = ({ bookId, bookName, bookPrice, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  return (
    <div className="quantity-box">
      {/* Quantity Input */}
      <input
        id={`quantity-${bookId}`}
        type="number"
        min="1"
        value={quantity}
        onChange={handleQuantityChange}
      />
      
      {/* Add to Cart Button */}
      <button
        onClick={() => onAddToCart(bookId, quantity)}
        disabled={quantity < 1}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default QuantityBox;
