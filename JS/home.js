const token = window.localStorage.getItem("Token");
if (!token) {
  window.location.href = "login.html";
}

async function addHeader() {
  let response = await fetch("Components/head.html");
  let header = await response.text();
  document.body.firstElementChild.innerHTML = header;
  if (window.innerWidth >= 577 && window.innerWidth <= 768) {
    document.querySelector(".hamburger").addEventListener("click", function () {
      document.querySelector(".aside").classList.toggle("hidden");
    });
  }
}
addHeader();

if (true) {
  document.querySelectorAll(".box").forEach((box) => {
    box.addEventListener("click", function () {
      document.querySelectorAll(".box").forEach((b) => {
        b.classList.remove("style");
      });
      this.classList.add("style");
      if (this.id === `main`) {
        async function fetchOnMainFile() {
          try {
            let response = await fetch("main.html");
            let data = await response.text();
            document.body.children[1].innerHTML = data;
            await fetchOnHomeServer();
            await fetchOnLastVedioServer();
          } catch (error) {
            console.log(error);
          }
        }
        fetchOnMainFile();
      } else if (this.id === `lessons`) {
        async function fetchOnCoursesServer() {
          try {
            let response = await fetch(
              "https://eduplatform-production-ecab.up.railway.app/api/v1/courses",
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );
            if (!response.ok) {
              throw new Error("Failed to fetch homepage");
            }
            let data = await response.json();
            let container = document.createElement("div");
            container.className = "courses-container";
            for (let i = 1; i < data.data.data.length; i++) {
              container.innerHTML += `
                  <div class="card">
                    <img src=${data.data.data[i].thumbnail} alt="this is img of courses" loading="lazy"></img>
                    <h3>${data.data.data[i].title}</h3>
                    <p>${data.data.data[i].description}</p>
                    <button id=${data.data.data[i]._id} class="btn-enter">الدخول للكورس</button>
                </div>
          `;
            }
            document.body.children[1].innerHTML = ``;
            document.body.children[1].appendChild(container);
            document.querySelectorAll(".btn-enter").forEach((ele) => {
              ele.addEventListener("click", () => {
                window.location.href = `/lecture.html`;
                window.localStorage.setItem("_id", ele.id);
              });
            });
          } catch (error) {
            console.log(error);
          }
        }
        fetchOnCoursesServer();
      } else {
        window.location.href = "login.html";
      }
    });
  });
}

