// const axios = require("axios");

const register = async (formData) => {
  // alert(email, pass);
  console.log(formData);

  try {
    const res = await axios({
      method: "POST",
      url: "/users/users",
      data: formData,
    });

    console.log(res);
  } catch (error) {
    console.log(error.response.data);
  }
};

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = {};
  formData["fullname"] = document.querySelector("#name ").value;
  formData["email"] = document.querySelector("#email").value;
  formData["password"] = document.querySelector("#password").value;
  formData["confirm_password"] =
    document.querySelector("#confirm_password").value;
  formData["gender"] =
    document.querySelector("#male").value ||
    document.querySelector("#female").value;
  formData["phone"] = document.querySelector("#phone").value;
  formData["address"] = document.querySelector(".address").value;

  register(formData);
});
