import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeItem } from "./CartSlice";
import { useNavigate } from "react-router-dom";
import "./CartItem.css";

const CartItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={item.image} alt={item.name} className="cart-image" />

              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>Unit Price: ${item.cost}</p>
                <p>Total: ${item.totalPrice}</p>

                <div className="quantity-controls">
                  <button onClick={() => dispatch(decreaseQuantity(item.name))}>
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(increaseQuantity(item.name))}>
                    +
                  </button>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => dispatch(removeItem(item.name))}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          <h3>Total Cart Amount: ${totalAmount}</h3>

          <div className="cart-actions">
            <button onClick={() => navigate("/plants")}>
              Continue Shopping
            </button>
            <button onClick={() => alert("Checkout Coming Soon!")}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;
