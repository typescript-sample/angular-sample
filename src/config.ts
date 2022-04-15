export const config = {
  authentication_url: 'http://localhost:8083',
  password_url: 'http://localhost:8083',
  signup_url: 'http://localhost:8083',

  user_url: 'http://localhost:8083/users',
  role_url: 'http://localhost:8083/roles',
  privilege_url: 'http://localhost:8082/privileges',
  myprofile_url: 'http://localhost:8082/my-profile'
};

export const env = {
  sit: {
    authentication_url: 'http://10.1.0.234:3003'
  },
  deploy: {
    authentication_url: '/server'
  }
};
export default config;
