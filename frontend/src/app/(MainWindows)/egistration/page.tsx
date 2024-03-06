import styles from "./style.module.sass";

export default function RegistrationWindow() {
  return (
    <div className={styles.body}>
      <div className={styles.bg_form}>
        <div className={styles.head_form}>
          <h1>Регистрация</h1>
          <span>G</span>
        </div>
        <h2>Мы рады приветствовать Вас.</h2>

        <form className={styles.enterForm}>
          <p>Email</p>
          <input type="text" name="email" />
          <p>Имя</p>
          <input type="text" name="name" />
          <p>Фамилия</p>
          <input type="text" name="sername" />
          <p className={styles.last}>Пароль</p>
          <input type="text" name="password" />
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
