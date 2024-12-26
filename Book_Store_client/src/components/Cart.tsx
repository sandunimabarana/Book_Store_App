import CartItem from "./CartItem";

interface CartProps {
  cart: { id: number; name: string; quantity: number; price: number }[];
  onRemoveFromCart: (id: number) => void;
}

const Cart: React.FC<CartProps> = ({ cart, onRemoveFromCart }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              onRemoveFromCart={onRemoveFromCart}
            />
          ))}
          <p>
            <strong>Total Price:</strong> ${total.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default Cart;
