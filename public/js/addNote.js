const addNote = async (formData) => {
  // alert(email, pass);
  console.log(formData);

  try {
    const res = await axios({
      method: "POST",
      url: "/notes/notes",
      data: formData,
    });

    alert("Successfully Created a note");
    window.location.replace("/dashboard");
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = {};
  formData["title"] = document.querySelector(".title").value;
  formData["description"] = document.querySelector(".desc").value;
  formData["status"] = "pending";
  formData["dueDate"] = "25th of Aug, 2022";

  addNote(formData);
});
