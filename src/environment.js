const environmentBackendUrls = {
  dev: "https://localhost:7012",
  prod: "https://piba.azurewebsites.net/",
};

const environment = {
  backendUrl: environmentBackendUrls[process.env.REACT_APP_ENVIRONMENT],
};

export default environment;
