import data from '../data';

export const DataContext = React.createContext();

const DataContextProvider = ({ children, innovations, humans, about }) => {
  const humanData =
    humans &&
    humans.map(human => ({
      ...human.data,
      id: human.id,
      uid: human.uid,
    }));

  const innovationsData =
    innovations &&
    innovations.results.map(innovation => ({
      ...innovation.data,
      id: innovation.id,
      uid: innovation.uid,
    }));

  const aboutData = about && about;

  return humans && innovations && about ? (
    <DataContext.Provider
      value={{
        components: data.components,
        humans: humanData,
        innovations: innovationsData.sort((a, b) => a.order - b.order),
        about: aboutData,
      }}>
      {children}
    </DataContext.Provider>
  ) : null;
};

export default DataContextProvider;
