import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
} from '../../features/cart/cartSlice';
import { toggleCartDrawer, setActiveTab } from '../../features/ui/uiSlice';
import { selectCartItems, selectCartTotals } from '../../features/cart/cartSelectors';
import { TOPPINGS, CRUSTS } from '../../features/pizza/pizzaConstants';

export const CartDrawer = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector((state) => state.ui.isCartOpen);
  const items = useSelector(selectCartItems);
  const { subtotal, deliveryFee, taxes, grandTotal, isCartEmpty } = useSelector(selectCartTotals);

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    dispatch(toggleCartDrawer());
    dispatch(setActiveTab('checkout'));
  };

  return (
    <div className="cart-backdrop" onClick={() => dispatch(toggleCartDrawer())}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h2>Your Cart ({items.length})</h2>
          <button className="close-btn" onClick={() => dispatch(toggleCartDrawer())}>
            ✕
          </button>
        </div>

        <div className="drawer-content">
          {isCartEmpty ? (
            <div className="empty-cart-state">
              <span className="empty-icon">🍕</span>
              <p>Your cart is empty. Add a customized pizza from our menu!</p>
            </div>
          ) : (
            <div className="cart-items-list">
              {items.map((item) => {
                const crustObj = CRUSTS.find((c) => c.id === item.crust);
                const toppingNames = item.toppings
                  .map((tId) => TOPPINGS.find((t) => t.id === tId)?.name)
                  .filter(Boolean)
                  .join(', ');

                return (
                  <div key={item.configHash} className="cart-card">
                    <div className="cart-card-top">
                      <h4>{item.name}</h4>
                      <button
                        className="remove-btn"
                        onClick={() => dispatch(removeFromCart(item.configHash))}
                      >
                        Remove
                      </button>
                    </div>
                    <p className="item-specs">
                      <strong>Size:</strong> {item.size} | <strong>Crust:</strong>{' '}
                      {crustObj?.name}
                    </p>
                    {toppingNames && (
                      <p className="item-specs">
                        <strong>Toppings:</strong> {toppingNames}
                      </p>
                    )}
                    <div className="cart-card-bottom">
                      <div className="item-qty-control">
                        <button
                          onClick={() =>
                            dispatch(
                              updateCartItemQuantity({
                                configHash: item.configHash,
                                quantity: item.quantity - 1,
                              })
                            )
                          }
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateCartItemQuantity({
                                configHash: item.configHash,
                                quantity: item.quantity + 1,
                              })
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                      <div className="item-price">₹{item.unitPrice * item.quantity}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {!isCartEmpty && (
          <div className="drawer-footer">
            <div className="bill-breakdown">
              <div className="bill-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="bill-row">
                <span>Delivery Charge</span>
                <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
              </div>
              <div className="bill-row">
                <span>GST (5%)</span>
                <span>₹{taxes}</span>
              </div>
              <div className="bill-row grand-total">
                <span>Grand Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            <div className="drawer-actions">
              <button className="clear-cart-btn" onClick={() => dispatch(clearCart())}>
                Clear Cart
              </button>
              <button className="checkout-btn" onClick={handleCheckoutClick}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};