import axios from 'axios';
import absoluteUrl from '../../helpers/absoluteUrl';
import { useRouter } from 'next/router';
import Button from '../../components/Button';
import Error from 'next/error';
import Header from '../../components/Header';
import strings from '../../../globals/strings';
import View from '../../components/View';

const AllowUser = () => {
  const router = useRouter();
  const { t: token, lang } = router.query;

  const [{ isLoading, error }, setStatus] = React.useState({
    isLoading: true,
    error: null,
  });

  React.useEffect(() => {
    const baseUrl = absoluteUrl(null, 'localhost:9999');

    axios
      .get(`${baseUrl}api/allow-user?t=${token}`)
      .then((res) => {
        setStatus({
          isLoading: false,
          error: null,
        });
      })
      .catch((e) => {
        setStatus({
          isLoading: false,
          error: {
            message: e.response.data.message,
            status: e.response.status,
          },
        });
      });
  }, []);

  if (error) return <Error statusCode={error.status} title={error.message} />;

  return (
    <View>
      <Header descriptor={``} />
      <div className={`auth`}>
        <div className={`auth__wrap`}>
          {isLoading ? (
            <div className={`auth__wrap__intro`}>
              <h1>{`Ověřuji uživatele`}</h1>
            </div>
          ) : (
            <div className={`auth__wrap__intro`}>
              <h1>{`Uživatel byl uspěšně ověřen`}</h1>
            </div>
          )}
        </div>
      </div>
    </View>
  );
};

export default AllowUser;
