import emailjs from "@emailjs/browser";
const PUBLIC_KEY = "AYacM1JntVef17n26";
const SERVICE_ID = "service_ywce2re";
const TEMPLATE_ID = "template_5e71i54";

emailjs.init({
  publicKey: PUBLIC_KEY,
});
// Theme toggle
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
}
function toggleTheme() {
  const html = document.documentElement;
  const dark = html.classList.toggle("dark");
  const tiElement = document.getElementById("ti");
  if (tiElement) {
    tiElement.textContent = dark ? "☀️" : "🌙";
  }
  const tlElement = document.getElementById("tl");
  if (tlElement) {
    tlElement.textContent = dark ? "Light" : "Dark";
  }
}

// Mobile menu
const menuBtn = document.getElementById("menuToggle");
if (menuBtn) {
  menuBtn.addEventListener("click", toggleMenu);
}

function toggleMenu() {
  const m = document.getElementById("mobileMenu");

  m?.classList.toggle("hidden");
}

export function closeMenu() {
  document.getElementById("mobileMenu")?.classList.add("hidden");
}

// Scroll reveal
const reveals = document.querySelectorAll(".reveal");
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
);
reveals.forEach((el) => obs.observe(el));

// Active nav links
const sections = document.querySelectorAll("section[id]");
export const navLinks = document.querySelectorAll(".nav-a");
window.addEventListener("scroll", () => {
  const y = window.scrollY + 100;
  sections.forEach((s) => {
    const top = (s as HTMLDivElement).offsetTop,
      bottom = top + (s as HTMLDivElement).offsetHeight;
    const id = s.getAttribute("id");
    const link = document.querySelector(`.nav-a[href="#${id}"]`);
    if (link) link.classList.toggle("active", y >= top && y < bottom);
  });
});

// const scrollToTopBtn = document.getElementById("scrollToTop");
// window.addEventListener("scroll", () => {
//   if (scrollToTopBtn) {
//     scrollToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
//   }
// });
// export function scrollToTop() {
//   window.scrollTo({ top: 0, behavior: "smooth" });
// }

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", handleSubmit);
}

// Contact form
export function handleSubmit(e: Event) {
  e.preventDefault();
  const btn = document.getElementById("submitBtn");
  if (btn) {
    btn.innerHTML = "✅ Message Sent!";
    btn.style.background = "linear-gradient(135deg,#00d4aa,#00a67a)";
    btn.style.boxShadow = "0 8px 28px rgba(0,212,170,0.3)";

    // send email using EmailJS
    const form = contactForm as HTMLFormElement;
    const formData = new FormData(form);
    const data: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    // console.log(data);
    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, {
        title: "New message from portfolio contact form",
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        subject: data.subject,
        message: data.message,
      })
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (error) => {
          console.log("FAILED...", error);
        },
      )
      .finally(() => {
        setTimeout(() => {
          btn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message`;
          btn.style.background = "";
          btn.style.boxShadow = "";
          form.reset();
        }, 3000);
      });
    // emailjs.send("service_id", "template_id", data, "user_id").then(
    //   (response) => {
    //     console.log("SUCCESS!", response.status, response.text);
    //   },
    //   (error) => {
    //     console.error("FAILED...", error);
    //   },
    // );
  }
}
