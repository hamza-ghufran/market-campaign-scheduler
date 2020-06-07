let currentEnv = process.env.NODE_ENV;

let envApiConfg = {
  default: {
    core: {
      baseUrl: "http://localhost:3002",
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }
};

let apiConfig = envApiConfg[currentEnv];
if (!apiConfig) apiConfig = envApiConfg.default;

const _apiConfig = apiConfig;
export { _apiConfig as apiConfig };
