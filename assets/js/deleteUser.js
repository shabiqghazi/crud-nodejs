let buttons = document.getElementsByClassName("delete_user");
function deleteUser() {
  let id = this.getAttribute("data-id");
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      alert(JSON.parse(this.response).message);
      document.location.href = "/";
    }
  };

  xhttp.open("DELETE", `http://localhost:3000/api/users/${id}`, true);
  xhttp.send();
}
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", deleteUser);
}
