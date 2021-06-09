/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useApolloClient, useReactiveVar } from '@apollo/client';
import {
  Box, Button, experimentalStyled as styled, Paper, TextField, Typography,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';

import { login } from 'src/requests/auth';
import { userVar } from 'src/utils/cache';
import Css from 'src/utils/css';
import Logo from 'src/components/Logo';
import { createLink } from 'src/App';

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
  },
}));

export default function LoginPage() {
  const [error, setError] = useState('');
  const history = useHistory();
  const user = useReactiveVar(userVar);
  const { t } = useTranslation();
  const client = useApolloClient();

  useEffect(() => user && history.push('/jobs'), [history, user]);

  return (
    <Paper square sx={containerStyles}>
      <Box p={3} justifyContent="center" display="flex" alignContent="center" bgcolor="#1b2a49">
        <Logo />
      </Box>
      <Typography sx={titleStyles}>
        {t('main:loginTitle')}
      </Typography>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            if (!values.email || !values.password) {
              throw Error(t('main:loginError'));
            }
            const response = await login({ email: values.email, password: values.password });
            if (!response) {
              throw Error(t('main:loginError'));
            }
            const { token, ...userData } = response.data;
            localStorage.setItem('uToken', token);
            client.setLink(createLink());
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
              label={t('main:email')}
              variant="standard"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              required
            />
            <TextField
              label={t('main:password')}
              variant="standard"
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              required
            />
            <Button variant="contained" type="submit" disabled={isSubmitting} sx={buttonStyles} disableElevation>
              {t('main:signIn')}
            </Button>
            {error && <Typography color="error" sx={{ paddingTop: 2 }}>{error}</Typography>}
          </StyledForm>
        )}
      </Formik>
    </Paper>
  );
}
