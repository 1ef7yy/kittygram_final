import React from "react";
import { useHistory, NavLink } from "react-router-dom";

import { registerUser } from "../../utils/api";

import logoIcon from "../../images/logo.svg";

import { FormContainer } from "../ui/form-container/form-container";
import { Input } from "../ui/input/input";
import { ButtonForm } from "../ui/button-form/button-form";

import styles from "./sign-up.module.css";

export const SignUp = ({ extraClass = "" }) => {
  const [userData, setUserData] = React.useState({});
  const [errorDoublePassword, setErrorDoublePassword] = React.useState("");
  const [errorPassword, setErrorPassword] = React.useState("");
  const [errorLogin, setErrorLogin] = React.useState("");

  const history = useHistory();

  const onChangeInput = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const checkValid = () => {
    if (!userData.username) {
      setErrorLogin("Поле с именем является обязательным");
      return false;
    }
    if (!userData.password) {
      setErrorPassword("Поле с паролем является обязательным");
      return false;
    }
    if (!userData.password2) {
      setErrorDoublePassword("Поле с паролем является обязательным");
      return false;
    }
    if (userData.password !== userData.password2) {
      setErrorDoublePassword("Пароли не совпадают!");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e && e.preventDefault();
    errorDoublePassword && setErrorDoublePassword("");
    errorLogin && setErrorLogin("");
    errorPassword && setErrorPassword("");

    if (!checkValid()) return;

    registerUser(userData)
      .then((res) => {
        if (res && res.username) {
          history.replace({ pathname: "/signin" });
        }
      })
      .catch((err) => {
        console.error("Registration error:", err);
        if (err.json) {
          err.json().then(errorData => {
            if (errorData.username) {
              setErrorLogin("Пользователь с таким именем уже зарегистрирован");
            } else if (errorData.password) {
              setErrorPassword(
                "Пароль должен содержать минимум 8 символов и не состоять полностью из цифр"
              );
            } else {
              setErrorDoublePassword("Ошибка сервера");
            }
          });
        } else {
          setErrorDoublePassword("Ошибка сервера");
        }
      });
  };

  return (
    <section className={`${styles.content} ${extraClass}`}>
      <img className={`${styles.logo} mb-16`} src={logoIcon} alt="Логотип" />
      <h1
        className={`text text_type_h1 text_color_primary mb-20 ${styles.title}`}
      >
        Регистрация
      </h1>
      <p
        className={`text text_type_medium-20 text_color_input mb-10 ${styles.subtitle}`}
      >
        Зарегистрируйтесь для доступа к Kittygram!
      </p>
      <FormContainer>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            onChange={onChangeInput}
            name="username"
            type="text"
            id={1}
            placeholder="Имя"
            error={errorLogin}
          />
          <Input
            onChange={onChangeInput}
            name="password"
            type="password"
            id={2}
            placeholder="Пароль"
            error={errorPassword}
          />
          <Input
            onChange={onChangeInput}
            name="password2"
            type="password"
            id={3}
            placeholder="Повторите пароль"
            error={errorDoublePassword}
          />
          <p
            className={`text text_type_small text_color_input ${styles.agreement}`}
          >
            Регистрируясь на нашем сайте, вы обещаете постить в сервис только
            котов, никаких собак.
          </p>
          <ButtonForm text="Зарегистрироваться" type="submit" onClick={handleSubmit} />
          <p className="text text_type_small text_color_input mt-5 mb-5">или</p>
        </form>
        <div className={styles.footer}>
          <NavLink
            to="/signin"
            className={`text text_type_medium-16 text_color_link ${styles.nav}`}
          >
            Уже зарегистрированы? Войти
          </NavLink>
        </div>
      </FormContainer>
    </section>
  );
};

