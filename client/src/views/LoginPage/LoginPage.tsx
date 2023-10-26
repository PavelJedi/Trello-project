import React, { useState, useMemo, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { fetchUser } from "../../redux/slices/userSlice";

// Icons
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

// Styles
import styles from "./LoginPage.module.scss";
import Loader from "../../components/Loader/Loader";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleMouseDownPassword = (e: MouseEvent) => e.preventDefault();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isDisabledBtn = useMemo(
    () => !data.email.trim().length || !data.password.trim().length,
    [data.email, data.password]
  );

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, email: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, password: e.target.value });
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const user = {
        id: 0,
        name: "",
        email: data.email,
        password: data.password,
      };
      const response = await authService.login(user);
      if (response?.data?.token) {
        await dispatch(fetchUser());
        navigate("/app");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className={styles.wrap}>
      {isLoading ? (
        <Loader isAuthPage />
      ) : (
        <div className={styles.blocksWrap}>
          <div className={styles.topWrap}>
            <h1>Let's Get Started</h1>
            <p>Sign in to Trello-Clone</p>
          </div>
          <form onSubmit={handleSubmit} style={{ width: "70%" }}>
            <div className={styles.inputField}>
              <FaUser className={styles.icon} />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={styles.input}
                value={data.email}
                onChange={handleEmailChange}
                autoComplete="off"
                required
              />
            </div>
            <div className={styles.inputField}>
              <FaLock className={styles.icon} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className={styles.input}
                value={data.password}
                onChange={handlePasswordChange}
                autoComplete="off"
                required
              />
              <button
                className={styles.passwordToggle}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                type="button"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {isError && (
              <div className={styles.errorMessage}>
                Login failed. Please try again.
              </div>
            )}
            <button
              type="submit"
              className={styles.loginButton}
              disabled={isDisabledBtn}
            >
              Sign in
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
