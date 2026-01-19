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
      setErrorLogin("РџРѕР»Рµ СЃ РёРјРµРЅРµРј СЏРІР»СЏРµС‚СЃСЏ РѕР±СЏР·Р°С‚РµР»СЊРЅС‹Рј");
      return false;
    }
    if (!userData.password) {
      setErrorPassword("РџРѕР»Рµ СЃ РїР°СЂРѕР»РµРј СЏРІР»СЏРµС‚СЃСЏ РѕР±СЏР·Р°С‚РµР»СЊРЅС‹Рј");
      return false;
    }
    if (!userData.password2) {
      setErrorDoublePassword("РџРѕР»Рµ СЃ РїР°СЂРѕР»РµРј СЏРІР»СЏРµС‚СЃСЏ РѕР±СЏР·Р°С‚РµР»СЊРЅС‹Рј");
      return false;
    }
    if (userData.password !== userData.password2) {
      setErrorDoublePassword("РџР°СЂРѕР»Рё РЅРµ СЃРѕРІРїР°РґР°СЋС‚!");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    errorDoublePassword && setErrorDoublePassword("");
    errorLogin && setErrorLogin("");
    errorPassword && setErrorPassword("");

    checkValid() &&
      registerUser(userData.username, userData.password)
        .then((res) => {
          if (res && res.username) {
            history.replace({ pathname: "/signin" });
          }
        })
        .catch((err) => {
          if (typeof err.username === "object") {
            setErrorLogin("РџРѕР»СЊР·РѕРІР°С‚РµР»СЊ СЃ С‚Р°РєРёРј РёРјРµРЅРµРј СѓР¶Рµ Р·Р°СЂРµРіРёСЃС‚СЂРёСЂРѕРІР°РЅ");
          } else if (typeof err.password === "object") {
            setErrorPassword(
              "РџР°СЂРѕР»СЊ РґРѕР»Р¶РµРЅ СЃРѕРґРµСЂР¶Р°С‚СЊ РјРёРЅРёРјСѓРј 8 СЃРёРјРІРѕР»РѕРІ Рё РЅРµ СЃРѕСЃС‚РѕСЏС‚СЊ РїРѕР»РЅРѕСЃС‚СЊСЋ РёР· С†РёС„СЂ"
            );
          } else {
            setErrorDoublePassword("РћС€РёР±РєР° СЃРµСЂРІРµСЂР°");
          }
        });
  };

  return (
    <section className={`${styles.content} ${extraClass}`}>
      <img className={`${styles.logo} mb-16`} src={logoIcon} alt="Р›РѕРіРѕС‚РёРї" />
      <h1
        className={`text text_type_h1 text_color_primary mb-20 ${styles.title}`}
      >
        Р РµРіРёСЃС‚СЂР°С†РёСЏ
      </h1>
      <p
        className={`text text_type_medium-20 text_color_input mb-10 ${styles.subtitle}`}
      >
        Р—Р°СЂРµРіРёСЃС‚СЂРёСЂСѓР№С‚РµСЃСЊ РґР»СЏ РґРѕСЃС‚СѓРїР° Рє Kittygram!
      </p>
      <FormContainer>
        <form className={styles.form}>
          <Input
            onChange={onChangeInput}
            name="username"
            type="text"
            id={1}
            placeholder="РРјСЏ"
            error={errorLogin}
          />
          <Input
            onChange={onChangeInput}
            name="password"
            type="password"
            id={2}
            placeholder="РџР°СЂРѕР»СЊ"
            error={errorPassword}
          />
          <Input
            onChange={onChangeInput}
            name="password2"
            type="password"
            id={3}
            placeholder="РџРѕРІС‚РѕСЂРёС‚Рµ РїР°СЂРѕР»СЊ"
            error={errorDoublePassword}
          />
          <p
            className={`text text_type_small text_color_input ${styles.agreement}`}
          >
            Р РµРіРёСЃС‚СЂРёСЂСѓСЏСЃСЊ РЅР° РЅР°С€РµРј СЃР°Р№С‚Рµ, РІС‹ РѕР±РµС‰Р°РµС‚Рµ РїРѕСЃС‚РёС‚СЊ РІ СЃРµСЂРІРёСЃ С‚РѕР»СЊРєРѕ
            РєРѕС‚РѕРІ, РЅРёРєР°РєРёС… СЃРѕР±Р°Рє.
          </p>
          <ButtonForm text="Р—Р°СЂРµРіРёСЃС‚СЂРёСЂРѕРІР°С‚СЊСЃСЏ" onClick={handleSubmit} />
          <p className="text text_type_small text_color_input mt-5 mb-5">РёР»Рё</p>
        </form>
        <div className={styles.footer}>
          <NavLink
            to="/signin"
            className={`text text_type_medium-16 text_color_link ${styles.nav}`}
          >
            РЈР¶Рµ Р·Р°СЂРµРіРёСЃС‚СЂРёСЂРѕРІР°РЅС‹? Р’РѕР№С‚Рё
          </NavLink>
        </div>
      </FormContainer>
    </section>
  );
};

