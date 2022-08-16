// const axios = require("axios");

const logout = async () => {
  // alert(email, pass);

  try {
    const res = await axios({
      method: "GET",
      url: "/users/logout",
    });

    alert("Successfully Logged out");
    window.location.replace("/login");
    // console.log(res);
  } catch (error) {
    console.log(error.response.data);
  }
};

document.querySelector("#logout").addEventListener("click", (e) => {
  e.preventDefault();
  logout();
});