async function fetchOnHomeServer() {
  try {
    let response = await fetch(
      "https://eduplatform-production-ecab.up.railway.app/api/v1/user/homepage",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error("Failed to fetch homepage");
    }
    let data = await response.json();
    //data of fisrt section in main
    document.querySelector(".section-one").innerHTML = `
      <h1 class="hello">${data.data.welcomeMessage}</h1>
      <p class="support">استمر في التعلم وحقق أعلى الدرجات في الكيمياء</p>
      <div class="date">
        <img src="Images/calendar-01.png" alt="calendar" loading="lazy" />
      </div>
    `;

    const days = [
      "الأحد",
      "الاثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ];

    const months = [
      "يناير",
      "فبراير",
      "مارس",
      "ابريل",
      "مايو",
      "يونيه",
      "يوليو",
      "اغسطس",
      "سبتمبر",
      "اكتوبر",
      "نوفمبر",
      "ديسمبر",
    ];
    let dateNow = new Date();
    let dayName = days[dateNow.getDay()];
    let monthName = months[dateNow.getMonth()];
    let day = dateNow.getDate();

    document.querySelector(".date").innerHTML +=
      `${dayName} , ${day} ${monthName}`;

    //data of second section in main
    let getSectionTwo = document.querySelector(".section-two");
    getSectionTwo.innerHTML = `
    <div class="present">
      <div class="present-value">%${Math.round((parseInt(data.data.stats.completedLessons) / parseInt(data.data.stats.totalLessons)) * 100)} </div>
      <div class="present-info">
        <div>تقدمك فى المنهج</div>
        <div> أكملت ${parseInt(data.data.stats.completedLessons)} من ${parseInt(data.data.stats.totalLessons)} محاضرة حتى الآن. رائع!</div>
        <div>${parseInt(data.data.stats.remainingLessons)} محاضرة متبقية</div>
      </div>
    </div>
    <div class="button">اكمل التقدم</div>`;

    // data of section three in main
    let getSectionThree = document.querySelector(".section-three");
    getSectionThree.innerHTML = `
    <div class="card">
      <div class="logo">
        <img src="Images/book-icon.png" alt="book-icon" loading="lazy" />
      </div>
      <div class="info">
        <div class="number" style="color: #2E90FA">${data.data.stats.totalLessons}</div>
        <div class="title">جميع محاضرات</div>
      </div>
    </div>
    <div class="card">
      <div class="logo">
        <img src="Images/clock-Icon.png" alt="clock-Icon" loading="lazy" />
      </div>
      <div class="info">
        <div class="number" style="color: #F79009">${data.data.stats.comingSoonLessons}</div>
        <div class="title">محاضرات متبقية</div>
      </div>
    </div>
    <div class="card">
      <div class="logo">
        <img src="Images/warn-Icon.png" alt="warn-Icon" loading="lazy" />
      </div>
      <div class="info">
        <div class="number" style="color: #F04438;">${data.data.stats.remainingLessons}</div>
        <div class="title">محاضرات متأخرة</div>
      </div>
    </div>
    <div class="card">
      <div class="logo">
        <img src="Images/done-icon.png" alt="done-icon" loading="lazy" />
      </div>
      <div class="info">
        <div class="number" style="color: #17B26A">${data.data.stats.completedLessons}</div>
        <div class="title">محاضرات منتهية</div>
      </div>
    </div>
    `;
    // data of section four in main
    const ctx = document.getElementById("chart");

    const gradient = ctx.getContext("2d").createLinearGradient(0, 0, 0, 400);

    gradient.addColorStop(0, "rgba(37,99,235,.25)");
    gradient.addColorStop(1, "rgba(37,99,235,0)");
    // face data
    let arr = [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50];
    new Chart(ctx, {
      type: "line",

      data: {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],

        datasets: [
          {
            data: arr,

            borderColor: "#1463ff",

            borderWidth: 4,

            tension: 0.15,
            cubicInterpolationMode: "monotone",

            fill: true,

            backgroundColor: gradient,

            pointRadius: 7,

            pointHoverRadius: 9,

            pointBorderWidth: 3,

            pointBorderColor: "#fff",

            // This section needs color adjustments to better match the student's grade.
            pointBackgroundColor: [
              "#ef4444",
              "#ef4444",
              "#f59e0b",
              "#22c55e",
              "#22c55e",
              "#22c55e",
              "#22c55e",
            ],
          },
        ],
      },

      options: {
        responsive: true,
        devicePixelRatio: window.devicePixelRatio,

        plugins: {
          legend: {
            display: false,
          },

          tooltip: {
            enabled: true,
          },

          annotation: {
            annotations: {
              average: {
                type: "line",

                yMin: 80,

                yMax: 80,

                borderColor: "#f59e0b",

                borderDash: [8, 8],

                borderWidth: 2,
              },
            },
          },
        },

        scales: {
          x: {
            grid: {
              display: false,
            },

            ticks: {
              display: false,
            },

            border: {
              display: false,
            },
          },

          y: {
            position: "right",

            min: 50,

            max: 100,

            ticks: {
              font: {
                family: "Cairo",
                size: 14, // حجم الخط
                weight: "bold",
              },
              stepSize: 10,
              callback: (value) => value + "%",
            },

            grid: {
              display: false,
            },

            border: {
              display: false,
            },
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}
fetchOnHomeServer();

async function fetchOnLastVedioServer() {
  try {
    let response = await fetch(
      "https://eduplatform-production-ecab.up.railway.app/api/v1/lessons",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error("Failed to fetch homepage");
    }
    // data of section five in main
    let data = await response.json();
    const getCardsSection = document.querySelector(".cards");
    let addData = ``;
    for (let i = 0; i < data.data.data.length; i++) {
      addData += `
        <div class="container">
          <video
            src="${data.data.data[i].videoUrl}"
            controls
            muted
            preload="metadata"
            playsinline>
          </video>
          <h3>${data.data.data[i].title}</h3>
          <p>${data.data.data[i].description}</p>
          <button>اضغط للمشاهده</button>
        </div>
      `;
    }
    getCardsSection.innerHTML = addData;
  } catch (error) {
    console.log(error);
  }
}
fetchOnLastVedioServer();
