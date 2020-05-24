// import DataContextProvider from "../helpers/dataContext";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import InnovationPage from '../../components/Innovation';
import View from '../../components/View';
import Header from '../../components/Header';
import { setActiveInnovationId } from '../../store/actions';

import { VARIANTS } from '../../helpers/consts';
import { selectInnovationById } from '../../helpers/selectInnovationById';
import { DataContext } from '../../helpers/dataContext';
import { useViewportDimensions } from '../../hooks/useViewportDimensions';

const Innovations = () => {
  const dispatch = useDispatch();
  const activeInnovationId = useSelector((state) => state.activeInnovationId);
  const { innovations } = React.useContext(DataContext);
  const router = useRouter();
  const { id, lang } = router.query;
  const { w } = useViewportDimensions();

  React.useEffect(() => {
    if (id !== undefined) {
      dispatch(setActiveInnovationId(id));
    }
  }, [id]);

  return (
    <View
      variants={VARIANTS.PAGES.INNOVATION}
      custom={{ w }}
      style={{ width: w }}
      showToggler={!!activeInnovationId}
      showDownload={!!activeInnovationId}
      showShare={!!activeInnovationId}
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
