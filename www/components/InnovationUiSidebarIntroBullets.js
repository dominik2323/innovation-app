import React from 'react';
import { DataContext } from '../helpers/dataContext';
import { useSelector } from 'react-redux';
import CountUp from 'react-countup';
import { selectInnovationById } from '../helpers/selectInnovationById';

const classNamePrefix = `innovation-ui__sidebar__content__intro`;
const InnovationUiSidebarIntroBulletsBullet = ({ bullet, index }) => (
  <div className={`${classNamePrefix}__bullets__list__item`}>
    <span>{index <= 9 ? `0${index + 1}` : index + 1}</span>
    <p>{bullet}</p>
  </div>
);

const InnovationUiSidebarIntroBullets = () => {
  const { innovations, components } = React.useContext(DataContext);
  const activeInnovationId = useSelector((state) => state.activeInnovationId);
  const { benefits, motivation } = selectInnovationById(
    innovations,
    activeInnovationId
  );
  const {
    sidebar_motivation: motivationHeader,
    sidebar_benefits: benefitsHeader,
  } = components;

  return (
    <div className={`${classNamePrefix}__bullets`}>
      <div className={`${classNamePrefix}__bullets__list`}>
        <h3>{motivationHeader}</h3>
        {motivation.map((bullet, i) => (
          <InnovationUiSidebarIntroBulletsBullet
            bullet={bullet.text}
            index={i}
            key={i}
          />
        ))}
      </div>
      <div className={`${classNamePrefix}__bullets__list`}>
        <h3>{benefitsHeader}</h3>
        {benefits.map((bullet, i) => (
          <InnovationUiSidebarIntroBulletsBullet
            bullet={bullet.text}
            index={i}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default InnovationUiSidebarIntroBullets;

// animated numbers
/*<div
            className={`${classNamePrefix}__benefits__content__item`}
            key={i}
          >
            <div
              className={`${classNamePrefix}__benefits__content__item__number `}
            >
              <CountUp
                key={i}
                end={value}
                formattingFn={number =>
                  `${number.toLocaleString('cs-CS')}\u00a0${unit}`
                }
                duration={3}
              />
            </div>
            <div
              className={`${classNamePrefix}__benefits__content__item__name `}
            >
              <p>{name}</p>
            </div>
          </div>*/
