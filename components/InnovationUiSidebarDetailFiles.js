import React from "react";
import Router from "next/router";
import { DataContext } from "../helpers/dataContext";
import { useSelector } from "react-redux";
import { selectInnovationById } from "../helpers/functions";
import Link from "./Link";

const InnovationUiSidebarDetailFiles = () => {
  const { humans, innovations } = React.useContext(DataContext);
  const activeInnovationId = useSelector(state => state.activeInnovationId);
  const { download } = selectInnovationById(innovations, activeInnovationId);

  const classNamePrefix = `innovation-ui__sidebar__content__detail__wrapper__download`;

  return download.length === 0 ? null : (
    <div className={`${classNamePrefix}`}>
      <h3>Ke stažení</h3>
      {download.map(({ file }, i) => (
        <a href={file.url} key={file.name + i}>
          {file.name}
        </a>
      ))}
    </div>
  );
};

export default InnovationUiSidebarDetailFiles;
