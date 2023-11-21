import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import Loader from "../../components/Loader/Loader";
import InputField from "../../components/common/InputField/InputField";
import PasswordInput from "../../components/common/PasswordInput/PasswordInput";
import ErrorMessage from "../../components/common/ErrorMessage/ErrorMessage";
import useRegistrationForm from "../../hooks/useRegistrationForm";
import styles from "./RegistrationPage.module.scss";
import { FaUser, FaEnvelope } from "react-icons/fa";

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, errors, handleChange, validateForm } = useRegistrationForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isDisabled = !data.name || !data.email || !data.password;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        await authService.registration(data);
        navigate("/login");
      } catch (error: any) {
        console.error(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={styles.contentWrap}>
      {isLoading ? (
        <Loader isAuthPage />
      ) : (
        <div className={styles.blocksWrap}>
          <h2 className={styles.registerTitle}>Register on Trello-Clone</h2>
          <form onSubmit={handleSubmit} style={{ width: "70%" }}>
            <div className={styles.formControl}>
              <InputField
                type="text"
                name="name"
                value={data.name}
                placeholder="Full Name"
                icon={<FaUser />}
                onChange={handleChange}
              />
              {errors.name && <ErrorMessage message={errors.name} />}
            </div>
            <div className={styles.formControl}>
              <InputField
                type="text"
                name="email"
                value={data.email}
                placeholder="Email"
                icon={<FaEnvelope />}
                onChange={handleChange}
              />
              {errors.email && <ErrorMessage message={errors.email} />}
            </div>
            <div className={styles.formControl}>
              <PasswordInput
                value={data.password}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                onChange={handleChange}
              />
              {errors.password && <ErrorMessage message={errors.password} />}
            </div>
            <button
              type="submit"
              className={styles.registerButton}
              disabled={isDisabled}
            >
              Register
            </button>
          </form>
          <div className={styles.bottomWrap}>
            <p>Already have an account?</p>
            <Link to="/login" className={styles.link}>
              Sign In
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationPage;
