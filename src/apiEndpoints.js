const apiRootUrl = import.meta.env.VITE_BACKEND_ROOT_URL || '/api';
const apiConfig = () => {
  const apiRoutesURLS = {
    SUPPORTED_LANGUAGES: `${apiRootUrl}/piston/runtime`,
    EXECUTE_CODE: `${apiRootUrl}/piston/execute`,
  };
  const GET_REQUESTINFO = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const POST_REQUESTINFO = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return { apiRoutesURLS, GET_REQUESTINFO, POST_REQUESTINFO };
};

export default apiConfig
