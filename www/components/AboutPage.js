import React from 'react';
import ScrollbarComponent from './Scrollbar';
import { DataContext } from '../helpers/dataContext';
import Img from './Img';

const AboutPage = () => {
  const { about, components } = React.useContext(DataContext);
  const { directorphoto, directorname, abouttext, directorposition } = about;
  return (
    <div className={`about`}>
      <h2>{components.aboutHeader}</h2>
      <div className={`about__content`}>
        <div className={`about__content__director`}>
          <Img src={directorphoto.url} />
          <p className={`about__content__director__name`}>{directorname}</p>
          <p className={`about__content__director__position`}>
            {directorposition}
          </p>
        </div>
        <div className={`about__content__quote`}>
          <ScrollbarComponent
            vTrackStyle={{ right: 0, left: `unset` }}
            style={{ height: `initial` }}
          >
            {abouttext.map(item => {
              if (item.type === `paragraph`) {
                return <p key={item.text}>{item.text}</p>;
              } else if (item.type === `heading3`) {
                return <h3 key={item.text}>{item.text}</h3>;
              }
            })}
          </ScrollbarComponent>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
