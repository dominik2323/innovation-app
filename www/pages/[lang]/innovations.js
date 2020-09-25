// import DataContextProvider from "../helpers/dataContext";
import React from 'react';
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
import strings from '../../../globals/strings.json';
import Axios from 'axios';
import absoluteUrl from '../../helpers/absoluteUrl';
import { parseCookies } from 'nookies';

const Innovations = ({ innovations }) => {
  const dispatch = useDispatch();
  const activeInnovationId = useSelector((state) => state.activeInnovationId);
  const router = useRouter();
  const { id, lang } = router.query;
  const { w } = useViewportDimensions();

  React.useEffect(() => {
    if (id !== undefined) {
      dispatch(setActiveInnovationId(id));
    }
  }, [id]);

  return (
    <DataContext.Provider value={{ components: strings[lang], innovations }}>
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
    </DataContext.Provider>
  );
};

export async function getServerSideProps(ctx) {
  const baseUrl = absoluteUrl(ctx.req, `localhost:9999`);
  const lang = ctx.query.lang || `en`;
  const cookies = parseCookies(ctx);
  const token = cookies.userData || ``;

  try {
    const innovationsData = await Axios.get(
      `${baseUrl}api/v2/get-innovations?lang=${lang}&token=${token}`
    );

    console.log(`innovations`, cookies, {
      innovationsData: innovationsData.data,
    });
    return {
      props: { innovations: innovationsData.data },
    };
  } catch (e) {
    console.log(e);
  }
}

export default Innovations;
