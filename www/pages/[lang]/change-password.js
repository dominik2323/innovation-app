import React from 'react';
import axios from 'axios';
import absoluteUrl from '../../helpers/absoluteUrl';
import { Formik, Form, Field } from 'formik';
import Button from '../../components/Button';
import { useRouter } from 'next/router';
import strings from '../../../globals/strings.json';
import Input from '../../components/Input';
import Header from '../../components/Header';
import View from '../../components/View';
import Error from 'next/error';
import { DataContext } from '../../helpers/dataContext';

const ChangePassword = () => {
  const [responseErrorType, setResponseErrorType] = React.useState(null);
  const [wasSend, setWasSend] = React.useState(false);
  const [{ isLoading, error }, setStatus] = React.useState({
    isLoading: true,
    error: null,
  });
  const router = useRouter();
  const { lang, t } = router.query;

  React.useEffect(() => {
    const baseUrl = absoluteUrl(null, 'localhost:9999');
    axios
      .post(`${baseUrl}api/verify-user`, {
        token: t,
      })
      .then(
        setStatus({
          isLoading: false,
          error: null,
        })
      )
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

  if (error) return <Error title={error.message} status={error.status} />;

  const handleSubmit = async (values, actions) => {
    const baseUrl = absoluteUrl(null, 'localhost:9999');
    actions.setSubmitting(true);
    axios
      .post(`${baseUrl}api/change-password`, {
        password: values.password,
        token: t,
      })
      .then((userData) => {
        setStatus({
          error: null,
          isLoading: false,
        });
      })
      .catch((e) => {
        setStatus({
          isLoading: false,
          error: {
            error: e.response.data.message,
            status: e.response.status,
          },
        });
      });

    setWasSend(true);
    actions.setSubmitting(false);
  };

  return (
    <DataContext.Provider value={{ components: strings[lang] }}>
      <View>
        <Header descriptor={strings[lang].auth_change_password_page_title} />
        <Formik
          initialValues={{
            password: '',
            passwordAgain: '',
          }}
          validate={(values) => {
            const errors = {};

            if (values.password !== values.passwordAgain) {
              errors.passwordAgain = {
                match: strings[lang].auth_error_password_mismatch,
              };
            }

            if (values.password.length < 8)
              errors.password = {
                ...errors.password,
                length: strings[lang].auth_error_password_too_short,
              };

            if (!/([A-Z])/g.test(values.password)) {
              errors.password = {
                ...errors.password,
                uppercase: strings[lang].auth_error_password_lowercase,
              };
            }

            if (!/([0-9])/g.test(values.password)) {
              errors.password = {
                ...errors.password,
                numeric: strings[lang].auth_error_password_numeric,
              };
            }

            if (!/([!@#\$%\^&\*\.,-/])/g.test(values.password)) {
              errors.password = {
                ...errors.password,
                special: strings[lang].auth_error_password_special_char,
              };
            }

            return errors;
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <div className={`auth`}>
              <div className={`auth__wrap`}>
                {wasSend ? (
                  <>
                    <div className={`auth__wrap__intro`}>
                      <h1>
                        {strings[lang].auth_change_password_success_header}
                      </h1>
                      <p>{strings[lang].auth_change_password_success_perex}</p>
                    </div>
                    <Button
                      className={`btn__primary`}
                      handleClick={() =>
                        router.push(`/[lang]/login`, `/${lang}/login`)
                      }
                    >
                      {strings[lang].button_continue}
                    </Button>
                  </>
                ) : (
                  <>
                    <div className={`auth__wrap__intro`}>
                      <h1>{strings[lang].auth_change_password_header}</h1>
                      <p>{strings[lang].auth_change_password_perex}</p>
                    </div>
                    <Form>
                      <Field
                        id={`passwordAgain`}
                        name={`passwordAgain`}
                        type={`password`}
                        label={`Password`}
                        as={Input}
                      />
                      <Field
                        id={`password`}
                        name={`password`}
                        type={`password`}
                        label={`Password again`}
                        as={Input}
                      />
                      <Button
                        isLoading={isSubmitting}
                        className={`btn__primary`}
                        type={`submit`}
                      >
                        {strings[lang].button_send}
                      </Button>
                      <p className={`input__required-label`}>
                        * {strings[lang].auth_field_label_required}
                      </p>
                    </Form>
                  </>
                )}
              </div>
            </div>
          )}
        </Formik>
      </View>
    </DataContext.Provider>
  );
};

export default ChangePassword;
