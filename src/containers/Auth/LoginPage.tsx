import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { Formik } from 'formik';

import { login } from 'src/requests/auth';
import userVar from 'src/utils/cache';
import { useReactiveVar } from '@apollo/client';

function LoginPage() {
  const history = useHistory();
  const user = useReactiveVar(userVar);

  useEffect(() => user && history.push("/proposals"), [history, user]);

  return (
    <div>
      <Typography variant="body1">
        Login
      </Typography>
      <Formik
       initialValues={{ email: '', password: '' }}
       validate={values => {
         const errors: Record<string, unknown> = {};
         if (!values.email) {
           errors.email = 'Required';
         }
         if (!values.password) {
          errors.password = 'Required';
        }
         return errors;
       }}
       onSubmit={async (values, { setErrors, setSubmitting }) => {
        try {
          const response = await login({ email: values.email, password: values.password });
          if (!response) {
            throw Error('Unable to load user data');
          }
          userVar({ id: response.id, email: response.email });
          history.push("/proposals");
        } catch (e) {
          setSubmitting(false);
          console.log(e);
          setErrors({ password: 'Incorrect' });
        }
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
       }) => (
         <form onSubmit={handleSubmit}>
           <input
             type="email"
             name="email"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
           />
           {errors.email && touched.email && errors.email}
           <input
             type="password"
             name="password"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}
           />
           {errors.password && touched.password && errors.password}
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </form>
       )}
     </Formik>
    </div>
  );
}

export default LoginPage;
