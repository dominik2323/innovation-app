import React from "react";
import ScrollbarComponent from "./Scrollbar";
import { DataContext } from "../helpers/dataContext";
import Img from "./Img";
// import JsxParser from "react-jsx-parser";

const AboutPage = () => {
  const { about } = React.useContext(DataContext);
  const {
    directorphoto,
    directorname,
    abouttext,
    directorposition
  } = about.data;
  return (
    <div className={`about`}>
      <h2>O Logistice ŠKODA AUTO</h2>
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
                /*let para = item.text;
              if (item.spans.length !== 0) {
                const markup = item.spans.forEach(({ start, end }) => {
                  const span = para.slice(start, end);
                  const splitPara = para.split(span);
                  para = `${splitPara[0]}<span>${span}</span>${splitPara[1]}`;
                });
              }*/
                // return <JsxParser key={para} jsx={`<p>${para}</p>`} />;
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
