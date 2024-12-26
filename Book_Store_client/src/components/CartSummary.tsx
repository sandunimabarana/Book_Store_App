import { useLocation, useNavigate } from "react-router-dom";

interface CartItem {
  bookId: number;
  name: string;
  quantity: number;
  price: number;
  totalPrice: number; // Quantity * Price
}

function CartSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];
  const totalCost = cart.reduce(
    (sum: number, item: CartItem) => sum + item.totalPrice,
    0
  );

  const handleSubmit = () => {
    // Simulate saving cart to database
    alert("Cart submitted successfully!");
    navigate("/"); // Redirect to homepage or any other page
  };

  return (
    <div className="cart-summary">
      <h2>Cart Summary</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item: CartItem) => (
            <li key={item.bookId}>
              {item.name} - Quantity: {item.quantity}, Total: $
              {item.totalPrice.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
      <p>
        <strong>Total Cost:</strong> ${totalCost.toFixed(2)}
      </p>
      <button onClick={handleSubmit} disabled={cart.length === 0}>
        Submit Cart
      </button>
    </div>
  );
}

export default CartSummary;
