// Atlas Travel — projeto demonstrativo de portfólio.
// Preços ilustrativos em reais, por pessoa, para uma viagem-base de 7 dias.
const destinations = [
  {
    id: 1,
    city: "Santorini",
    country: "Grécia",
    continent: "Europa",
    price: 12900,
    badge: "ROMÂNTICO",
    days: 7,
    climate: "Mediterrâneo",
    image: "photo-1613395877344-13d4a8e0d49e",
    description:
      "Casas brancas, pôr do sol inesquecível e o azul intenso do Mar Egeu.",
  },
  {
    id: 2,
    city: "Kyoto",
    country: "Japão",
    continent: "Ásia",
    price: 14800,
    badge: "CULTURA",
    days: 7,
    climate: "Temperado",
    image: "photo-1493976040374-85c8e12f0c0e",
    description:
      "Templos históricos, jardins tranquilos e tradições milenares.",
  },
  {
    id: 3,
    city: "Paris",
    country: "França",
    continent: "Europa",
    price: 11900,
    badge: "CLÁSSICO",
    days: 7,
    climate: "Temperado",
    image: "photo-1502602898657-3e91760cbb34",
    description:
      "Arte, gastronomia e o charme das ruas mais icônicas da Europa.",
  },
  {
    id: 4,
    city: "Bali",
    country: "Indonésia",
    continent: "Ásia",
    price: 11200,
    badge: "NATUREZA",
    days: 7,
    climate: "Tropical",
    image: "photo-1537996194471-e657df975ab4",
    description: "Terraços de arroz, praias paradisíacas e uma energia única.",
  },
  {
    id: 5,
    city: "Rio de Janeiro",
    country: "Brasil",
    continent: "América do Sul",
    price: 3900,
    badge: "SOL & MAR",
    days: 7,
    climate: "Tropical",
    image: "photo-1483729558449-99ef09a8c325",
    description: "Montanhas, praias e paisagens que parecem cartões-postais.",
  },
  {
    id: 6,
    city: "Nova York",
    country: "Estados Unidos",
    continent: "América do Norte",
    price: 10800,
    badge: "CIDADE",
    days: 7,
    climate: "Temperado",
    image: "photo-1486325212027-8081e485255e",
    description: "Arranha-céus, museus e uma cidade que nunca para.",
  },
  {
    id: 7,
    city: "Roma",
    country: "Itália",
    continent: "Europa",
    price: 9900,
    badge: "HISTÓRIA",
    days: 7,
    climate: "Mediterrâneo",
    image: "photo-1552832230-c0197dd311b5",
    description: "Uma viagem por séculos de história, arquitetura e sabores.",
  },
  {
    id: 8,
    city: "Machu Picchu",
    country: "Peru",
    continent: "América do Sul",
    price: 6700,
    badge: "AVENTURA",
    days: 7,
    climate: "Montanha",
    image: "photo-1526392060635-9d6019884377",
    description: "Um encontro com os Andes e os mistérios da civilização inca.",
  },
  {
    id: 9,
    city: "Cidade do Cabo",
    country: "África do Sul",
    continent: "África",
    price: 9200,
    badge: "PAISAGENS",
    days: 7,
    climate: "Mediterrâneo",
    image: "photo-1580060839134-75a5edca2e99",
    description: "Montanhas impressionantes, oceano e diversidade cultural.",
  },
  {
    id: 10,
    city: "Vancouver",
    country: "Canadá",
    continent: "América do Norte",
    price: 13600,
    badge: "NATUREZA",
    days: 7,
    climate: "Oceânico",
    image: "photo-1560814304-4f05b62af116",
    description: "A combinação perfeita de natureza, montanhas e vida urbana.",
  },
  {
    id: 11,
    city: "Buenos Aires",
    country: "Argentina",
    continent: "América do Sul",
    price: 4700,
    badge: "CULTURA",
    days: 7,
    climate: "Temperado",
    image: "photo-1589909202802-8f4aadce1849",
    description: "Cafés charmosos, arquitetura europeia e muita personalidade.",
  },
  {
    id: 12,
    city: "Marrakech",
    country: "Marrocos",
    continent: "África",
    price: 10900,
    badge: "EXÓTICO",
    days: 7,
    climate: "Semiárido",
    image: "photo-1539020140153-e479b8c22e70",
    description: "Mercados coloridos, palácios e sabores surpreendentes.",
  },
];

