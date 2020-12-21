import Auth from '@aws-amplify/auth';

export const configureAuth = () =>
  Auth.configure({
    Auth: {
      region: 'eu-central-1',
      userPoolId: 'eu-central-1_24TO8Cojf',
      userPoolWebClientId: '10f2a9mlcpljghbm16fe6k79oj',
      mandatorySignIn: true,
    },
  });
