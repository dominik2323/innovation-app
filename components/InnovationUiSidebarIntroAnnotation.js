import React from "react";
import { DataContext } from "../helpers/dataContext";
import { useSelector, useDispatch } from "react-redux";
import Link from "./Link";
import Button from "./Button";
import { selectInnovationById } from "../helpers/functions";
import { useViewportDimensions } from "../hooks/useViewportDimensions";
import { toggleSidebar } from "../store/actions";

const InnovationUiSidebarIntroAnnotation = () => {
  const { innovations, components } = React.useContext(DataContext);
  const [scrollToAuthors, setScrollToAuthors] = React.useState(false);
  const { activeInnovationId, showSidebar, areAuthorsVisible } = useSelector(
    state => state
  );
  const dispatch = useDispatch();
  const { w } = useViewportDimensions();
  const { lessInfo, moreInfo } = components.button;
  const { innovationname, perex } = selectInnovationById(
    innovations,
    activeInnovationId
  );
  const classNamePrefix = `innovation-ui__sidebar__content__intro__annotation`;

  React.useEffect(() => {
    const sidebarDetailEl = document.querySelector(
      w <= 900
        ? `.innovation-ui__sidebar__content`
        : `#sidebar-detail .scrollbar-scroller`
    );
    sidebarDetailEl.scrollTop = sidebarDetailEl.scrollHeight;
    setScrollToAuthors(false);
  }, [scrollToAuthors]);

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
          {showSidebar === `show` ? lessInfo : moreInfo}
        </Button>
        {!areAuthorsVisible && (
          <Link
            // className={areAuthorsVisible ? `disable` : ``}
            handleClick={() => {
              dispatch(toggleSidebar(`show`));
              setScrollToAuthors(true);
            }}
          >{`Kontakt na autory`}</Link>
        )}
      </div>
    </div>
  );
};

export default InnovationUiSidebarIntroAnnotation;
