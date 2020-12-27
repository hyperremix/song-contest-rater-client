import Auth from '@aws-amplify/auth';

export const configureAuth = () =>
  Auth.configure({
    Auth: {
      region: process.env.REACT_APP_USER_POOL_REGION,
      userPoolId: process.env.REACT_APP_USER_POOL_ID,
      userPoolWebClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID,
      mandatorySignIn: true,
    },
  });
