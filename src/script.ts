// Theme toggle
export function toggleTheme() {
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
export function toggleMenu() {
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

// Contact form
export function handleSubmit(e: FormDataEvent) {
  e.preventDefault();
  const btn = document.getElementById("submitBtn");
  if (btn) {
    btn.innerHTML = "✅ Message Sent!";
    btn.style.background = "linear-gradient(135deg,#00d4aa,#00a67a)";
    btn.style.boxShadow = "0 8px 28px rgba(0,212,170,0.3)";
    setTimeout(() => {
      btn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message`;
      btn.style.background = "";
      btn.style.boxShadow = "";
      const form = e.currentTarget as HTMLFormElement;
      form.reset();
    }, 3000);
  }
}
