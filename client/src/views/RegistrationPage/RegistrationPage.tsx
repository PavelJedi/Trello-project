import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaExclamationTriangle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { REGEX_EMAIL, REGEX_NAME, REGEX_PASSWORD } from "../../helpers/regex";
import Loader from "../../components/Loader/Loader";
import styles from "./RegistrationPage.module.scss";

import { RegistrationData, ErrorState, ShowPasswordState, User } from "../../interfaces/interfaces";

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<RegistrationData>({
    name: "",
    email: "",
    password: "",
  });

  const [hasError, setHasError] = useState<ErrorState>({
    hasMessageError: false,
    hasNameError: "",
    hasEmailError: false,
    hasPasswordError: false,
  });

  const [showPassword, setShowPassword] = useState<ShowPasswordState>({
    current: false,
    confirm: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleMouseDownPassword = (e: { preventDefault: () => any; }) => e.preventDefault();

  const handleClickShowPassword = (name: string, value: boolean) => {
    setShowPassword({ ...showPassword, [name]: value });
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const CYRILLIC_PATTERN = /[а-яёА-ЯЁ]/;

  const isDisabledBtn = useMemo(
    () =>
      !data.name.trim().length ||
      !data.email.trim().length ||
      !data.password.trim().length,
    [data.name, data.email, data.password]
  );

  const checkValidation = () => {
    const isCyrillic = CYRILLIC_PATTERN.test(data.name);
    const isValidName = REGEX_NAME.test(data.name);

    const errors = {
      hasMessageError: false,
      hasNameError: isCyrillic
        ? "No Cyrillic allowed"
        : !isValidName
        ? "Enter valid name and surname"
        : "",
      hasEmailError: !REGEX_EMAIL.test(data.email),
      hasPasswordError: !REGEX_PASSWORD.test(data.password),
    };

    setHasError((prev) => ({ ...prev, ...errors }));

    return Object.values(errors).includes(true);
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!checkValidation()) {
      setIsLoading(true);
      await handleRegistration();
      setIsLoading(false);
    }
  };

  const handleRegistration = async () => {
    try {
      const user = {
        name: data.name,
        email: data.email,
        password: data.password,
      } as User;
      await authService.registration(user);
      navigate("/login");
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.contentWrap}>
      {isLoading ? (
        <Loader isAuthPage />
      ) : (
        <div className={styles.blocksWrap}>
          <h2 className={styles.registerTitle}>Register on Wiki-Clone</h2>
          <form onSubmit={handleSubmit} style={{ width: "70%" }}>
            <div className={styles.formControl}>
              <div className={styles.inputField}>
                <input
                  className={styles.input}
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  autoComplete="off"
                  required
                />
                <FaUser className={styles.icon} />
              </div>
              {hasError.hasNameError && (
                <div className={styles.errorMessage}>
                  <FaExclamationTriangle />
                  <span>{hasError.hasNameError}</span>
                </div>
              )}
            </div>
            <div className={styles.formControl}>
              <div className={styles.inputField}>
                <input
                  className={styles.input}
                  type="text"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="Email"
                  autoComplete="off"
                  required
                />
                <FaEnvelope className={styles.icon} />
              </div>

              {hasError.hasEmailError && (
                <div className={styles.errorMessage}>
                  <FaExclamationTriangle />
                  <span>Please enter a valid email address</span>
                </div>
              )}
            </div>
            <div className={styles.formControl}>
              <div className={styles.inputField}>
                <input
                  className={styles.input}
                  type={showPassword.current ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Password"
                  autoComplete="off"
                  maxLength={10}
                  required
                />
                <FaLock className={styles.icon} />
                <button
                  className={styles.passwordToggle}
                  onClick={() =>
                    handleClickShowPassword("current", !showPassword.current)
                  }
                  onMouseDown={handleMouseDownPassword}
                  type="button"
                >
                  {showPassword.current ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {hasError.hasPasswordError && (
                <div className={styles.errorMessage}>
                  <FaExclamationTriangle />
                  <span>
                    Password: 8-10 letters, 1 uppercase, 1 lowercase, 1 number
                  </span>
                </div>
              )}
            </div>
            <button
              type="submit"
              className={styles.registerButton}
              disabled={isDisabledBtn}
            >
              Register
            </button>
          </form>
          <div className={styles.bottomWrap}>
            <p>Already have an account?</p>
            <Link className={styles.link} to="/login">
              <button className={styles.loginButton}>Sign In</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationPage;
