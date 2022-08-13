const deleteNote = async () => {
  // alert(email, pass);
  // console.log(formData);
  const id = document.querySelector(".id").value;

  try {
    const res = await axios({
      method: "DELETE",
      url: `/notes/notes/${id}`,
      // data: formData,
    });

    alert("Successfully deleted a note");
    window.location.replace("/dashboard");
    // console.log(res);
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("load", (e) => {
  e.preventDefault();

  deleteNote();
});

alert("ARe you sure you want to delete");
