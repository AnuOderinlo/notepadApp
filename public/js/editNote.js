const editNote = async (formData) => {
  // alert(email, pass);
  console.log(formData);
  const id = document.querySelector(".id").value;

  try {
    const res = await axios({
      method: "PUT",
      url: `/notes/notes/${id}`,
      data: formData,
    });

    alert("Successfully Updated a note");
    window.location.replace("/dashboard");
    // console.log(res);
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

  editNote(formData);
});
