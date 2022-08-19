// const axios = require("axios");

const register = async (formData) => {
  // alert(email, pass);

  try {
    const res = await axios({
      method: "POST",
      url: "/users/users",
      data: formData,
    });

    alert("Successfully register");
    window.location.replace("login");
    console.log(res);
  } catch (error) {
    if (error.response.data.Error) {
      alert(error.response.data.Error);
    } else if (error.response.data.msg) {
      alert(error.response.data.msg);
    }
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
