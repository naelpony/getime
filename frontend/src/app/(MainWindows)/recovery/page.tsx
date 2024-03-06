import styles from "./style.module.sass";


export default function RecoveryWindow(){
    return (
        <div className={styles.body}>
          <div className={styles.bg_form}>
            <div className={styles.head_form}>
              <h1>Востановление пароля</h1>
              <span>G</span>
            </div>    
            <form className={styles.enterForm}>
              <p className={styles.last}>Новый пароль</p>
              <input type="text" name="password" />
              <p className={styles.last}>Подтвердите новый пароль</p>
              <input type="text" name="password" />
              <button className={styles.btn}>
                <span>Сохранить</span>
              </button>
            </form>
          </div>
        </div>
      );
}