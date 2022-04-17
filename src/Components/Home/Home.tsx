import * as React from "react";
import Gallery from "../UI/Gallery/Gallery";
import Header from "../UI/Header/Header";

import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../Redux/Reducers";
import { useNavigate } from "react-router";
import "../Home/Home.css";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const spaces = useSelector<AppState, AppState["spaces"]>(
    (state) => state.spaces
  );

  const news = useSelector<AppState, AppState["news"]>((state) => state.news);

  const currentUser = useSelector<AppState, AppState["currentUser"]>(
    (state) => state.currentUser
  );

  return (
    <article className="home">
      <Header />

      <h1>
        Hola Sr. {`${currentUser.firstname} ${currentUser.lastname}`}, <br />
        ¿qué quiere hacer hoy?
      </h1>

      <Gallery
        title="Reservar un espacio"
        listSpace={spaces}
        url={"/Reservas/list"}
      />

      <Gallery title="Noticias" listNews={news} url={"/Social"} isNotice />
    </article>
  );
};
export default Home;
