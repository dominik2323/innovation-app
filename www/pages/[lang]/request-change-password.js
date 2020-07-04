import React from 'react';
import axios from 'axios';
import absoluteUrl from '../../helpers/absoluteUrl';
import { Formik, Form, Field } from 'formik';
import Button from '../../components/Button';
import { useRouter } from 'next/router';
import strings from '../../../globals/strings';
import Input from '../../components/Input';
import Header from '../../components/Header';
import View from '../../components/View';
import { emailRegexp } from '../../helpers/consts';

const RequestChangePassword = () => {
  const [responseErrorType, setResponseErrorType] = React.useState(null);
  const [wasSend, setWasSend] = React.useState(false);
  const router = useRouter();
  const { lang } = router.query;

  const handleSubmit = async (values, actions) => {
    const baseUrl = absoluteUrl(null, 'localhost:9999');

    actions.setSubmitting(true);
    try {
      const userData = await axios.post(
        `${baseUrl}api/request-change-password?lang=${lang}`,
        {
          email: values.email,
        }
      );
      console.log(userData);
    } catch (e) {
      console.log({ e });
    }

    setWasSend(true);
    actions.setSubmitting(false);
  };

  return (
    <View>
      <Header
        descriptor={strings[lang].auth_request_change_password_page_title}
      />
      {wasSend ? (
        <div className={`auth`}>
          <div className={`auth__wrap`}>
            <div className={`auth__wrap__intro`}>
              <h1>
                {strings[lang].auth_request_change_password_success_header}
              </h1>
              <p>{strings[lang].auth_request_change_password_success_perex}</p>
            </div>
            <Button
              className={`btn__primary`}
              handleClick={() => router.push(`/[lang]/login`, `/${lang}/login`)}
            >
              {strings[lang].button_continue}
            </Button>
          </div>
        </div>
      ) : (
        <Formik
          initialValues={{
            email: '',
          }}
          validate={(values) => {
            const errors = {};

            if (!emailRegexp.test(values.email)) {
              errors.email = {
                format: strings[lang].auth_error_invalid_email_format,
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
                  <h1>{strings[lang].auth_request_change_password_header}</h1>
                  <p>{strings[lang].auth_request_change_password_perex}</p>
                </div>
                {/* {responseErrorType && (
                <div className={`auth__wrap__response-error`}>
                {strings[lang].auth.errors[responseErrorType]}
                </div>
              )} */}
                <Form>
                  <Field
                    id={`email`}
                    name={`email`}
                    type={`email`}
                    label={strings[lang].auth_field_email}
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
              </div>
            </div>
          )}
        </Formik>
      )}
    </View>
  );
};

export default RequestChangePassword;
