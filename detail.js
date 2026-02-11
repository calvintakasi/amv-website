import { animeById, animeLibrary } from "./anime-data.js";

const params = new URLSearchParams(window.location.search);
const animeId = params.get("id") || animeLibrary[0].id;
const anime = animeById[animeId] || animeLibrary[0];

const detailRoot = document.getElementById("animeDetail");

function renderDetail() {
  if (!detailRoot) return;

  detailRoot.innerHTML = `
    <section class="grid gap-8 lg:grid-cols-[380px_1fr]">
      <div class="poster-glow overflow-hidden rounded-3xl border border-white/10 bg-[#0f1629] p-3">
        <img src="${anime.poster}" alt="${anime.title}" class="h-full w-full rounded-2xl object-cover" />
      </div>

      <div class="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl">
        <p class="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">${anime.status}</p>
        <h1 class="mt-4 text-4xl font-black sm:text-5xl">${anime.title}</h1>
        <p class="mt-2 text-xl text-orange-300">${anime.subtitle}</p>

        <div class="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-200">
          <span class="rounded-lg border border-white/10 bg-white/5 px-3 py-1"><i class="fa-solid fa-star mr-1 text-yellow-400"></i>${anime.rating}</span>
          <span class="rounded-lg border border-white/10 bg-white/5 px-3 py-1">${anime.year}</span>
          <span class="rounded-lg border border-white/10 bg-white/5 px-3 py-1">${anime.seasons}</span>
          <span class="rounded-lg border border-white/10 bg-white/5 px-3 py-1">${anime.duration}</span>
        </div>

        <div class="mt-6 flex flex-wrap gap-2">${anime.categories
          .map(
            (category) =>
              `<span class="rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-fuchsia-300">${category}</span>`,
          )
          .join("")}</div>

        <p class="mt-8 max-w-3xl text-base leading-relaxed text-slate-300">${anime.synopsis}</p>

        <div class="mt-8 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
          <div class="rounded-xl border border-white/10 bg-[#111a30] p-3">
            <p class="text-xs uppercase tracking-widest text-slate-500">Voice Cast</p>
            <p class="mt-1 font-semibold text-white">${anime.cast[0]}</p>
          </div>
          <div class="rounded-xl border border-white/10 bg-[#111a30] p-3">
            <p class="text-xs uppercase tracking-widest text-slate-500">Featured Talent</p>
            <p class="mt-1 font-semibold text-white">${anime.cast[1]}</p>
          </div>
          <div class="rounded-xl border border-white/10 bg-[#111a30] p-3">
            <p class="text-xs uppercase tracking-widest text-slate-500">Special Appearance</p>
            <p class="mt-1 font-semibold text-white">${anime.cast[2]}</p>
          </div>
        </div>

        <div class="mt-10 flex flex-wrap gap-3">
          <a href="${anime.streamUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-900/40 transition hover:scale-105">
            <i class="fas fa-play"></i> Start Streaming
          </a>
          <button id="watchTrailerBtn" class="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold hover:border-cyan-300 hover:text-cyan-300">
            <i class="fas fa-clapperboard"></i> ${anime.trailerLabel}
          </button>
        </div>
      </div>
    </section>

    <section class="mt-10 rounded-3xl border border-white/10 bg-[#0c1221] p-6 sm:p-8">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <h2 class="text-2xl font-black">Because you watched ${anime.title}</h2>
        <a href="index.html#explore" class="text-sm font-bold text-cyan-300 hover:text-cyan-200">Discover more →</a>
      </div>
      <p class="mt-2 text-sm text-slate-400">Curated recommendations from the AMV universe.</p>
    </section>
  `;

  const watchTrailerBtn = document.getElementById("watchTrailerBtn");
  watchTrailerBtn?.addEventListener("click", () => {
    const trailerToast = document.createElement("div");
    trailerToast.className =
      "fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-cyan-400/30 bg-[#0b1328]/95 px-4 py-3 text-sm text-white backdrop-blur-xl";
    trailerToast.textContent = `${anime.title} trailer is coming soon on AMV 🎬`;
    document.body.appendChild(trailerToast);
    setTimeout(() => trailerToast.remove(), 2600);
  });
}

renderDetail();
