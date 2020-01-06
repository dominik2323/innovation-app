// import DataContextProvider from "../helpers/dataContext";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { fetchData } from '../helpers/fetchData';
// import { withRedux } from "../helpers/withRedux";

import InnovationPage from '../components/Innovation';
import View from '../components/View';
import Header from '../components/Header';
import { setActiveInnovationId } from '../store/actions';

import { VARIANTS } from '../helpers/consts';
import { selectInnovationById } from '../helpers/functions';
import { DataContext } from '../helpers/dataContext';

import '../scss/index.scss';

const Innovations = () => {
  const dispatch = useDispatch();
  const activeInnovationId = useSelector(state => state.activeInnovationId);
  const { innovations } = React.useContext(DataContext);
  const router = useRouter();
  const { id } = router.query;

  React.useEffect(() => {
    if (id !== undefined) {
      dispatch(setActiveInnovationId(id));
    } else {
      dispatch(setActiveInnovationId(''));
    }
  }, [id]);

  return (
    <View
      variants={VARIANTS.PAGES.INNOVATION}
      onAnimationStart={() => console.log('innovations-loaded')}>
      <Header
        descriptor={`Inovace${
          activeInnovationId.length !== 0
            ? ` - ${
                selectInnovationById(innovations, activeInnovationId)
                  .innovationName
              }`
            : ``
        }`}
      />
      <InnovationPage />
    </View>
  );
};

Innovations.getInitialProps = () => {
  return {};
};

export default Innovations;