const $ = (id) => document.getElementById(id);
const formatBRL = (value) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

function loadFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem("atlasFavorites") || "[]");
    return Array.isArray(saved)
      ? saved.filter((id) => destinations.some((d) => d.id === id))
      : [];
  } catch {
    return [];
  }
}

let favorites = loadFavorites();
let onlyFavorites = false;
let toastTimeout;

function imageUrl(destination, width = 900) {
  return `https://images.unsplash.com/${destination.image}?auto=format&fit=crop&w=${width}&q=85`;
}

function showToast(message) {
  $("toast").textContent = message;
  $("toast").classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => $("toast").classList.remove("show"), 2600);
}

function updateFavoritesCounter() {
  $("favoriteCount").textContent = favorites.length;
  $("favoritesNav").classList.toggle("selected", onlyFavorites);
}

function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter((item) => item !== id);
    showToast("Destino removido dos favoritos.");
  } else {
    favorites.push(id);
    showToast("Destino adicionado aos favoritos!");
  }
  localStorage.setItem("atlasFavorites", JSON.stringify(favorites));
  updateFavoritesCounter();
  renderDestinations();
}

function filteredDestinations() {
  const search = $("searchInput").value.trim().toLocaleLowerCase("pt-BR");
  const continent = $("continentFilter").value;
  const budget = $("budgetFilter").value;
  const sort = $("sortFilter").value;

  const filtered = destinations.filter((destination) => {
    const matchesSearch = `${destination.city} ${destination.country}`
      .toLocaleLowerCase("pt-BR")
      .includes(search);
    const matchesContinent =
      continent === "all" || destination.continent === continent;
    const matchesBudget =
      budget === "all" || destination.price <= Number(budget);
    const matchesFavorites =
      !onlyFavorites || favorites.includes(destination.id);
    return (
      matchesSearch && matchesContinent && matchesBudget && matchesFavorites
    );
  });

  if (sort === "low") filtered.sort((a, b) => a.price - b.price);
  if (sort === "high") filtered.sort((a, b) => b.price - a.price);
  return filtered;
}

function renderDestinations() {
  const items = filteredDestinations();
  $("resultsCount").textContent =
    `${items.length} ${items.length === 1 ? "destino encontrado" : "destinos encontrados"}${onlyFavorites ? " · Favoritos" : ""}`;
  $("emptyState").hidden = items.length > 0;
  $("destinationGrid").innerHTML = items
    .map((destination) => {
      const saved = favorites.includes(destination.id);
      return `
      <article class="destination-card">
        <div class="card-photo">
          <img src="${imageUrl(destination)}" alt="Paisagem de ${destination.city}" loading="lazy">
          <span class="card-badge">${destination.badge}</span>
          <button class="favorite-btn ${saved ? "active" : ""}" type="button"
            data-favorite="${destination.id}"
            aria-label="${saved ? "Remover" : "Adicionar"} ${destination.city} ${saved ? "dos" : "aos"} favoritos"
            aria-pressed="${saved}">${saved ? "♥" : "♡"}</button>
        </div>
        <div class="card-body">
          <span class="card-region">${destination.country.toUpperCase()} · ${destination.continent.toUpperCase()}</span>
          <h3>${destination.city}</h3>
          <p>${destination.description}</p>
          <div class="card-footer">
            <div class="card-price"><small>Estimativa por pessoa, 7 dias</small><strong>${formatBRL(destination.price)}</strong></div>
            <button class="card-details" type="button" data-details="${destination.id}">EXPLORAR ↗</button>
          </div>
        </div>
      </article>`;
    })
    .join("");
}

