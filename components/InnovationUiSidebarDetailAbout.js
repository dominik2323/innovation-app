import React from "react";
import { DataContext } from "../helpers/dataContext";
import { useSelector } from "react-redux";
import { selectInnovationById } from "../helpers/functions";
import Img from "./Img";

const InnovationUiSidebarDetailAbout = () => {
  const activeInnovationId = useSelector(state => state.activeInnovationId);

  const { innovations, components } = React.useContext(DataContext);
  const { about } = selectInnovationById(innovations, activeInnovationId);
  const { aboutInnovation } = components.innovationUiSidebar;

  const classNamePrefix = `innovation-ui__sidebar__content__detail__wrapper`;
  return (
    <div className={`${classNamePrefix}__about`}>
      {/*<h3>{aboutInnovation}</h3>*/}
      {about.map((item, i) => {
        if (item.type === `paragraph`) {
          return (
            <div
              key={item.text + i}
              className={`${classNamePrefix}__about__paragraph`}
            >
              <p>{item.text}</p>
            </div>
          );
        } else if (item.type === `image`) {
          return (
            <div
              key={item.url + i}
              className={`${classNamePrefix}__about__images`}
            >
              <Img src={item.url} />
            </div>
          );
        } else if (item.type === `heading2`) {
          return <h3 key={item.text + i}>{item.text}</h3>;
        } else if (item.type === `list-item`) {
          return (
            <p
              key={item.text + i}
              className={`${classNamePrefix}__about__bullets`}
            >
              {item.text}
            </p>
          );
        }
      })}
    </div>
  );
};

export default InnovationUiSidebarDetailAbout;
