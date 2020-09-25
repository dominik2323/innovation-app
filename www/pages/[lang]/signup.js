import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import strings from '../../../globals/strings.json';
import AuthSuccess from '../../components/AuthSuccess';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Link from '../../components/Link';
import View from '../../components/View';
import absoluteUrl from '../../helpers/absoluteUrl';
import { emailRegexp } from '../../helpers/consts';
import { DataContext } from '../../helpers/dataContext';

const Signup = () => {
  const router = useRouter();
  const { lang } = router.query;
  const [step, changeStep] = React.useState(0);

  const [signupResponse, setSignupResponse] = React.useState({
    status: null,
    error: null,
    token: null,
  });

  const [resendEmailResponse, setResendEmailResponse] = React.useState({
    status: null,
    isLoading: false,
    error: null,
    payload: null,
  });

  const resendEmail = async () => {
    setResendEmailResponse((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    try {
      const baseUrl = absoluteUrl(null, 'localhost:9999');
      const res = await axios.post(`${baseUrl}api/resend-email?lang=${lang}`, {
        token: signupResponse.token,
      });
      setResendEmailResponse({
        status: res.status,
        payload: res.data,
        isLoading: false,
        error: null,
      });
    } catch (e) {
      setResendEmailResponse({
        status: e.status,
        error: e.response.data.message,
        isLoading: false,
        payload: null,
      });
    }
  };

  const handleSubmit = async ({ email, company, name, password }, actions) => {
    actions.setSubmitting(true);

    const baseUrl = absoluteUrl(null, 'localhost:9999');

    try {
      const res = await axios.post(`${baseUrl}api/signup?lang=${lang}`, {
        email: email,
        company: company,
        name: name,
        password: password,
      });

      setSignupResponse({
        status: res.status,
        token: res.data,
        error: null,
      });
    } catch (e) {
      setSignupResponse({
        error: e.response.data.message,
        status: e.response.data.status,
        token: null,
      });
      changeStep(0);
    }
  };

  if (!!signupResponse.token) {
    return (
      <AuthSuccess
        error={resendEmailResponse.error}
        status={resendEmailResponse.payload}
        perex={strings[lang].auth_signup_success_perex}
        header={strings[lang].auth_signup_success_header}
        buttonText={strings[lang].button_continue}
        redirectTo={() => router.push(`/[lang]/login`, `/${lang}/login`)}
      >
        <Link
          isLoading={resendEmailResponse.isLoading}
          handleClick={resendEmail}
          style={{ marginTop: 20, display: 'block' }}
        >
          {strings[lang].auth_signup_success_link_resend_email}
        </Link>
      </AuthSuccess>
    );
  }
  return (
    <DataContext.Provider value={{ components: strings[lang] }}>
      <View>
        <Header descriptor={strings[lang].auth_signup_page_title} />
        <Formik
          validate={(values) => {
            const errors = {};

            if (!emailRegexp.test(values.email)) {
              errors.email = {
                format: strings[lang].auth_error_invalid_email_format,
              };
            }

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

            if (values.name.length === 0 && step === 1) {
              errors.name = { length: strings[lang].auth_error_no_name };
            }

            return errors;
          }}
          initialValues={{
            password: '',
            passwordFieldAgain: '',
            name: '',
            email: '',
            company: '',
          }}
          onSubmit={handleSubmit}
        >
          {({ errors, isSubmitting, validateForm, values, setTouched }) => (
            <div className={`auth`}>
              <div className={`auth__wrap`}>
                <div className={`auth__wrap__intro`}>
                  <h1>{strings[lang].auth_signup_header}</h1>
                  <>{strings[lang].auth_signup_perex}</>
                </div>
                {!!signupResponse.error && (
                  <div
                    className={`auth__wrap__response auth__wrap__response--error`}
                  >
                    {signupResponse.error}
                  </div>
                )}
                <Form>
                  {step === 0 && (
                    <>
                      <h2 className={`auth__wrap__section`}>
                        {strings[lang].auth_signup_form_header_login_data}
                      </h2>
                      <Field
                        name={`email`}
                        id={`email`}
                        type={`text`}
                        error={errors.email}
                        label={strings[lang].auth_field_email}
                        as={Input}
                      />
                      <Field
                        name={`password`}
                        id={`password`}
                        type={`password`}
                        label={strings[lang].auth_field_password}
                        error={errors.password}
                        as={Input}
                      />
                      <Field
                        name={`passwordAgain`}
                        id={`passwordAgain`}
                        type={`password`}
                        error={errors.passwordAgain}
                        label={strings[lang].auth_field_password_again}
                        as={Input}
                      />
                      <Button
                        className={`btn__primary`}
                        type={`button`}
                        handleClick={() => {
                          validateForm(values).then((errors) => {
                            setTouched({
                              email: true,
                              password: true,
                              passwordAgain: true,
                            });
                            if (Object.keys(errors).length === 0) {
                              changeStep(1);
                            }
                          });
                        }}
                      >
                        {strings[lang].button_continue}
                      </Button>
                      <p className={`input__required-label`}>
                        * {strings[lang].auth_field_label_required}
                      </p>
                    </>
                  )}
                  {step === 1 && (
                    <>
                      <h2 className={`auth__wrap__section`}>
                        {strings[lang].auth_signup_form_header_personal_data}
                      </h2>
                      <Field
                        name={`name`}
                        type={`text`}
                        id={`name`}
                        label={strings[lang].auth_field_name}
                        error={errors.name}
                        as={Input}
                      />
                      <Field
                        name={`company`}
                        type={`text`}
                        id={`company`}
                        required={false}
                        label={strings[lang].auth_field_company}
                        as={Input}
                      />

                      <div className={`auth__wrap__gdpr`}>
                        <a
                          href={`https://www.skoda-storyboard.com/cs/ochrana-osobnich-udaju/`}
                          target={`_blank`}
                        >
                          {strings[lang].auth_signup_gdpr}
                        </a>
                      </div>
                      <div
                        style={{
                          display: `flex`,
                          justifyContent: `space-between`,
                        }}
                      >
                        <Button
                          className={`btn__secondary btn__secondary--green`}
                          type={`button`}
                          handleClick={() => changeStep(0)}
                        >
                          {strings[lang].button_back}
                        </Button>
                        <Button
                          type={`submit`}
                          isLoading={isSubmitting}
                          className={`btn__primary`}
                        >
                          {strings[lang].button_send}
                        </Button>
                      </div>
                      <p className={`input__required-label`}>
                        * {strings[lang].auth_field_label_required}
                      </p>
                    </>
                  )}
                </Form>
              </div>
            </div>
          )}
        </Formik>
      </View>
    </DataContext.Provider>
  );
};

export default Signup;
