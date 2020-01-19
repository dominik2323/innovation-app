import AboutPage from '../components/AboutPage';
import View from '../components/View';
import Header from '../components/Header';

import { VARIANTS } from '../helpers/consts';

import '../scss/index.scss';

const About = () => (
  <View variants={VARIANTS.PAGES.ABOUT}>
    <Header descriptor={`O logistice Škoda Auto`} />
    <AboutPage />
  </View>
);

About.getInitialProps = () => {
  return {};
};

export default About;
