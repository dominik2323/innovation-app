import React from 'react';
import { DataContext } from '../helpers/dataContext';
import { parseCookies } from 'nookies';
import absoluteUrl from '../helpers/absoluteUrl';
import { useRouter } from 'next/router';
import Axios from 'axios';

export function useSearch(query) {
  const [filteredItems, setFilteredItems] = React.useState([]);
  const { innovations: propsInnovations } = React.useContext(DataContext);
  const [innovations, setInnovations] = React.useState(propsInnovations);
  const router = useRouter();

  async function fetchInnovations() {
    const baseUrl = absoluteUrl(null, `localhost:9999`);
    const token = parseCookies().userData || ``;
    const lang = router.query.lang || `en`;
    try {
      const res = await Axios.get(
        `${baseUrl}api/v2/get-innovations?lang=${lang}&token=${token}`
      );
      setInnovations(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  React.useEffect(() => {
    if (!innovations) {
      fetchInnovations();
    }
    if (query.length > 2) {
      try {
        // return empty arr, when the query breaks regexp with special characters
        const regex = new RegExp(escape(query), 'ig');
        const testString = (string) => regex.test(string);

        const matches = innovations.filter((innovation) => {
          return testString(JSON.stringify(innovation));
        });

        setFilteredItems(matches);
      } catch (err) {
        setFilteredItems([]);
      }
    } else {
      setFilteredItems([]);
    }
  }, [query]);

  return filteredItems;
}
