import { createSlice } from '@reduxjs/toolkit';

const USER_STORAGE_KEY = 'pizza_app_user_session';

const loadPersistedUser = () => {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const initialFormValues = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  gender: '',
  termsAccepted: false,
};

const persistedUser = loadPersistedUser();

const initialState = {
  formData: initialFormValues,
  validationErrors: {},
  isSubmitting: false,
  isAuthenticated: !!persistedUser,
  currentUser: persistedUser,
  registrationSuccess: false,
};

const validateFields = (form) => {
  const errors = {};
  if (!form.fullName.trim()) errors.fullName = 'Full Name is required.';
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Invalid email address format.';
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (!form.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!phoneRegex.test(form.phone.replace(/[\s-]/g, ''))) {
    errors.phone = 'Enter a valid 10-digit phone number.';
  }

  if (!form.password) {
    errors.password = 'Password is required.';
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  if (!form.gender) {
    errors.gender = 'Please select a gender.';
  }

  if (!form.termsAccepted) {
    errors.termsAccepted = 'You must accept the Terms & Conditions.';
  }

  return errors;
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateFormField: (state, action) => {
      const { name, value } = action.payload;
      state.formData[name] = value;
      // Clear field error on edit
      if (state.validationErrors[name]) {
        delete state.validationErrors[name];
      }
    },
    validateSignupForm: (state) => {
      state.validationErrors = validateFields(state.formData);
    },
    setSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
    signupSuccess: (state) => {
      state.isAuthenticated = true;
      state.currentUser = {
        fullName: state.formData.fullName,
        email: state.formData.email,
        phone: state.formData.phone,
        gender: state.formData.gender,
      };
      state.registrationSuccess = true;
      state.formData = initialFormValues;
      state.validationErrors = {};
      state.isSubmitting = false;

      try {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(state.currentUser));
      } catch (err) {
        console.error('Storage error:', err);
      }
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      state.registrationSuccess = false;
      try {
        localStorage.removeItem(USER_STORAGE_KEY);
      } catch (err) {
        console.error('Storage removal error:', err);
      }
    },
    resetRegistrationStatus: (state) => {
      state.registrationSuccess = false;
    }
  },
});

export const {
  updateFormField,
  validateSignupForm,
  setSubmitting,
  signupSuccess,
  logoutUser,
  resetRegistrationStatus,
} = userSlice.actions;

export default userSlice.reducer;