import { useState } from "react";
import styles from "./style.module.sass";

export default function RegistrationWindow() {
  const [name, setNewName] = useState("");
  const [sername, setNewSername] = useState("");
  const [email, setNewEmail] = useState("");
  const [password, setNewPassword] = useState("");

  const addUser = () => {
    fetch("http://localhost:4000/api/user", {
      method: "POST",
      body: JSON.stringify({
        name,
        sername,
        email,
        password,
      }),
      headers: {
        "content-type": "application/json",
      },
    }).catch((e) => console.log(e));

    setNewName("");
    setNewSername("");
    setNewEmail("");
    setNewPassword("");
  };

  return (
    <div className={styles.body}>
      <div className={styles.bg_form}>
        <div className={styles.head_form}>
          <h1>Регистрация</h1>
          <span>G</span>
        </div>
        <h2>Мы рады приветствовать Вас.</h2>

        <form
          className={styles.enterForm}
          onSubmit={(e) => {
            e.preventDefault();
            addUser();
          }}
        >
          <p>Email</p>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <p>Имя</p>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setNewName(e.target.value)}
          />
          <p>Фамилия</p>
          <input
            type="text"
            name="sername"
            value={sername}
            onChange={(e) => setNewSername(e.target.value)}
          />
          <p className={styles.last}>Пароль</p>
          <input
            type="text"
            name="password"
            value={password}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button className={styles.btn}>
            <span>Зарегестрирваться</span>
          </button>
        </form>
        <span>
          Уже имеете аккаунт? <a href="">Войти</a>
        </span>
      </div>
    </div>
  );
}
