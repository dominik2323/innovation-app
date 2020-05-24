import React from 'react';
import { RichText } from 'prismic-reactjs';
import { DataContext } from '../helpers/dataContext';
import { useSelector } from 'react-redux';
import { selectInnovationById } from '../helpers/selectInnovationById';
import Img from './Img';

const InnovationUiSidebarDetailAbout = () => {
  const activeInnovationId = useSelector((state) => state.activeInnovationId);

  const { innovations } = React.useContext(DataContext);
  const { about } = selectInnovationById(innovations, activeInnovationId);
  const classNamePrefix = `innovation-ui__sidebar__content__detail__wrapper`;
  return (
    <div className={`${classNamePrefix}__about`}>{RichText.render(about)}</div>
  );
};

export default InnovationUiSidebarDetailAbout;
