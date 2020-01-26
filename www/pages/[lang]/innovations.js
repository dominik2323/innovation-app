// import DataContextProvider from "../helpers/dataContext";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { fetchData } from '../../helpers/fetchData';
// import { withRedux } from "../helpers/withRedux";

import InnovationPage from '../../components/Innovation';
import View from '../../components/View';
import Header from '../../components/Header';
import { setActiveInnovationId } from '../../store/actions';

import { VARIANTS } from '../../helpers/consts';
import { selectInnovationById } from '../../helpers/functions';
import { DataContext } from '../../helpers/dataContext';
import { useViewportDimensions } from '../../hooks/useViewportDimensions';

const Innovations = () => {
  const dispatch = useDispatch();
  const activeInnovationId = useSelector(state => state.activeInnovationId);
  const { innovations } = React.useContext(DataContext);
  const router = useRouter();
  const { id } = router.query;
  const { w } = useViewportDimensions();

  React.useEffect(() => {
    if (id !== undefined) {
      console.log(id);
      dispatch(setActiveInnovationId(id));
    }
  }, [id]);

  return (
    <View
      variants={VARIANTS.PAGES.INNOVATION}
      custom={{ w }}
      style={{ width: w }}
    >
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

export default Innovations;
