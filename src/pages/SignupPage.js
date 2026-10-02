import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateFormField,
  validateSignupForm,
  setSubmitting,
  signupSuccess,
  resetRegistrationStatus,
} from '../features/user/userSlice';
import { setActiveTab, showNotification } from '../features/ui/uiSlice';

export const SignupPage = () => {
  const dispatch = useDispatch();
  const { formData, validationErrors, isSubmitting, registrationSuccess, currentUser } =
    useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(
      updateFormField({
        name,
        value: type === 'checkbox' ? checked : value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(validateSignupForm());

    // Evaluate valid form synchronously against state data
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    const isValid =
      formData.fullName.trim() &&
      emailRegex.test(formData.email) &&
      phoneRegex.test(formData.phone.replace(/[\s-]/g, '')) &&
      formData.password.length >= 6 &&
      formData.password === formData.confirmPassword &&
      formData.gender &&
      formData.termsAccepted;

    if (!isValid) {
      dispatch(
        showNotification({
          type: 'error',
          message: 'Please review all highlighted errors in the form.',
        })
      );
      return;
    }

    dispatch(setSubmitting(true));

    // Simulate Network Registration Request
    setTimeout(() => {
      dispatch(signupSuccess());
      dispatch(
        showNotification({
          type: 'success',
          message: 'Welcome aboard! Your account has been registered.',
        })
      );
    }, 1000);
  };

  if (registrationSuccess) {
    return (
      <div className="page-container center-content">
        <div className="success-card">
          <div className="checkmark-icon">✓</div>
          <h2>Account Created Successfully!</h2>
          <p>
            Welcome, <strong>{currentUser?.fullName}</strong>. Your account ({currentUser?.email}) is ready.
          </p>
          <div className="btn-group">
            <button
              className="primary-btn"
              onClick={() => {
                dispatch(resetRegistrationStatus());
                dispatch(setActiveTab('menu'));
              }}
            >
              Start Ordering Pizza 🍕
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="form-card">
        <div className="form-header">
          <h2>Create Your Account</h2>
          <p>Register now for instant pizza discounts and delivery tracking.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* FULL NAME */}
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="e.g. John Doe"
              value={formData.fullName}
              onChange={handleChange}
              className={validationErrors.fullName ? 'has-error' : ''}
            />
            {validationErrors.fullName && (
              <span className="error-text">{validationErrors.fullName}</span>
            )}
          </div>

          {/* EMAIL & PHONE GRID */}
          <div className="form-row-2">
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className={validationErrors.email ? 'has-error' : ''}
              />
              {validationErrors.email && (
                <span className="error-text">{validationErrors.email}</span>
              )}
            </div>

            <div className="input-group">
              <label>Phone Number (10 Digits)</label>
              <input
                type="tel"
                name="phone"
                placeholder="9876543210"
                value={formData.phone}
                onChange={handleChange}
                className={validationErrors.phone ? 'has-error' : ''}
              />
              {validationErrors.phone && (
                <span className="error-text">{validationErrors.phone}</span>
              )}
            </div>
          </div>

          {/* PASSWORDS */}
          <div className="form-row-2">
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
                className={validationErrors.password ? 'has-error' : ''}
              />
              {validationErrors.password && (
                <span className="error-text">{validationErrors.password}</span>
              )}
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-type password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={validationErrors.confirmPassword ? 'has-error' : ''}
              />
              {validationErrors.confirmPassword && (
                <span className="error-text">{validationErrors.confirmPassword}</span>
              )}
            </div>
          </div>

          {/* GENDER SELECTION */}
          <div className="input-group">
            <label>Gender</label>
            <div className="radio-group">
              {['Male', 'Female', 'Non-Binary'].map((item) => (
                <label key={item} className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value={item}
                    checked={formData.gender === item}
                    onChange={handleChange}
                  />
                  {item}
                </label>
              ))}
            </div>
            {validationErrors.gender && (
              <span className="error-text">{validationErrors.gender}</span>
            )}
          </div>

          {/* TERMS & CONDITIONS */}
          <div className="input-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />
              I agree to the Terms of Service & Privacy Policy
            </label>
            {validationErrors.termsAccepted && (
              <span className="error-text">{validationErrors.termsAccepted}</span>
            )}
          </div>

          <button type="submit" disabled={isSubmitting} className="submit-btn">
            {isSubmitting ? 'Registering Account...' : 'Sign Up & Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};