import * as yup from 'yup';

const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address format")
    .required("Email is required"),

  password: yup
    .string()
    .matches(
      strongPasswordRegex,
      "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
    )
    .required("Password is required"),
});

export default loginSchema
