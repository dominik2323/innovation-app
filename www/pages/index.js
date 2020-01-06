import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Intro from '../components/Intro';
import View from '../components/View';
import Header from '../components/Header';
import Login from '../components/Login';

import { fetchData } from '../helpers/fetchData';

import { VARIANTS } from '../helpers/consts';
import { DataContext } from '../helpers/dataContext';

import '../scss/index.scss';

const Index = ({ ...props }) => {
  const isUserLogged = useSelector(state => state.isUserLogged);
  return (
    <React.Fragment>
      {!isUserLogged && <Login />}

      <View
        variants={VARIANTS.PAGES.INTRO}
        style={{ width: `calc(100vw + ((100vh - 60px) / 10))` }}>
        <Header descriptor={``} />
        <Intro key={`Intro`} />
      </View>
    </React.Fragment>
  );
};

// Index.getInitialProps = async ({ req }) => {
//   const data = await fetchData(req);
//   return data;
//   // const apiBase =
//   //   process.env.NODE_ENV === `production`
//   //     ? req.headers.host
//   //     : `http://localhost:9999`;
//   // try {
//   //   const { status, data } = await axios.get(`${apiBase}/api/about`);
//   //   console.log(data);
//   //   return { data: data };
//   // } catch (e) {
//   //   console.log(`fetching has failed: ${e}`);
//   //   return { data: null };
//   // }
// };

export default Index;
