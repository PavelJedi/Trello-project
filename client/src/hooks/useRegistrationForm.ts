import { useState } from "react";
import { REGEX_EMAIL, REGEX_NAME, REGEX_PASSWORD } from "../helpers/regex";

const useRegistrationForm = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const CYRILLIC_PATTERN = /[а-яёА-ЯЁ]/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { ...errors };

    // Name validation
    if (CYRILLIC_PATTERN.test(data.name)) {
      newErrors.name = "No Cyrillic allowed";
      valid = false;
    } else if (!REGEX_NAME.test(data.name)) {
      newErrors.name = "Enter a valid name and surname";
      valid = false;
    } else {
      newErrors.name = "";
    }

    // Email validation
    if (!REGEX_EMAIL.test(data.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    } else {
      newErrors.email = "";
    }

    // Password validation
    if (!REGEX_PASSWORD.test(data.password)) {
      newErrors.password =
        "Password must be 8-10 characters, including 1 uppercase, 1 lowercase, and 1 number";
      valid = false;
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);
    return valid;
  };

  return {
    data,
    errors,
    handleChange,
    validateForm,
  };
};

export default useRegistrationForm;
