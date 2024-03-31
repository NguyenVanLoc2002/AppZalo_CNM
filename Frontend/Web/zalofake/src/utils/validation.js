import toast from "react-hot-toast";
// create features to check validate fields, show toast message for any error

// check email
export const checkEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  if (!re.test(email)) {
    toast.error("Invalid email format");
    return false;
  }
  return true;
};

// check password: at least 6 characters and contain at least one special character
export const checkPassword = (password) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
  if (!re.test(password)) {
    toast.error("Password must be at least 6 characters and contain at least one special character");
    return false;
  }
  return true;
};

// check phone number
export const checkPhone = (phone) => {
  const re = /^\d{10,11}$/;
  if (!re.test(phone)) {
    toast.error("Invalid phone number format");
    return false;
  }
  return true;
};

// check name : at least 2 characters and corect with vietnamese name
export const checkName = (name) => {
  const re = /^[a-zA-Z\s]{2,}$/;
  if (!re.test(name)) {
    toast.error("Name must be at least 2 characters and contain only letters");
    return false;
  }
  return true;
};

// check date of birth : must be a valid date and at least 16 years old
export const checkDOB = (dob) => {
  const dobDate = new Date(dob);
  const currentDate = new Date();
  if (currentDate.getFullYear() - dobDate.getFullYear() < 16) {
    return false;
  }
  return true;
};








