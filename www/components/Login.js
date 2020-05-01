import Router from 'next/router';
import { useDispatch } from 'react-redux';

import Img from './Img';
import Button from './Button';

import { DataContext } from '../helpers/dataContext';
import { logUser } from '../store/actions';

const Login = () => {
  const dispatch = useDispatch();
  const { components } = React.useContext(DataContext);
  const { login: loginLabel, password: passwordLabel } = components;
  const login = `info@skoda.cz`;
  const password = `inolog19`;
  const defaultState = {
    login: { value: '', status: '' },
    password: { value: '', status: '' },
  };

  const [formState, setFormState] = React.useState(defaultState);

  if (
    formState.login.status === `correct` &&
    formState.password.status === `correct`
  ) {
    setTimeout(() => {
      dispatch(logUser(true));
    }, 300);
  }

  const handleChange = e => {
    const { id, value } = e.target;

    const handleStatus = (id, value) => {
      if (id === `login` && value.length >= login.length) {
        return login === value ? `correct` : `error`;
      } else if (id === `password` && value.length >= password.length) {
        return password === value ? `correct` : `error`;
      }
    };

    setFormState(
      Object.assign(
        {},
        {
          ...formState,
          [id]: { value: value, status: handleStatus(id, value) },
        }
      )
    );
  };

  return (
    <div className={`login`}>
      <div className={`login__input ${formState.login.status}`}>
        <label htmlFor='login'>{loginLabel}</label>
        <input
          type='text'
          id={`login`}
          value={formState.login.value}
          onChange={e => handleChange(e)}
        />
      </div>
      <div className={`login__input ${formState.password.status}`}>
        <label htmlFor='password'>{passwordLabel}</label>
        <input
          type='password'
          id={`password`}
          value={formState.password.value}
          onChange={e => handleChange(e)}
        />
      </div>
    </div>
  );
};

export default Login;
