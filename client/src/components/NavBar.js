import React, { useContext } from "react";
import { Context } from "../index";
import styles from "../styles/NavBar.module.css";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import {
  AC_ROUTE,
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
  WK_ROUTE,
} from "../utils/const";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const history = useHistory();
  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    user.setIsAdmin(false);
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <div className={"mr-5"}>
          <NavLink className={styles.nav_shop} to={SHOP_ROUTE}>
            FarkopBuy
          </NavLink>
        </div>
        <Nav className={"justify-content-center"}>
          <Button
            variant="light"
            onClick={() => history.push(SHOP_ROUTE)}
            className={"ml-5"}
          >
            Фаркопы
          </Button>
          <Button
            variant="light"
            onClick={() => history.push(WK_ROUTE)}
            className="ml-3"
          >
            Штатная электрика
          </Button>
          <Button
            variant="light"
            onClick={() => history.push(AC_ROUTE)}
            className="ml-3"
          >
            Аксессуары
          </Button>
        </Nav>
        {user.isAuth ? (
          <Nav className="ml-auto">
            {user.isAdmin === true && (
              <Button
                variant="secondary"
                onClick={() => history.push(ADMIN_ROUTE)}
                className="ml-2"
              >
                Админ панель
              </Button>
            )}
            <Button
              variant="secondary"
              onClick={() => logOut()}
              className="ml-2"
            >
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Button
              variant="secondary"
              onClick={() => history.push(LOGIN_ROUTE)}
            >
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
