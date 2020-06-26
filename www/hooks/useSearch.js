import React from "react";
import { DataContext } from "../helpers/dataContext";

export function useSearch(query) {
  const [filteredItems, setFilteredItems] = React.useState([]);
  const { innovations, humans } = React.useContext(DataContext);

  React.useEffect(() => {
    if (query.length > 2) {
      const regex = new RegExp(query, "i");
      const testString = string => regex.test(string);

      const filterHumans = humans.filter(({ name }) => testString(name));
      const filterHumansIds = filterHumans.map(human => human.id);
      console.log(filterHumansIds);

      const matches = innovations.filter(
        ({ innovationname, about, authors }) => {
          const nameMatch = testString(innovationname);

          const aboutTextMatch = about.reduce((acc, curr) => {
            if (typeof curr.text === `string`) {
              return testString(curr.text) || acc;
            }
            return acc;
          }, false);

          const humanMatch = authors.reduce((acc, curr) => {
            return filterHumansIds.includes(curr.humans.id) || acc;
          }, false);

          return nameMatch || aboutTextMatch || humanMatch;
        }
      );

      setFilteredItems(matches);
    } else {
      setFilteredItems([]);
    }
  }, [query]);

  return filteredItems;
}
