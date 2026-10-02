import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import { selectCartItems, selectCartTotals } from '../features/cart/cartSelectors';
import { setActiveTab, showNotification } from '../features/ui/uiSlice';

export const CheckoutPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const { subtotal, deliveryFee, taxes, grandTotal, isCartEmpty } = useSelector(selectCartTotals);
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      dispatch(
        showNotification({
          type: 'error',
          message: 'Please register or log in before placing an order.',
        })
      );
      dispatch(setActiveTab('signup'));
      return;
    }

    if (!deliveryAddress.trim()) {
      dispatch(
        showNotification({
          type: 'error',
          message: 'Please provide a valid delivery address.',
        })
      );
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setOrderConfirmed(true);
      dispatch(clearCart());
      dispatch(
        showNotification({
          type: 'success',
          message: 'Order received! The kitchen is preparing your meal.',
        })
      );
    }, 1500);
  };

  if (orderConfirmed) {
    return (
      <div className="page-container center-content">
        <div className="success-card">
          <div className="checkmark-icon">🎉</div>
          <h2>Order Confirmed!</h2>
          <p>
            Thank you, <strong>{currentUser?.fullName}</strong>. Your hot pizza is on its way to:
          </p>
          <blockquote className="address-quote">{deliveryAddress}</blockquote>
          <p>A confirmation SMS has been dispatched to <strong>{currentUser?.phone}</strong>.</p>
          <button className="primary-btn" onClick={() => dispatch(setActiveTab('menu'))}>
            Back to Pizza Menu
          </button>
        </div>
      </div>
    );
  }

  if (isCartEmpty) {
    return (
      <div className="page-container center-content">
        <div className="empty-cart-card">
          <h2>Your Cart is Empty</h2>
          <p>Select your favorite pizzas before proceeding to checkout.</p>
          <button className="primary-btn" onClick={() => dispatch(setActiveTab('menu'))}>
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="checkout-layout">
        <div className="checkout-form-column">
          <h2>Delivery & Contact Details</h2>

          {!isAuthenticated ? (
            <div className="auth-alert-box">
              <p>You are checking out as a Guest.</p>
              <button
                className="secondary-btn"
                onClick={() => dispatch(setActiveTab('signup'))}
              >
                Sign Up / Login First
              </button>
            </div>
          ) : (
            <div className="user-summary-box">
              <p><strong>Name:</strong> {currentUser?.fullName}</p>
              <p><strong>Phone:</strong> {currentUser?.phone}</p>
              <p><strong>Email:</strong> {currentUser?.email}</p>
            </div>
          )}

          <form onSubmit={handlePlaceOrder}>
            <div className="input-group">
              <label>Delivery Address</label>
              <textarea
                rows="4"
                placeholder="Enter Flat / House No, Street, Landmark and Pincode..."
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                required
              />
            </div>

            <div className="payment-method-box">
              <label>Payment Method</label>
              <div className="payment-option">
                <input type="radio" id="cod" name="payment" defaultChecked />
                <label htmlFor="cod">Cash / UPI on Delivery</label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="place-order-btn"
            >
              {isProcessing ? 'Confirming Order...' : `Pay & Place Order (₹${grandTotal})`}
            </button>
          </form>
        </div>

        <div className="checkout-summary-column">
          <h3>Order Overview ({items.length} pizzas)</h3>
          <div className="summary-list">
            {items.map((item) => (
              <div key={item.configHash} className="summary-item-row">
                <div>
                  <strong>{item.quantity}x {item.name}</strong>
                  <div className="specs">
                    {item.size.toUpperCase()} | {item.crust}
                  </div>
                </div>
                <span>₹{item.unitPrice * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="total-line">
              <span>Subtotal:</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="total-line">
              <span>Delivery Fee:</span>
              <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
            </div>
            <div className="total-line">
              <span>Taxes (5%):</span>
              <span>₹{taxes}</span>
            </div>
            <div className="total-line grand">
              <span>Grand Total:</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};