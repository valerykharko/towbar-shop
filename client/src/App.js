import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";
import { Context } from "./index";

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
