import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import Router, { useRouter } from 'next/router';
import React from 'react';
import { setCookie } from 'nookies';
import strings from '../../../globals/strings.json';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Link from '../../components/Link';
import View from '../../components/View';
import absoluteUrl from '../../helpers/absoluteUrl';
import { emailRegexp } from '../../helpers/consts';
import { useAuth } from '../../hocs/auth';
import { DataContext } from '../../helpers/dataContext';

const Login = () => {
  const [serverError, setServerError] = React.useState('');
  const router = useRouter();
  const lang = router.query.lang;
  const { isAuthenticated } = useAuth();

  // kick out the logged user
  React.useEffect(() => {
    if (isAuthenticated) router.push(`/[lang]/`, `/${lang}/`);
  }, [isAuthenticated]);

  const handleSubmit = async (values, actions) => {
    const baseUrl = absoluteUrl(null, 'localhost:9999');

    setServerError('');
    actions.setSubmitting(true);
    try {
      const userData = await axios.post(`${baseUrl}api/login?lang=${lang}`, {
        ...values,
        // TODO: add hash
        password: values.password,
      });
      console.log(window.location.host.match(new RegExp(`^(www\.)?(.*)`))[2]);

      setCookie(null, 'userData', userData.data, {
        maxAge: 60 * 60 * 24 * 365,
        sameSite: true,
        // domain: window.location.host.match(new RegExp(`^(www\.)?(.*)`))[2],
        secure: true,
        path: '/',
      });
      Router.push(`/${lang}`);
    } catch (e) {
      console.log({ e });
      setServerError(e.response.data.message);
    }

    actions.setSubmitting(false);
  };

  return (
    <DataContext.Provider value={{ components: strings[lang] }}>
      <View>
        <Header descriptor={`Login`} />
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validate={({ email, password }) => {
            const errors = {};

            if (email.length === 0 || !emailRegexp.test(email)) {
              errors.email = {
                format: strings[lang].auth_error_invalid_email_format,
              };
            }

            if (password.length < 8) {
              errors.password = {
                length: strings[lang].auth_error_password_too_short,
              };
            }

            return errors;
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <div className={`auth`}>
              <div className={`auth__wrap`}>
                <div className={`auth__wrap__intro`}>
                  <h1>{strings[lang].auth_login_header}</h1>
                  <p>{strings[lang].auth_login_perex}</p>
                  <a
                    href={`#`}
                    onClick={() =>
                      Router.push('/[lang]/signup', `/${lang}/signup`)
                    }
                    className={`auth__wrap__sign-up`}
                  >
                    {strings[lang].auth_login_cta}
                  </a>
                </div>
                {!!serverError && (
                  <div
                    className={`auth__wrap__response auth__wrap__response--error`}
                  >
                    {serverError}
                  </div>
                )}
                <Form>
                  <Field
                    id={`email`}
                    name={`email`}
                    type={`text`}
                    label={`E-mail`}
                    as={Input}
                  />
                  <Field
                    id={`password`}
                    name={`password`}
                    type={`password`}
                    label={`Password`}
                    hint={() => (
                      <Link
                        handleClick={() =>
                          Router.push(
                            `/[lang]/request-change-password`,
                            `/${lang}/request-change-password`
                          )
                        }
                      >
                        {strings[lang].auth_login_forgot_password}
                      </Link>
                    )}
                    as={Input}
                  />
                  <Button
                    isLoading={isSubmitting}
                    className={`btn__primary`}
                    type={`submit`}
                  >
                    {strings[lang].button_login}
                  </Button>
                  <p className={`input__required-label`}>
                    * {strings[lang].auth_field_label_required}
                  </p>
                </Form>
              </div>
            </div>
          )}
        </Formik>
      </View>
    </DataContext.Provider>
  );
};

export default Login;
