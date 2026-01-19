import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { api } from "../../utils/api";
import "./sign-in.css";

function SignIn({ handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .signIn({ username, password })
      .then((data) => {
        if (data.auth_token) {
          localStorage.setItem("token", data.auth_token);
          handleLogin();
          history.push("/");
        }
      })
      .catch((err) => {
        setError("Неверное имя пользователя или пароль");
        console.error("Login error:", err);
      });
  };

  return (
    <div className="sign-in">
      <h2 className="sign-in__title">Вход</h2>
      <form className="sign-in__form" onSubmit={handleSubmit}>
        <input
          className="sign-in__input"
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="sign-in__input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="sign-in__error">{error}</p>}
        <button className="sign-in__button" type="submit">
          Войти
        </button>
      </form>
      <p className="sign-in__text">
        Ещё не зарегистрированы?{" "}
        <Link to="/signup" className="sign-in__link">
          Регистрация
        </Link>
      </p>
    </div>
  );
}

export { SignIn };
