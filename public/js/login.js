// const axios = require("axios");
const errorElement = document.querySelector(".error-msg");
const errorMsg = (msg) => {
  errorElement.innerHTML = msg;
};

const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/users/login",
      data: {
        email,
        password,
      },
    });

    // alert("Successfully Logged in");
    errorMsg("");
    window.location.replace("/dashboard");
  } catch (error) {
    errorMsg(error.response.data?.Error || error.response.data?.message);
    // alert(error.response.data?.Error || error.response.data.message);
    console.log(error);
  }
};

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.querySelector("#email ").value;
  const password = document.querySelector("#password").value;

  login(email, password);
});
