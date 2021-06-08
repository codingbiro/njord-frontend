import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { Box, Button, experimentalStyled as styled, Paper, TextField, Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';

import { login } from 'src/requests/auth';
import { userVar } from 'src/utils/cache';
import Css from 'src/utils/css';
import Logo from 'src/components/Logo';

const containerStyles: Css = {
  backgroundColor: 'rgba(255, 255, 255, 0.75)',
  height: 'max-content',
  alignSelf: 'center',
  textAlign: 'center',
};

const titleStyles: Css = {
  color: '#1b2a49',
  paddingTop: 3,
  fontSize: '30px',
};

const buttonStyles: Css = {
  backgroundColor: '#f6cc51',
  textTransform: 'none',
  borderRadius: '0',
  marginTop: 3,
  fontSize: '25px',
  '&:hover': {
    backgroundColor: '#bd9110',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgb(0, 0, 0)',
  },
};

const StyledForm = styled(Form)(() => ({
  padding: '24px',
  marginTop: '12px',
  minWidth: '300px',
  display: 'flex',
  flexDirection: 'column',
  '& .MuiInput-input': {
    padding: '4px',
  }
}));

export default function LoginPage() {
  const [error, setError] = useState('');
  const history = useHistory();
  const user = useReactiveVar(userVar);

  useEffect(() => user && history.push('/jobs'), [history, user]);

  return (
    <Paper square sx={containerStyles}>
      <Box p={3} justifyContent="center" display="flex" alignContent="center" bgcolor="#1b2a49">
        <Logo />
      </Box>
      <Typography sx={titleStyles}>
        Company Login
      </Typography>
      <Formik
       initialValues={{ email: '', password: '' }}
       onSubmit={async (values, { setSubmitting }) => {
        try {
          if (!values.email || !values.password) {
            throw Error('Invalid email or password.');
          }
          const response = await login({ email: values.email, password: values.password });
          if (!response) {
            throw Error('Invalid email or password.');
          }
          const { token, ...userData } = response.data;
          localStorage.setItem('uToken', token);
          userVar(userData);
          history.push('/jobs');
        } catch (e) {
          setSubmitting(false);
          setError(e.message);
        }
       }}
     >
       {({
         values,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
       }) => (
         <StyledForm onSubmit={handleSubmit}>
           <TextField
             label="Email"
             variant="standard"
             type="email"
             name="email"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
             required
           />
           <TextField
             label="Password"
             variant="standard"
             type="password"
             name="password"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}
             required
           />
           <Button variant="contained" type="submit" disabled={isSubmitting} sx={buttonStyles} disableElevation>
             Sign In
           </Button>
           {error && <Typography color="error" sx={{ paddingTop: 2 }}>{error}</Typography>}
         </StyledForm>
       )}
     </Formik>
    </Paper>
  );
}
