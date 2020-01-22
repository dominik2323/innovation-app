import { useSelector, useDispatch } from 'react-redux';
import Intro from '../../components/Intro';
import View from '../../components/View';
import Header from '../../components/Header';
import Login from '../../components/Login';

import { VARIANTS } from '../../helpers/consts';
import { useViewportDimensions } from '../../hooks/useViewportDimensions';

import '../../scss/index.scss';

const Index = ({ ...props }) => {
  const isUserLogged = useSelector(state => state.isUserLogged);
  const { w } = useViewportDimensions();
  return (
    <React.Fragment>
      {!isUserLogged && <Login />}

      <View
        variants={VARIANTS.PAGES.INTRO}
        custom={{ w }}
        style={{ width: `calc(100vw + ((100vh - 60px) / 10))` }}
      >
        <Header descriptor={``} />
        <Intro key={`Intro`} />
      </View>
    </React.Fragment>
  );
};

export default Index;
