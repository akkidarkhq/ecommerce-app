import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store/store';
import { useAuth } from '../../context/AuthContext';
import { clearCartItems } from '../../utils/cartUtils/cartUtils';

interface CartProps {
  onClose: () => void;
  onOrder: () => void;
}

const Cart: React.FC<CartProps> = ({ onClose, onOrder }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const context = useAuth();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleOrder = () => {
    onOrder();
  };

  return (
    <div className="modal fade show d-block" tabIndex={-1} role="dialog" style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Your Cart</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {cartItems.length > 0 ? (
              <ul className="list-group">
                {cartItems.map((item) => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0">{item.title}</h6>
                      <small>Qty: {item.quantity}</small>
                    </div>
                    <span className="badge bg-primary">${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center">Your cart is empty</p>
            )}

            <hr />

            <h5 className="text-end">Total: ${totalPrice.toFixed(2)}</h5>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            {cartItems.length > 0 && (
              <button
                className="btn btn-danger"
                onClick={() => {
                  clearCartItems(dispatch);
                }}>
                Clear cart <i className="bi bi-cart-x-fill"></i>
              </button>
            )}
            {!context.isLoggedIn ? (
              <p className="text-bg-danger">u need to login, first to place order</p>
            ) : (
              cartItems.length > 0 && (
                <button className="btn btn-success" onClick={handleOrder}>
                  Order Now
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
