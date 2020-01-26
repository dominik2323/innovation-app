import React from 'react';
import { DataContext } from '../helpers/dataContext';
import { useSelector, useDispatch } from 'react-redux';
import Link from './Link';
import Button from './Button';
import { selectInnovationById } from '../helpers/functions';
import { useViewportDimensions } from '../hooks/useViewportDimensions';
import { toggleSidebar } from '../store/actions';

const InnovationUiSidebarIntroAnnotation = () => {
  const { innovations, components } = React.useContext(DataContext);
  const { activeInnovationId, showSidebar, areAuthorsVisible } = useSelector(
    state => state
  );
  const dispatch = useDispatch();
  const { w } = useViewportDimensions();
  const { buttonLessInfo, buttonMoreInfo, contactToAuthors } = components;
  const { innovationname, perex } = selectInnovationById(
    innovations,
    activeInnovationId
  );
  const classNamePrefix = `innovation-ui__sidebar__content__intro__annotation`;

  const scrollToAuthors = () => {
    const el = document.querySelector(
      w <= 900
        ? `.innovation-ui__sidebar__content`
        : `#sidebar-detail .scrollbar-scroller`
    );
    console.log(el.scrollTop, el.scrollHeight);
    el.scrollTop = el.scrollHeight;
  };

  return (
    <div className={classNamePrefix}>
      <h1>{innovationname}</h1>
      <p>{perex}</p>
      <div className={` ${classNamePrefix}__cta `}>
        <Button
          className={`btn__secondary btn__secondary--green ${
            showSidebar === `show` ? `close-icon` : ``
          }`}
          handleClick={() =>
            dispatch(toggleSidebar(showSidebar === `half` ? `show` : `half`))
          }
        >
          {showSidebar === `show` ? buttonLessInfo : buttonMoreInfo}
        </Button>
        <Link
          className={areAuthorsVisible ? `disable` : ``}
          handleClick={() => {
            dispatch(toggleSidebar(`show`));
            scrollToAuthors();
          }}
        >
          {contactToAuthors}
        </Link>
      </div>
    </div>
  );
};

export default InnovationUiSidebarIntroAnnotation;
