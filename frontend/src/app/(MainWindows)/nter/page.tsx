import styles from "./style.module.sass";

export default function EnterWindow() {
  return (
    <div className={styles.body}>
      <div className={styles.bg_form}>
        <div className={styles.head_form}>
          <h1>Вход</h1>
          <span>G</span>
        </div>
        <h2>
          Добро пожаловать обратно!
          <br />
          Пожалуйста, войдите в свой аккаунт.
        </h2>

        <form className={styles.enterForm}>
          <p>Email</p>
          <input type="text" name="email" />
          <p className={styles.last}>Пароль</p>
          <input type="text" name="password" />
          <div className={styles.checkText}>
            <div className={styles.rememberMe}>
              <input type="checkbox" name="remember me" />
              <p>Запомни меня</p>
            </div>
            <p>
              <a href="Забыли пароль?">Забыли пароль?</a>
            </p>
          </div>
          <button className={styles.btn}>
            <span>Войти</span>
          </button>
        </form>
        <span>Новый пользователь? <a href="">Зарегестрирваться</a></span>
      </div>
    </div>
  );
}
