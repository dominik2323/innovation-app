import axios from 'axios';
import absoluteUrl from '../../helpers/absoluteUrl';
import { useRouter } from 'next/router';
import Button from '../../components/Button';
import Error from '../../components/Error';
import Header from '../../components/Header';
import strings from '../../../globals/strings.json';
import View from '../../components/View';
import { DataContext } from '../../helpers/dataContext';

const AllowUser = ({ data, error }) => {
  const router = useRouter();
  const { lang, t: token } = router.query;
  const [response, setResponse] = React.useState({
    isLoading: false,
    data: null,
  });

  if (error) {
    return <Error message={error.message} statusCode={error.statusCode} />;
  }

  const updateUser = async (payload) => {
    const serializedPayload = JSON.stringify(payload);
    const baseUrl = absoluteUrl(null, `localhost:9999`);
    try {
      setResponse({ isLoading: true, data: null });
      const res = await axios.get(
        `${baseUrl}api/allow-user?lang=${lang}&t=${token}&payload=${serializedPayload}`
      );
      setResponse({ isLoading: false, data: res.data });
    } catch (e) {
      setResponse({ isLoading: false, data: null });
    }
  };

  return (
    <DataContext.Provider value={{ components: strings[lang] }}>
      <View>
        <Header descriptor={``} />
        <div className={`auth`}>
          <div className={`auth__wrap`}>
            {response.data ? (
              <div className={`auth__wrap__intro`}>
                <h1>Hotovo</h1>
                <p>{`Uživatel ${response.data.name} byl ${
                  response.data.user_metadata.isAllowed
                    ? `povolen`
                    : `zablokován`
                }`}</p>
              </div>
            ) : (
              <div className={`auth__wrap__intro`}>
                {response.isLoading ? (
                  <div className={`auth__wrap__intro`}>
                    <h1>{`Prosím čekejte`}</h1>
                  </div>
                ) : (
                  <>
                    <h1>Informace o uživateli</h1>
                    <p>{data.userData.name}</p>
                    <p>{data.userData.email}</p>
                    <Button
                      className={`btn__primary`}
                      style={{ marginTop: 50 }}
                      handleClick={() =>
                        updateUser({ isAllowed: true, isBlocked: false })
                      }
                    >
                      Povolit
                    </Button>
                    <Button
                      className={`btn__secondary btn__secondary--red`}
                      style={{ marginTop: 10 }}
                      handleClick={() =>
                        updateUser({ isAllowed: false, isBlocked: true })
                      }
                    >
                      Zablokovat
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </View>
    </DataContext.Provider>
  );
};
export async function getServerSideProps({ query, req, res }) {
  const { t: token } = query;
  const baseUrl = absoluteUrl(req, `localhost:9999`);

  try {
    const res = await axios.get(`${baseUrl}api/verify-token?t=${token}`);
    return { props: { error: null, data: res.data } };
  } catch (err) {
    return {
      props: {
        data: null,
        error: {
          message: err.response.data.message,
          statusCode: err.response.data.status,
        },
      },
    };
  }
}

export default AllowUser;
