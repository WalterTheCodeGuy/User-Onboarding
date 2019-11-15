import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserOnboard = ({ values, status, errors, touched }) => {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		if (status) {
			setUsers([...users, status]);
		}
	}, [status]);

	return (

		<div className="user-form">
			
      <Form>
        <h1>New User Onboarding</h1>
        <div className='user-input'>
          <div className='form-entry'>
            <Field type="text" name="name" placeholder="Name" />
            {touched.name && errors.name && <p className="error-msg">{errors.name}</p>}
          </div>
          <div className='form-entry'>
            <Field type="text" name="email" placeholder="Email" />
            {touched.email && errors.email && (<p className="error-msg">{errors.email}</p>)}
          </div>
          <div className='form-entry'>
            <Field type="password" name="password" placeholder="Password" />
            {touched.password && errors.password && (<p className="error-msg">{errors.password}</p>)}
          </div>
          <div className='form-entry'>
            <label>
              <Field type="checkbox" name="terms" checked={values.terms} />
              {touched.terms && errors.terms && <p className="error-msg">{errors.terms}</p>}
              Sure, I read them ... NOT!
            </label>
          </div>
          <button type="submit">Submit</button>
        </div>

        <h2 className='users-title'>Users</h2>
        <div className='card-grid'>
          {users.map(user => {
          return (
            <div className='user-card' key={user.name}>
              <h2>Name: {user.name}</h2>
              <p>Email: {user.email}</p>
              <p>Password: {user.password}</p>
            </div>
          )})}
        </div>
			</Form>
		</div>
	);
};

const FormikUserOnboard = withFormik({
  mapPropsToValues({ name, email, password, terms }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      terms: terms || false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required('Must Enter a Name'),
    email: Yup.string().required('Must Enter an Email'),
    password: Yup.string().required('Must Enter a Password'),
    terms: Yup.boolean().oneOf([true], 'You Must Accept')
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post('https://reqres.in/api/users', values)
      .then(res => {
        console.log(res);
        setStatus(res.data);
      })
      .catch(err => console.log(err.res));
  }
})(UserOnboard);

export default FormikUserOnboard;

