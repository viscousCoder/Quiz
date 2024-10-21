document.addEventListener("DOMContentLoaded", function () {
  let users = JSON.parse(localStorage.getItem("userDetails")) || [];
  const register = document.getElementById("register");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const phone = document.getElementById("phone");
  const college = document.getElementById("college");
  const school = document.getElementById("school");

  register.addEventListener("submit", function (e) {
    e.preventDefault();
    const gender = document.querySelector("input[name='gender']:checked");
    let user = {
      username: username.value,
      email: email.value,
      password: password.value,
      phone: phone.value,
      college: college.value,
      school: school.value,
      gender: gender.value,
    };
    console.log(
      users.find((u) => u.email === email.value),
      "hello"
    );
    if (users.find((u) => u.email === email.value)) {
      alert("Email already exists");
      return;
    }
    users.push(user);
    localStorage.setItem("userDetails", JSON.stringify(users));
    register.reset();
  });
  console.log(users, "userDetails");
});
