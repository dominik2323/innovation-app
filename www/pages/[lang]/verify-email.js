import axios from 'axios';
import absoluteUrl from '../../helpers/absoluteUrl';
import { useRouter } from 'next/router';
import Button from '../../components/Button';
import Error from 'next/error';
import Header from '../../components/Header';
import strings from '../../../globals/strings.json';
import View from '../../components/View';
import { DataContext } from '../../helpers/dataContext';

const VerifyEmail = () => {
  const router = useRouter();
  const { t: token, lang } = router.query;

  const [{ isLoading, error }, setStatus] = React.useState({
    isLoading: true,
    error: null,
  });

  React.useEffect(() => {
    const baseUrl = absoluteUrl(null, 'localhost:9999');

    axios
      .get(`${baseUrl}api/verify-email?t=${token}`)
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
    <DataContext.Provider value={{ components: strings[lang] }}>
      <View>
        <Header descriptor={strings[lang].auth_email_verification_page_title} />
        <div className={`auth`}>
          <div className={`auth__wrap`}>
            {isLoading ? (
              <div className={`auth__wrap__intro`}>
                <h1>{strings[lang].auth_email_verification_loading_header}</h1>
              </div>
            ) : (
              <>
                <div className={`auth__wrap__intro`}>
                  <h1>
                    {strings[lang].auth_email_verification_success_header}
                  </h1>
                  <p>{strings[lang].auth_email_verification_success_perex}</p>
                </div>
                <div className={``}>
                  <Button
                    className={`btn__primary`}
                    handleClick={() =>
                      router.push(`/[lang]/login`, `/${lang}/login`)
                    }
                  >
                    {strings[lang].button_continue}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </View>
    </DataContext.Provider>
  );
};

export default VerifyEmail;
