import * as yup from 'yup';

const customEmailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const signupSchema = yup.object().shape({
  username: yup.string().required('Username is required'),

  email: yup
    .string()
    .matches(customEmailRegex, 'Invalid email format')
    .required('Email is required'),

  password: yup
    .string()
    .matches(
      strongPasswordRegex,
      'Password must be at least 8 characters, include uppercase, lowercase, number, and special character'
    )
    .required('Password is required'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default signupSchema

