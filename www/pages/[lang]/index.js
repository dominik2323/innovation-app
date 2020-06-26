import Intro from '../../components/Intro';
import View from '../../components/View';
import Header from '../../components/Header';

import { VARIANTS } from '../../helpers/consts';
import { useViewportDimensions } from '../../hooks/useViewportDimensions';

const Index = ({ ...props }) => {
  const { w } = useViewportDimensions();
  return (
    <React.Fragment>
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
