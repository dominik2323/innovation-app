import { useSelector, useDispatch } from "react-redux";

import Intro from "../components/Intro";
import View from "../components/View";
import Header from "../components/Header";
import Login from "../components/Login";

import { fetchData } from "../helpers/fetchData";

import { VARIANTS } from "../helpers/consts";
import { DataContext } from "../helpers/dataContext";

import "../scss/index.scss";

const Index = ({ ...props }) => {
  const dispatch = useDispatch();
  const isUserLogged = useSelector(state => state.isUserLogged);
  const { innovations } = React.useContext(DataContext);
  return isUserLogged ? (
    <View
      variants={VARIANTS.PAGES.INTRO}
      style={{ width: `calc(100vw + ((100vh - 60px) / 10))` }}
    >
      <Header descriptor={``} />
      <Intro key={`Intro`} />
    </View>
  ) : (
    <Login />
  );
};

Index.getInitialProps = async ({ req }) => {
  const data = await fetchData(req);
  return data;
};

export default Index;
