const environmentBackendUrls = {
  dev: "https://localhost:44360/",
  prod: "https://piba.azurewebsites.net/",
};

const environment = {
  backendUrl: environmentBackendUrls[process.env.REACT_APP_ENVIRONMENT],
};

export default environment;
