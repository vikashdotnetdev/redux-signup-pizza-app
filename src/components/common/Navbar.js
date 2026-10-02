import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab, toggleCartDrawer } from '../../features/ui/uiSlice';
import { logoutUser } from '../../features/user/userSlice';
import { selectCartTotals } from '../../features/cart/cartSelectors';

export const Navbar = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.ui.activeTab);
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const { totalCount } = useSelector(selectCartTotals);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand" onClick={() => dispatch(setActiveTab('menu'))}>
          🍕 SliceMaster Pizza
        </div>
        <div className="nav-links">
          <button
            className={`nav-btn ${activeTab === 'menu' ? 'active' : ''}`}
            onClick={() => dispatch(setActiveTab('menu'))}
          >
            Menu
          </button>
          
          {isAuthenticated ? (
            <div className="user-profile">
              <span className="user-badge">Hi, {currentUser.fullName.split(' ')[0]}</span>
              <button
                className="nav-btn logout-btn"
                onClick={() => dispatch(logoutUser())}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className={`nav-btn ${activeTab === 'signup' ? 'active' : ''}`}
              onClick={() => dispatch(setActiveTab('signup'))}
            >
              Sign Up
            </button>
          )}

          <button className="cart-badge-btn" onClick={() => dispatch(toggleCartDrawer())}>
            🛒 Cart
            {totalCount > 0 && <span className="cart-counter">{totalCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
};