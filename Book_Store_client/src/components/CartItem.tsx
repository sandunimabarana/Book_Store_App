interface CartItemProps {
    id: number;
    name: string;
    quantity: number;
    price: number;
    onRemoveFromCart: (id: number) => void;
  }
  
  const CartItem: React.FC<CartItemProps> = ({ id, name, quantity, price, onRemoveFromCart }) => {
    return (
      <div className="cart-item">
        <h3>{name}</h3>
        <p>Quantity: {quantity}</p>
        <p>Total: ${(price * quantity).toFixed(2)}</p>
        <button onClick={() => onRemoveFromCart(id)}>Remove</button>
      </div>
    );
  };
  
  export default CartItem;
  