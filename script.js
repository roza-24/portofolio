// Drawer controls
const openBtn = document.getElementById("openMenu");
const closeBtn = document.getElementById("closeMenu");
const drawer = document.getElementById("mobileDrawer");
const backdrop = document.getElementById("backdrop");

function openDrawer() {
  drawer.hidden = false;
  backdrop.hidden = false;
  openBtn?.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}
function closeDrawer() {
  drawer.hidden = true;
  backdrop.hidden = true;
  openBtn?.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

openBtn?.addEventListener("click", openDrawer);
closeBtn?.addEventListener("click", closeDrawer);
backdrop?.addEventListener("click", closeDrawer);

document.querySelectorAll(".mobile-menu .link").forEach(a => {
  a.addEventListener("click", closeDrawer);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !drawer.hidden) closeDrawer();
});

// Active link (desktop) + update hash
const desktopLinks = Array.from(document.querySelectorAll(".menu.desktop .link"));
const sections = desktopLinks
  .map(a => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    desktopLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
    history.replaceState(null, "", `#${id}`);
  });
}, { rootMargin: "-50% 0px -45% 0px", threshold: 0.01 });

sections.forEach(sec => observer.observe(sec));