import React from 'react';
import { useDispatch } from 'react-redux';
import { PRESET_PIZZAS } from '../features/pizza/pizzaConstants';
import { initCustomizer } from '../features/pizza/pizzaSlice';
import { CustomizerModal } from '../components/pizza/CustomizerModal';

export const MenuPage = () => {
  const dispatch = useDispatch();

  return (
    <div className="page-container">
      <header className="menu-header">
        <h1>Handcrafted Oven-Baked Pizzas</h1>
        <p>Pick a chef specialty below to customize size, crust, and your favorite toppings.</p>
      </header>

      <div className="pizza-grid">
        {PRESET_PIZZAS.map((pizza) => (
          <div key={pizza.id} className="pizza-card">
            <img src={pizza.image} alt={pizza.name} className="pizza-img" />
            <div className="pizza-card-content">
              <h3>{pizza.name}</h3>
              <p>{pizza.description}</p>
              <div className="card-action-bar">
                <span className="base-tag">Starts at ₹199</span>
                <button
                  className="customize-btn"
                  onClick={() => dispatch(initCustomizer(pizza))}
                >
                  Customize & Add ⚙️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CustomizerModal />
    </div>
  );
};