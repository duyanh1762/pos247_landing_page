const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-menu-mobile");

function goApp() {
  window.open("https://web.pos247.app", "_blank");
}

function goTutorial() {
  window.open("https://pos247.app/docs/index.html", "_blank");
}

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});
const swiper = new Swiper(".mySwiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    576: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    992: {
      slidesPerView: 1,
      spaceBetween: 40,
    },
  },
});
const canvas = document.getElementById("particle-bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.outerHeight;

let particles = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  particles = [];
  for (let i = 0; i < window.innerWidth / 10; i++) {
    particles.push(new Particle());
  }
}

function connect() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      let dx = particles[a].x - particles[b].x;
      let dy = particles[a].y - particles[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 120) {
        ctx.strokeStyle = "rgba(255,255,255,0.2)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(15,43,70,0.3)"; // nền mờ giữ hiệu ứng
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  connect();
  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

const navbar = document.getElementsByClassName("navbar")[0];
const popupZalo = document.getElementsByClassName("popup-zalo")[0];
const popupPhone = document.getElementsByClassName("popup-phone")[0];

window.addEventListener("scroll", () => {
  if (window.scrollY >= window.innerHeight) {
    navbar.classList.add("scrolled");
    navMenu.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
    navMenu.classList.remove("scrolled");
  }

  if (window.scrollY >= 2 * window.innerHeight) {
    popupPhone.classList.add("show-popup");
    popupZalo.classList.add("show-popup");
  }
});

document.querySelectorAll(".nav-menu-mobile .smooth").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    navMenu.classList.remove("show");
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

document.querySelectorAll(".nav-menu .smooth").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    navMenu.classList.remove("show");
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

function formatCurrencyVND(amount) {
  return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

fetch("https://pos247.app/plans", { method: "GET" })
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    data = data.filter((p) => {
      return p.Schema === "outlet";
    });
    let contentHTML = "";
    data.forEach((p) => {
      if (p.Price === 1799000) {
        p.Gift = "Tặng thêm 30 ngày sử dụng";
        p.PerDay = Math.round(p.Price / 210);
        contentHTML =
          contentHTML +
          ` <div class="pricing-card">
                <h3>${p.Name}</h3>
                <p class="price">${formatCurrencyVND(p.Price)}</p>
                <p class="per-day">Chỉ ${formatCurrencyVND(p.PerDay)} / ngày</p>
                <p class="discount"> Tiết kiệm 14%</p>
                <ul>
                <li class="sale">
                    <i class="fa-solid fa-fire-flame"></i> Ưu đãi đặc biệt: ${
                      p.Gift
                    }
                  </li>

                  <li>
                    <i class="fa-regular fa-circle-check"></i> Trải
                    nghiệm full chức năng
                  </li>
                  <li>
                    <i class="fa-regular fa-circle-check"></i>${p.Description}
                  </li>
                  <li>
                    <i class="fa-regular fa-circle-check"></i> Hỗ trợ kỹ thuật
                    24/7 trong suốt quá trình sử dụng
                  </li>
                </ul>
                <a href="#" class="btn" onclick="goApp()">Đăng ký</a>
              </div>`;
      } else if (p.Price === 3599000) {
        p.Gift = "Tặng thêm 90 ngày sử dụng";
        p.PerDay = Math.round(p.Price / 450);
        contentHTML =
          contentHTML +
          ` <div class="pricing-card">
                <h3>${p.Name}</h3>
                <p class="price">${formatCurrencyVND(p.Price)}</p>
                <p class="per-day">Chỉ ${formatCurrencyVND(p.PerDay)} / ngày</p>
                <p class="discount">Tiết kiệm 20%</p>
                <ul>
                <li class="sale">
                    <i class="fa-solid fa-fire-flame"></i> Ưu đãi đặc biệt: ${
                      p.Gift
                    }
                  </li>

                  <li>
                    <i class="fa-regular fa-circle-check"></i> Trải
                    nghiệm full chức năng
                  </li>
                  <li>
                    <i class="fa-regular fa-circle-check"></i>${p.Description}
                  </li>
                  <li>
                    <i class="fa-regular fa-circle-check"></i> Hỗ trợ kỹ thuật
                    24/7 trong suốt quá trình sử dụng
                  </li>
                </ul>
                <a href="#" class="btn" onclick="goApp()">Đăng ký</a>
              </div>`;
      } else {
        p.PerDay = Math.round(p.Price / 30);
        contentHTML =
          contentHTML +
          ` <div class="pricing-card">
                <h3>${p.Name}</h3>
                <p class="price">${formatCurrencyVND(p.Price)}</p>
                <p class="per-day">Chỉ ${formatCurrencyVND(p.PerDay)} / ngày</p>
                <ul>
                  <li>
                    <i class="fa-regular fa-circle-check"></i> Trải
                    nghiệm full chức năng
                  </li>
                  <li>
                    <i class="fa-regular fa-circle-check"></i>${p.Description}
                  </li>
                  <li>
                    <i class="fa-regular fa-circle-check"></i> Hỗ trợ kỹ thuật
                    24/7 trong suốt quá trình sử dụng
                  </li>
                </ul>
                <a href="#" class="btn" onclick="goApp()">Đăng ký</a>
              </div>`;
      }
    });

    document.querySelector(".pricing-container").innerHTML =
      document.querySelector(".pricing-container").innerHTML + contentHTML;
  });
