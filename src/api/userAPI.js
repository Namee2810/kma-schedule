const { default: axiosClient } = require("./axiosClient");

const userAPI = {
  login: (params) => {
    const url = "/login";
    return axiosClient.post(url, params);
  },
};

export default userAPI;