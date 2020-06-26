import React from 'react';
import Router from 'next/router';
import { DataContext } from '../helpers/dataContext';
import { useSelector } from 'react-redux';
import { selectInnovationById } from '../helpers/selectInnovationById';
import Link from './Link';

const InnovationUiSidebarDetailFiles = () => {
  const { humans, innovations, components } = React.useContext(DataContext);
  const activeInnovationId = useSelector((state) => state.activeInnovationId);
  const { download } = selectInnovationById(innovations, activeInnovationId);

  const classNamePrefix = `innovation-ui__sidebar__content__detail__wrapper__download`;

  return download.length === 0 ? null : (
    <div className={`${classNamePrefix}`}>
      <h3>{components.sidebar_download_label}</h3>
      {download.map(({ file, filename }, i) => (
        <a target={`_blank`} href={file.url} key={file.name + i}>
          {`${filename} (${file.name.split('.').pop()})`}
        </a>
      ))}
    </div>
  );
};

export default InnovationUiSidebarDetailFiles;
