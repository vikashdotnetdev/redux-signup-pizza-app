import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSize,
  setCrust,
  toggleTopping,
  setQuantity,
  closeCustomizer,
} from '../../features/pizza/pizzaSlice';
import { addPizzaToCart } from '../../features/cart/cartSlice';
import { showNotification, toggleCartDrawer } from '../../features/ui/uiSlice';
import { SIZES, CRUSTS, TOPPINGS } from '../../features/pizza/pizzaConstants';

export const CustomizerModal = () => {
  const dispatch = useDispatch();
  const { customizingPizza, currentConfig } = useSelector((state) => state.pizza);

  if (!customizingPizza) return null;

  const isLarge = currentConfig.size === 'large';

  const handleAddToCart = () => {
    const configHash = `${customizingPizza.id}-${currentConfig.size}-${currentConfig.crust}-${[...currentConfig.selectedToppings].sort().join('_')}`;
    
    dispatch(
      addPizzaToCart({
        id: customizingPizza.id,
        name: customizingPizza.name,
        image: customizingPizza.image,
        size: currentConfig.size,
        crust: currentConfig.crust,
        toppings: currentConfig.selectedToppings,
        quantity: currentConfig.quantity,
        unitPrice: currentConfig.unitPrice,
        configHash,
      })
    );

    dispatch(
      showNotification({
        type: 'success',
        message: `Added ${currentConfig.quantity}x ${customizingPizza.name} to your cart!`,
      })
    );
    dispatch(closeCustomizer());
    dispatch(toggleCartDrawer());
  };

  return (
    <div className="modal-backdrop">
      <div className="customizer-modal">
        <div className="modal-header">
          <h2>Configure Your {customizingPizza.name}</h2>
          <button className="close-btn" onClick={() => dispatch(closeCustomizer())}>
            ✕
          </button>
        </div>

        <div className="customizer-body">
          {/* STEP 1: SIZE SELECTION */}
          <section className="config-section">
            <h3>1. Select Size</h3>
            <div className="options-grid">
              {Object.values(SIZES).map((size) => (
                <div
                  key={size.id}
                  className={`option-card ${currentConfig.size === size.id ? 'selected' : ''}`}
                  onClick={() => dispatch(setSize(size.id))}
                >
                  <h4>{size.name}</h4>
                  <p>₹{size.basePrice}</p>
                  {size.id === 'large' && <span className="tag">Unlocks Premium Extras</span>}
                </div>
              ))}
            </div>
          </section>

          {/* STEP 2: CRUST SELECTION */}
          <section className="config-section">
            <h3>2. Choose Crust</h3>
            <div className="options-grid">
              {CRUSTS.map((crust) => (
                <div
                  key={crust.id}
                  className={`option-card ${currentConfig.crust === crust.id ? 'selected' : ''}`}
                  onClick={() => dispatch(setCrust(crust.id))}
                >
                  <h4>{crust.name}</h4>
                  <p>{crust.extraPrice === 0 ? 'Included' : `+₹${crust.extraPrice}`}</p>
                </div>
              ))}
            </div>
          </section>

          {/* STEP 3: TOPPINGS WITH DYNAMIC AVAILABILITY */}
          <section className="config-section">
            <div className="section-title-wrap">
              <h3>3. Pick Toppings</h3>
              {!isLarge && (
                <span className="hint-label">Tip: Upgrade to <strong>Large</strong> to unlock Premium Toppings</span>
              )}
            </div>
            <div className="toppings-list">
              {TOPPINGS.map((topping) => {
                const isSelected = currentConfig.selectedToppings.includes(topping.id);
                const isLocked = topping.isPremium && !isLarge;

                return (
                  <button
                    key={topping.id}
                    type="button"
                    disabled={isLocked}
                    className={`topping-chip ${isSelected ? 'active' : ''} ${isLocked ? 'locked' : ''}`}
                    onClick={() => dispatch(toggleTopping(topping.id))}
                  >
                    <span>{topping.name} (+₹{topping.price})</span>
                    {topping.isPremium && <span className="premium-star"> ★ Premium</span>}
                    {isLocked && <span className="lock-tag"> 🔒 Large only</span>}
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* FOOTER LIVE SUMMARY */}
        <div className="modal-footer">
          <div className="qty-picker">
            <label>Qty:</label>
            <button
              onClick={() => dispatch(setQuantity(currentConfig.quantity - 1))}
              disabled={currentConfig.quantity <= 1}
            >
              -
            </button>
            <span>{currentConfig.quantity}</span>
            <button onClick={() => dispatch(setQuantity(currentConfig.quantity + 1))}>
              +
            </button>
          </div>

          <div className="price-summary-box">
            <span className="summary-label">Total Unit Price:</span>
            <span className="summary-amount">
              ₹{currentConfig.unitPrice * currentConfig.quantity}
            </span>
          </div>

          <button className="add-cart-btn" onClick={handleAddToCart}>
            Add to Order
          </button>
        </div>
      </div>
    </div>
  );
};