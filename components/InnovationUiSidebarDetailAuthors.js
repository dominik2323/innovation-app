import React from "react";
import { DataContext } from "../helpers/dataContext";
import { useSelector, useDispatch } from "react-redux";
import { selectInnovationById, findAuthor } from "../helpers/functions";
import { setAuthorsVisibility } from "../store/actions";
import Img from "./Img";

const Human = ({ img, name, phone, email, isGarant }) => {
  return (
    <div className={`human`}>
      <div className={`human__avatar`}>
        <Img src={img.url} />
      </div>
      <div className={`human__details`}>
        <h4>{name}</h4>
        {isGarant && <p className={`small`}>garant projektu</p>}
        <p>{phone}</p>
        <p>{email}</p>
      </div>
    </div>
  );
};

const InnovationUiSidebarDetailAuthors = () => {
  const { humans, innovations } = React.useContext(DataContext);
  const ref = React.useRef(null);
  const dispatch = useDispatch();
  const activeInnovationId = useSelector(state => state.activeInnovationId);

  const { authors } = selectInnovationById(innovations, activeInnovationId);
  const authorsData = authors.map(author => findAuthor(author, humans));

  const classNamePrefix = `innovation-ui__sidebar__content__detail__wrapper`;

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      dispatch(setAuthorsVisibility(entry.isIntersecting));
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.unobserve(ref.current);
    };
  }, []);

  // if (authorsData.length === 0) return null;
  return (
    <div ref={ref} className={`${classNamePrefix}__authors`}>
      {authorsData.length === 0 ? null : (
        <React.Fragment>
          <h3>Autoři</h3>
          <div className={`${classNamePrefix}__authors__list`}>
            {authorsData.map(({ name, phone, email, img, id, isGarant }, i) => (
              <Human
                name={name}
                phone={phone}
                isGarant={isGarant}
                email={email}
                img={img}
                key={`${id}-${i}`}
              />
            ))}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default InnovationUiSidebarDetailAuthors;
