// const axios = require("axios");

const login = async (email, password) => {
  // alert(email, pass);
  console.log(email, password);

  try {
    const res = await axios({
      method: "POST",
      url: "/users/login",
      data: {
        email,
        password,
      },
    });

    alert("Successfully Logged in");
    window.location.replace("/dashboard");
    console.log(res);
  } catch (error) {
    console.log(error.response.data);
  }
};

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.querySelector("#email ").value;
  const password = document.querySelector("#password").value;

  login(email, password);
});
