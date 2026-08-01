document.querySelectorAll("input").forEach(function (input) {
  input.addEventListener("focus", () => {
    input.classList.add("hidden-placeholder");
    input.style.outline = "none";
  });
  input.addEventListener("blur", () => {
    input.classList.remove("hidden-placeholder");
  });
});
document.forms[0].addEventListener("submit", (event) => {
  event.preventDefault();
  const phone = document.querySelectorAll("input")[0].value.trim();
  const password = document.querySelectorAll("input")[1].value.trim();
  async function fetchOnLogInServer() {
    try {
      let response = await fetch(
        "https://eduplatform-production-ecab.up.railway.app/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone,
            password,
          }),
        },
      );
      let data = await response.json();
      console.log(data.message);
      if (data.status === "fail") {
        document.querySelector(".warn").textContent =
          "من فضلك ادخل بيانات صحيحة";
        document.querySelector(".warn").style.color = "red";
      } else {
        window.location.href = "home.html";
      }
      console.log(data);
    } catch (error) {
      console.log(`error`);
    }
  }
  fetchOnLogInServer();
});
