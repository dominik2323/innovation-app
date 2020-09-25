import React from 'react';
import { useSelector } from 'react-redux';
import { DataContext } from '../helpers/dataContext';
import { selectInnovationById } from '../helpers/selectInnovationById';

const InnovationUiSidebarDetailFiles = () => {
  const { innovations, components } = React.useContext(DataContext);
  const activeInnovationId = useSelector((state) => state.activeInnovationId);
  const { download } = selectInnovationById(innovations, activeInnovationId);

  const classNamePrefix = `innovation-ui__sidebar__content__detail__wrapper__download`;

  if (!download) return null;
  return (
    <div className={`${classNamePrefix}`}>
      <h3>{components.sidebar_download_label}</h3>
      {download.map(({ file, filename }, i) => (
        <a target={`_blank`} href={file.url} key={filename + i}>
          {`${filename} (${filename.split('.').pop()})`}
        </a>
      ))}
    </div>
  );
};

export default InnovationUiSidebarDetailFiles;
