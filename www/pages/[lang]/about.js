import AboutPage from '../../components/AboutPage';
import View from '../../components/View';
import Header from '../../components/Header';

import absoluteUrl from '../../helpers/absoluteUrl';
import { VARIANTS } from '../../helpers/consts';
import Axios from 'axios';
import { DataContext } from '../../helpers/dataContext';
import strings from '../../../globals/strings.json';
import { useRouter } from 'next/router';

const About = (about) => {
  // return <pre>{JSON.stringify(props, null, 2)}</pre>;
  const router = useRouter();
  const lang = router.query.lang;
  return (
    <DataContext.Provider
      value={{ about, components: strings[router.query.lang] }}
    >
      <View variants={VARIANTS.PAGES.ABOUT}>
        <Header descriptor={strings[lang].page_title_about} />
        <AboutPage />
      </View>
    </DataContext.Provider>
  );
};

export async function getServerSideProps(ctx) {
  const apiBase = absoluteUrl(ctx.req, 'localhost:9999');
  const lang = ctx.params.lang || 'en';
  const aboutData = await Axios.get(`${apiBase}api/v2/get-about?lang=${lang}`);

  return { props: aboutData.data.data.allAbouts.edges[0].node };
}

export default About;
