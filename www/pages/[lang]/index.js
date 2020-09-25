import Axios from 'axios';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import strings from '../../../globals/strings.json';
import Header from '../../components/Header';
import Intro from '../../components/Intro';
import View from '../../components/View';
import absoluteUrl from '../../helpers/absoluteUrl';
import { VARIANTS } from '../../helpers/consts';
import { DataContext } from '../../helpers/dataContext';
import { useViewportDimensions } from '../../hooks/useViewportDimensions';
import { useDispatch } from 'react-redux';
import { setActiveInnovationId } from '../../store/actions';

const Index = ({ innovations }) => {
  const { w } = useViewportDimensions();
  const dispatch = useDispatch();
  const router = useRouter();

  React.useEffect(() => {
    // this is here basically only for prevent innovation being active after returning to /
    // you can't use it directly in actions bound to logotype, because it will animate content and then switch to /
    dispatch(setActiveInnovationId(``));
  }, []);

  return (
    <DataContext.Provider
      value={{ innovations, components: strings[router.query.lang] }}
    >
      <View
        variants={VARIANTS.PAGES.INTRO}
        custom={{ w }}
        style={{ width: `calc(100vw + ((100vh - 60px) / 10))` }}
      >
        <Header descriptor={``} />
        <Intro key={`Intro`} />
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

    return {
      props: { innovations: innovationsData.data },
    };
  } catch (e) {
    console.log(e);
  }
}

export default Index;
