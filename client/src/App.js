import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";
import animation_loading from "../src/images/animation-loader.gif";
import pika1 from "../src/images/5IPv.gif";
import pika2 from "../src/images/5Q0v.gif";
import { Context } from "./index";
import styles from "./styles/Loading.module.css";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      check()
        .then((data) => {
          user.setUser(data);
          user.setIsAuth(true);
          if (data.role === "ADMIN") {
            user.setIsAdmin(true);
          }
        })
        .finally(() => setLoading(false));
    }, 1000);
  });

  if (loading) {
    return (
      <>
        <Spinner animation={"grow"} />
        <img
          className={styles.anim}
          src={animation_loading}
          alt={"Загрузка..."}
        />
        <img className={styles.pik1} src={pika1} alt={"Загрузка..."} />
        <img className={styles.pik2} src={pika2} alt={"Загрузка..."} />
      </>
    );
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
