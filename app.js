import { animeLibrary } from "./anime-data.js";

function initNavigation() {
  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuIcon = document.getElementById("menuIcon");
  const closeIcon = document.getElementById("closeIcon");

  if (!menuButton || !mobileMenu || !menuIcon || !closeIcon) return;

  menuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    menuIcon.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");
  });

  document.querySelectorAll("#mobileMenu a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
    });
  });
}

function renderExploreCards(filteredList = animeLibrary) {
  const grid = document.getElementById("exploreGrid");
  if (!grid) return;

  grid.innerHTML = filteredList
    .map(
      (anime) => `
      <a href="detail.html?id=${anime.id}" class="group relative overflow-hidden rounded-xl bg-gray-900 aspect-[2/3] block">
        <img src="${anime.poster}" alt="${anime.title}" class="h-full w-full object-cover transition duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
        <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
        <div class="absolute bottom-0 p-4 translate-y-2 group-hover:translate-y-0 transition duration-300">
          <h4 class="font-bold text-white text-sm sm:text-base leading-tight">${anime.title}</h4>
          <p class="text-[10px] text-slate-400 mt-1 opacity-0 group-hover:opacity-100 transition duration-300 delay-75">${anime.categories.join(" • ")}</p>
        </div>
      </a>`,
    )
    .join("");
}

function initCategoryFilters() {
  const categoryContainer = document.getElementById("categoryFilters");
  if (!categoryContainer) return;

  categoryContainer.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;
      const nextList =
        category === "all"
          ? animeLibrary
          : animeLibrary.filter((anime) =>
              anime.categories.some(
                (value) => value.toLowerCase() === category.toLowerCase(),
              ),
            );

      categoryContainer.querySelectorAll("button").forEach((btn) => {
        btn.classList.remove(
          "border-cyan-400/30",
          "bg-cyan-400/10",
          "text-cyan-300",
        );
        btn.classList.add("border-white/10", "bg-white/5", "text-slate-300");
      });

      button.classList.remove(
        "border-white/10",
        "bg-white/5",
        "text-slate-300",
      );
      button.classList.add(
        "border-cyan-400/30",
        "bg-cyan-400/10",
        "text-cyan-300",
      );
      renderExploreCards(nextList);
    });
  });
}

function initStartStreaming() {
  const startStreamingBtn = document.getElementById("startStreamingBtn");
  const exploreSection = document.getElementById("explore");
  if (!startStreamingBtn || !exploreSection) return;

  startStreamingBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const topPick = animeLibrary[0];

    exploreSection.scrollIntoView({ behavior: "smooth" });

    const existingToast = document.getElementById("streamingToast");
    existingToast?.remove();

    const toast = document.createElement("div");
    toast.id = "streamingToast";
    toast.className =
      "fixed bottom-6 right-6 z-50 rounded-xl border border-cyan-400/30 bg-[#0b1328]/95 px-4 py-3 text-sm text-white shadow-2xl backdrop-blur-xl";
    toast.innerHTML = `
      <p class="font-bold text-cyan-300">Ready to stream?</p>
      <p class="text-slate-300">Starting with <span class="text-white">${topPick.title}</span> 🔥</p>
      <a href="detail.html?id=${topPick.id}" class="mt-2 inline-flex text-xs font-bold text-orange-300 hover:text-orange-200">Open detail page →</a>
    `;

    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  });
}

function initNewsletter() {
  const newsletterForm = document.getElementById("newsletterForm");
  if (!newsletterForm) return;

  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const btn = newsletterForm.querySelector("button");
    if (!btn) return;

    const originalText = btn.innerText;
    btn.innerText = "Subscribed!";
    btn.classList.add("bg-green-500", "text-white", "border-transparent");

    setTimeout(() => {
      newsletterForm.reset();
      btn.innerText = originalText;
      btn.classList.remove("bg-green-500", "text-white", "border-transparent");
    }, 3000);
  });
}

initNavigation();
renderExploreCards();
initCategoryFilters();
initStartStreaming();
initNewsletter();
