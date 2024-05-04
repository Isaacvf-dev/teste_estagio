import { Login } from './components/Login';

import './global.css';
import styles from "./App.module.css"

export function App() {
  return (
    <div className={styles.wrapper}>
     <Login />
    </div>
  );
}
