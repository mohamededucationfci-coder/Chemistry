window.addEventListener("resize", () => {
  if (window.innerWidth <= 576) {
    document.querySelector(".section-two").style.display = "none";
  } else {
    document.querySelectorAll("button")[0].style.display = "none";
    document.querySelector(".section-two").style.display = "grid";
  }
});

window.addEventListener("load", () => {
  if (window.innerWidth <= 576) {
    document.querySelector(".section-two").style.display = "none";
  } else {
    document.querySelectorAll("button")[0].style.display = "none";
    document.querySelector(".section-two").style.display = "grid";
  }
});

document.querySelectorAll("button")[0].addEventListener("click", () => {
  document.querySelector(".container-data").style.display = "none";
  document.querySelector(".section-two").style.display = "grid";
});

document.querySelectorAll("input").forEach(function (input) {
  input.addEventListener("focus", () => {
    input.classList.add("hidden-placeholder");
    input.style.outline = "none";
  });
  input.addEventListener("blur", () => {
    input.classList.remove("hidden-placeholder");
  });
});

let grade = "";
document.querySelectorAll(".grade").forEach(function (element) {
  element.onclick = function () {
    grade = element.textContent.trim();
  };
});

document.forms[0].addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelectorAll("input")[0].value.trim();
  const fullname = document.querySelectorAll("input")[1].value.trim();
  const phone = document.querySelectorAll("input")[2].value.trim();
  const password = document.querySelectorAll("input")[3].value.trim();
  const confirmPassword = document.querySelectorAll("input")[4].value.trim();
  if (name == "") {
    document.querySelector(".error-name").innerHTML =
      `من فضلك قم ب ادخال الاسم`;
    document.querySelector(".error-name").style.color = "red";
    return;
  } else {
    document.querySelector(".error-name").innerHTML = "";
  }
  if (phone == "") {
    document.querySelector(".error-phone").innerHTML =
      "من فضلك ادخل رقم الهاتف";
    document.querySelector(".error-phone").style.color = "red";
    return;
  } else {
    document.querySelector(".error-phone").innerHTML = "";
  }
  if (!/^01[0125][0-9]{8}$/gi.test(phone)) {
    document.querySelector(".error-phone").innerHTML = `ادخل رقم صحيح`;
    document.querySelector(".error-phone").style.color = "red";

    return;
  } else {
    document.querySelector(".error-phone").innerHTML = "";
  }
  if (password == "") {
    document.querySelector(".password").innerHTML = "من فضلك ادخل الباسورد";
    document.querySelector(".password").style.color = "red";
    return;
  } else {
    document.querySelector(".password").innerHTML = "";
  }
  if (password != confirmPassword) {
    document.querySelector(".error-password").innerHTML =
      `كلمة المرور غير متطابقه`;
    document.querySelector(".error-password").style.color = "red";

    return;
  } else {
    document.querySelector(".error-password").innerHTML = "";
  }
  if (grade === "الصف الاول الثانوى") {
    grade = "6a627986653db7eba98c97d5";
  } else if (grade === "الصف الثانى الثانوى") {
    grade = "6a627986653db7eba98c97d5";
  } else {
    grade = "6a627925653db7eba98c97cf";
  }
  async function fetchOnRegisterServer() {
    try {
      let response = await fetch(
        "https://eduplatform-production-ecab.up.railway.app/api/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            fullname,
            phone,
            password,
            confirmPassword,
            grade,
          }),
        },
      );
      let data = await response.json();
      console.log(data);
      if (data.status === "success") {
        window.localStorage.setItem("Token", data.token);
        window.location.href = "HTML/home.html";
      }
    } catch (error) {
      console.log(`error`);
    }
  }
  fetchOnRegisterServer();
});
