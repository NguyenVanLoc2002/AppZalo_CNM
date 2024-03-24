const axiosInstance = require("./axiosInstance");
axiosInstance
  .get("/users/get/0963015348")
  .then((res) => {
    console.log(res);
    console.log(
      "==================================================================="
    );
  })
  .catch((error) => {
    console.log(error);
    console.log(
      "==================================================================="
    );
  });
