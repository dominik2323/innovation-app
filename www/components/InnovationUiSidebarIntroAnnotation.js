import React from 'react';
import { DataContext } from '../helpers/dataContext';
import { useSelector, useDispatch } from 'react-redux';
import Link from './Link';
import Button from './Button';
import { selectInnovationById } from '../helpers/selectInnovationById';
import { useViewportDimensions } from '../hooks/useViewportDimensions';
import { toggleSidebar } from '../store/actions';

import { useAuth } from '../hocs/auth';

const InnovationUiSidebarIntroAnnotation = () => {
  const { innovations, components } = React.useContext(DataContext);
  const { isAuthenticated, user } = useAuth();
  const { activeInnovationId, showSidebar, areAuthorsVisible } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const { w } = useViewportDimensions();
  const { button_less_info, button_more_info, contact_to_authors } = components;
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
          {showSidebar === `show` ? button_less_info : button_more_info}
        </Button>
        {isAuthenticated && user?.isAllowed && (
          <Link
            className={areAuthorsVisible ? `disable` : ``}
            handleClick={() => {
              dispatch(toggleSidebar(`show`));
              scrollToAuthors();
            }}
          >
            {contact_to_authors}
          </Link>
        )}
      </div>
    </div>
  );
};

export default InnovationUiSidebarIntroAnnotation;
