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

const token = window.localStorage.getItem("Token");
const id = window.localStorage.getItem("_id");
let fetchOnLectureServer = async () => {
  try {
    let response = await fetch(
      `https://eduplatform-production-ecab.up.railway.app/api/v1/courses/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.ok) {
      let data = await response.json();
      // console.log(data);
      let content = ``;
      for (let i = 0; i < data.data.data.lessons.length; i++) {
        content += `
          <div class="section-title">
            <div class="box-data">
              <span>${i + 1}</span>
              <div>
                <h3>${data.data.data.lessons[i].title}</h3>
                <p>${data.data.data.lessons[i].description}</p>
              </div>
            </div>
            <div class="buttons">
              <div>فيديو</div>
              <div>pdf</div>
              <img data-id="${data.data.data.lessons[i]._id}" src="/Images/arrow.png" loading= "lazy" alt="arrow" class="arrow">
            </div>
          </div>
          <div class="section-attachments" data-id=${data.data.data.lessons[i]._id} >
            <div class="section-video">
              <div class="box-data">
                <img  src="/Images/videoIcon.png" loading= "lazy" alt="videoIcon">
                <div>
                  <h3>فيديو المحاضرة</h3>
                  <p>الجودة HD</p>
                </div>
              </div>
              <a data-id=${data.data.data.lessons[i]._id} href="/video.html" class="video-lec" data-url=${data.data.data.lessons[i].videoUrl}>مشاهدة</a>
            </div>
            <div class="section-summary">
              <div class="box-data">
                <img src="/Images/summaryIcon.png" loading= "lazy" alt="summaryIcon">
                <div>
                  <h3>ملخص المحاضرة </h3>
                  <p> pdf.صفحات</p>
                </div>
              </div>
              <a href=${data.data.data.lessons[i].summaryPdf}>تحميل</a>
            </div>
            <div class="section-question">
              <div class="box-data">
                <img src="/Images/QuestionIcon.png" loading= "lazy" alt="QuestionIcon">
                <div>
                  <h3>اسئلة تدريبية</h3>
                  <p> صفحات pdf</p>
                </div>
              </div>
              <a href="">تحميل</a>
            </div>
            <div class="section-solve">
              <div class="box-data">
                <img src="/Images/solveIcon.png" loading= "lazy" alt="solveIcon">
                <div>
                  <h3>حل اسئلة</h3>
                  <p> صفحات pdf</p>
                </div>
              </div>
              <a href="">تحميل</a>
            </div>
          </div>
        `;
      }

      document.body.children[1].innerHTML = `
        <div class="top-section">
          <div class="box-info">
            <h1>${data.data.data.title}</h1>
            <p>${data.data.data.description}</p>
            <div class="data">
              <div>
                <div class="num">${data.data.data.num_lec}</div>
                <div class="title">المحاضرات</div>
              </div>
              <div>
                <div class="num">${data.data.data.num_Video}</div>
                <div class="title">فيديو</div>
              </div>
              <div>
                <div class="num">0</div>
                <div class="title">اختبار</div>
              </div>
              <div>
                <div class="num">0</div>
                <div class="title">مدة المحتوى</div>
              </div>
            </div>
          </div>
          <div class="video">
            <video
              
              src=""
              controls
              muted
              preload="metadata"
              playsinline>
            </video>
            <p>الفيديو التعريفى</p>
          </div>
        </div>
        <h2>
          محاضرات الباب
        </h2>
        <div class="container">
            ${content}
        </div>
      `;

      document.querySelectorAll(".arrow").forEach((arrow) => {
        arrow.addEventListener("click", (_) => {
          document
            .querySelectorAll(".section-attachments")
            .forEach((section) => {
              if (arrow.dataset.id == section.dataset.id) {
                section.classList.toggle("hidden");
                arrow.classList.toggle("rotate");
              }
            });
        });
      });
      document.querySelectorAll(".video-lec").forEach((a) => {
        a.addEventListener("click", (_) => {
          window.localStorage.setItem("videoUrl", a.dataset.url);
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

fetchOnLectureServer();