function openDetails(id) {
  const destination = destinations.find((item) => item.id === id);
  if (!destination) return;
  const saved = favorites.includes(id);
  $("modalContent").innerHTML = `
    <img class="modal-image" src="${imageUrl(destination, 1300)}" alt="${destination.city}">
    <div class="modal-body">
      <span class="eyebrow">${destination.country.toUpperCase()} · ${destination.continent.toUpperCase()}</span>
      <h2 id="modalTitle">${destination.city}</h2>
      <p>${destination.description} Explore esse destino e inspire-se para planejar sua próxima viagem.</p>
      <div class="modal-facts"><span>◷ ${destination.days} dias de referência</span><span>☀ ${destination.climate}</span><span>✦ ${destination.badge}</span></div>
      <p><strong>A partir de ${formatBRL(destination.price)} por pessoa</strong> — estimativa ilustrativa, não uma oferta comercial.</p>
      <div class="modal-actions">
        <button class="btn btn-dark" id="planThisDestination" type="button">Planejar viagem ↗</button>
        <button class="outline-btn" id="favoriteThisDestination" type="button">${saved ? "♥ Remover favorito" : "♡ Favoritar"}</button>
      </div>
    </div>`;
  $("modalBackdrop").hidden = false;
  document.body.classList.add("modal-open");
  $("modalClose").focus();

  $("favoriteThisDestination").addEventListener("click", () => {
    toggleFavorite(id);
    $("favoriteThisDestination").textContent = favorites.includes(id)
      ? "♥ Remover favorito"
      : "♡ Favoritar";
  });
  $("planThisDestination").addEventListener("click", () => {
    $("plannerDestination").value = String(id);
    closeDetails();
    $("planejador").scrollIntoView({ behavior: "smooth" });
    showToast("Destino selecionado no planejador!");
  });
}

function closeDetails() {
  $("modalBackdrop").hidden = true;
  document.body.classList.remove("modal-open");
}

function calculateTrip(event) {
  event.preventDefault();
  const destination = destinations.find(
    (item) => item.id === Number($("plannerDestination").value),
  );
  const days = Number($("plannerDays").value);
  const people = Number($("plannerPeople").value);
  const style = Number($("plannerStyle").value);
  if (
    !destination ||
    !Number.isInteger(days) ||
    days < 2 ||
    days > 30 ||
    !Number.isInteger(people) ||
    people < 1 ||
    people > 10
  ) {
    showToast("Informe valores válidos para dias e viajantes.");
    return;
  }

  // Preço-base para 7 dias: 45% transporte fixo + 55% custos proporcionais aos dias.
  const perPerson =
    (destination.price * 0.45 + destination.price * 0.55 * (days / 7)) * style;
  const total = Math.round(perPerson * people);
  $("plannerTotal").textContent = formatBRL(total);
  $("plannerBreakdown").textContent =
    `${destination.city} · ${days} dias · ${people} ${people === 1 ? "viajante" : "viajantes"} · ${formatBRL(Math.round(perPerson))} por pessoa. Valor ilustrativo.`;
}

function resetFilters() {
  $("searchInput").value = "";
  $("continentFilter").value = "all";
  $("budgetFilter").value = "all";
  $("sortFilter").value = "featured";
  onlyFavorites = false;
  updateFavoritesCounter();
  renderDestinations();
}

function initialize() {
  $("year").textContent = new Date().getFullYear();
  $("plannerDestination").innerHTML = destinations
    .map(
      (destination) =>
        `<option value="${destination.id}">${destination.city}, ${destination.country}</option>`,
    )
    .join("");

  ["searchInput", "continentFilter", "budgetFilter", "sortFilter"].forEach(
    (id) => {
      $(id).addEventListener(
        id === "searchInput" ? "input" : "change",
        renderDestinations,
      );
    },
  );

  $("clearFilters").addEventListener("click", resetFilters);
  $("plannerForm").addEventListener("submit", calculateTrip);
  $("favoritesNav").addEventListener("click", () => {
    onlyFavorites = !onlyFavorites;
    updateFavoritesCounter();
    renderDestinations();
    $("destinos").scrollIntoView({ behavior: "smooth" });
  });

  $("destinationGrid").addEventListener("click", (event) => {
    const favoriteButton = event.target.closest("[data-favorite]");
    const detailsButton = event.target.closest("[data-details]");
    if (favoriteButton) toggleFavorite(Number(favoriteButton.dataset.favorite));
    if (detailsButton) openDetails(Number(detailsButton.dataset.details));
  });

  $("modalClose").addEventListener("click", closeDetails);
  $("modalBackdrop").addEventListener("click", (event) => {
    if (event.target === $("modalBackdrop")) closeDetails();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !$("modalBackdrop").hidden) closeDetails();
  });

  $("menuToggle").addEventListener("click", () => {
    const open = $("navLinks").classList.toggle("open");
    $("menuToggle").setAttribute("aria-expanded", String(open));
  });
  $("navLinks")
    .querySelectorAll("a")
    .forEach((link) => {
      link.addEventListener("click", () => {
        $("navLinks").classList.remove("open");
        $("menuToggle").setAttribute("aria-expanded", "false");
      });
    });

  updateFavoritesCounter();
  renderDestinations();
}

initialize();
