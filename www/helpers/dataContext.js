import { useRouter } from 'next/router';
import strings from '../../globals/strings.json';

export const DataContext = React.createContext();

const DataContextProvider = ({ children, innovations, humans, about }) => {
  const [{ humanData, innovationsData, aboutData }, setData] = React.useState({
    humanData: null,
    innovationsData: null,
    aboutData: null,
  });

  const router = useRouter();
  React.useEffect(() => {
    if (humans && innovations && humans) {
      setData({
        humanData: humans.map((human) => ({
          ...human.data,
          id: human.id,
          uid: human.uid,
        })),
        innovationsData: innovations.results.map((innovation) => ({
          ...innovation.data,
          id: innovation.id,
          uid: innovation.uid,
        })),
        aboutData: about,
      });
    }
  }, []);

  return humanData && innovationsData && aboutData ? (
    <DataContext.Provider
      value={{
        components: strings[router.query.lang],
        humans: humanData,
        innovations: innovationsData.sort((a, b) => a.order - b.order),
        about: aboutData,
      }}
    >
      {children}
    </DataContext.Provider>
  ) : null;
};

export default DataContextProvider;
