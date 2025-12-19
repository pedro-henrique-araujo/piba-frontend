const environmentBackendUrls = {
  dev: "http://localhost:5218/",
  prod: "https://piba.azurewebsites.net/",
};

const environment = {
  backendUrl: environmentBackendUrls[process.env.REACT_APP_ENVIRONMENT],
};

export default environment;
