import React from 'react';
import { Formik, Field, Form } from 'formik';
import Input from '../../components/Input';
import strings from '../../../globals/strings';
import Router, { useRouter } from 'next/router';
import Button from '../../components/Button';
import { emailRegexp, passwordRegexp } from '../../helpers/consts';
import Scrollbar from '../../components/Scrollbar';
import Header from '../../components/Header';
import View from '../../components/View';
import axios from 'axios';
import absoluteUrl from '../../helpers/absoluteUrl';
import { useViewportDimensions } from '../../hooks/useViewportDimensions';
import AuthSuccess from '../../components/AuthSuccess';
import Link from '../../components/Link';

const Signup = () => {
  const router = useRouter();
  const baseUrl = absoluteUrl(null, 'localhost:9999');
  const { lang } = router.query;

  const [signupResponse, setSignupResponse] = React.useState({
    status: null,
    error: null,
    token: '',
  });

  const [resendEmailResponse, setResendEmailResponse] = React.useState({
    status: null,
    error: null,
    payload: '',
  });

  const { w, h } = useViewportDimensions();

  const resendEmail = async () => {
    try {
      const res = await axios.post(`${baseUrl}api/resend-email?lang=${lang}`, {
        token: signupResponse.token,
      });
      setResendEmailResponse({
        status: res.status,
        payload: res.data,
        error: null,
      });
    } catch (e) {
      console.log({ e });
      setResendEmailResponse({
        status: e.status,
        error: e.response.data.message,
        payload: null,
      });
    }
  };

  const handleSubmit = async ({ email, company, name, password }, actions) => {
    actions.setSubmitting(true);

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
        error: e.response.data.payload,
        status: e.response.data.status,
        token: null,
      });
    }
  };

  if (!!signupResponse.error) {
    return (
      <AuthSuccess
        error={resendEmailResponse.error}
        status={resendEmailResponse.payload}
        perex={strings[lang].auth_login_success_perex}
        header={strings[lang].auth_login_success_header}
        buttonText={strings[lang].button_continue}
        redirectTo={() => router.push(`/[lang]/login`, `/${lang}/login`)}
      >
        <Link handleClick={resendEmail}>
          {strings[lang].auth_login_success_resend_email}
        </Link>
      </AuthSuccess>
    );
  }
  return (
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

          if (values.name.length === 0) {
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
        {({ errors, isSubmitting }) => (
          <div className={`auth`}>
            <div className={`auth__wrap`}>
              <Scrollbar
                style={{ height: w <= 1200 ? '100%' : h - 60 - 60 - 60 }}
                scrollTop={!!signupResponse && 0}
                vTrackStyle={{ right: -15 }}
              >
                <div className={`auth__wrap__intro`}>
                  <h1>{strings[lang].auth_signup_header}</h1>
                  <>{strings[lang].auth_signup_perex}</>
                </div>
                {!!signupResponse.error && (
                  <div className={`auth__wrap__response-error`}>
                    {strings[lang][`auth_error_${signupResponse.error}`]}
                  </div>
                )}
                <Form>
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
                  <Button
                    type={`submit`}
                    isLoading={isSubmitting}
                    className={`btn__primary`}
                  >
                    {strings[lang].button_send}
                  </Button>
                </Form>
              </Scrollbar>
            </div>
          </div>
        )}
      </Formik>
    </View>
  );
};

export default Signup;
