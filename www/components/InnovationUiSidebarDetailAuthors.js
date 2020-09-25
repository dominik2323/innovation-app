import React from 'react';
import { DataContext } from '../helpers/dataContext';
import { useSelector, useDispatch } from 'react-redux';
import { selectInnovationById } from '../helpers/selectInnovationById';
import { findAuthor } from '../helpers/findAuthor';
import { setAuthorsVisibility } from '../store/actions';
import Img from './Img';

const Human = ({ img, name, phone, email, isGarant }) => {
  const { components } = React.useContext(DataContext);
  return (
    <div className={`human`}>
      <div className={`human__avatar`}>
        <Img src={img.url} />
      </div>
      <div className={`human__details`}>
        <h4>{name}</h4>
        {isGarant && (
          <p className={``}>{components.contact_garant_of_project}</p>
        )}
        <p>{phone}</p>
        <p>{email}</p>
      </div>
    </div>
  );
};

const InnovationUiSidebarDetailAuthors = () => {
  const { innovations, components } = React.useContext(DataContext);
  const ref = React.useRef(null);
  const dispatch = useDispatch();
  const activeInnovationId = useSelector((state) => state.activeInnovationId);

  const innovation = selectInnovationById(innovations, activeInnovationId);

  const classNamePrefix = `innovation-ui__sidebar__content__detail__wrapper`;

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      dispatch(setAuthorsVisibility(entry.isIntersecting));
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      ref.current && observer.unobserve(ref.current);
    };
  }, []);

  if (!innovation?.authors) return null;
  return (
    <div ref={ref} className={`${classNamePrefix}__authors`}>
      {innovation.authors.length === 0 ? null : (
        <>
          <h3>{components.authors}</h3>
          <div className={`${classNamePrefix}__authors__list`}>
            {innovation.authors.map(({ humans, role }, i) => (
              <Human
                name={humans.name}
                phone={humans.phone}
                isGarant={role === `Garant`}
                email={humans.email}
                img={humans.img}
                key={`${humans._meta.id}-${i}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default InnovationUiSidebarDetailAuthors;
