// Movie Database with rich metadata mapped to existing images and videos
const movieDatabase = [
  {
    title: "Guardians of the Galaxy",
    poster: "img/gardiansof.webp",
    genre: ["Action", "Adventure", "Sci-Fi"],
    duration: "2h 2m",
    rating: "8.0",
    year: 2014,
    director: "James Gunn",
    cast: "Chris Pratt, Zoe Saldana, Dave Bautista",
    synopsis: "A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.",
    video: "video/venom tld.mp4"
  },
  {
    title: "Aquaman",
    poster: "img/Aquaman.webp",
    genre: ["Action", "Adventure", "Fantasy"],
    duration: "2h 23m",
    rating: "6.8",
    year: 2018,
    director: "James Wan",
    cast: "Jason Momoa, Amber Heard, Willem Dafoe",
    synopsis: "Arthur Curry, the human-born heir to the underwater kingdom of Atlantis, goes on a quest to prevent a war between the ocean and the land.",
    video: "video/venom tld.mp4"
  },
  {
    title: "Batman",
    poster: "img/batman.jpg",
    genre: ["Action", "Crime", "Drama"],
    duration: "2h 56m",
    rating: "7.9",
    year: 2022,
    director: "Matt Reeves",
    cast: "Robert Pattinson, Zoë Kravitz, Jeffrey Wright",
    synopsis: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption.",
    video: "video/venom tld.mp4"
  },
  {
    title: "Hard Tide",
    poster: "img/hardtide.jpg",
    genre: ["Action", "Thriller"],
    duration: "1h 25m",
    rating: "4.8",
    year: 2015,
    director: "Marc Zammit",
    cast: "Nathan Phillips, Nic Rasenti, Lauren Okadigbo",
    synopsis: "A fisherman gets caught up in a dangerous criminal underworld when he rescues a young girl from human traffickers.",
    video: "video/conjuring.mp4"
  },
  {
    title: "Inception",
    poster: "img/inception.webp",
    genre: ["Action", "Adventure", "Sci-Fi"],
    duration: "2h 28m",
    rating: "8.8",
    year: 2010,
    director: "Christopher Nolan",
    cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
    synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    video: "video/venom tld.mp4"
  },
  {
    title: "John Wick",
    poster: "img/johnwick.jpg",
    genre: ["Action", "Crime", "Thriller"],
    duration: "1h 41m",
    rating: "7.4",
    year: 2014,
    director: "Chad Stahelski",
    cast: "Keanu Reeves, Michael Nyqvist, Alfie Allen",
    synopsis: "An ex-hitman comes out of retirement to track down the gangsters who killed his dog and stole his car.",
    video: "video/venom tld.mp4"
  },
  {
    title: "Planet of the Apes",
    poster: "img/Kingdom-of-the-Planet-of-the-Apes-Movie-Poster-Temp.avif",
    genre: ["Action", "Adventure", "Sci-Fi"],
    duration: "2h 22m",
    rating: "6.5",
    year: 2024,
    director: "Wes Ball",
    cast: "Owen Teague, Freya Allan, Kevin Durand",
    synopsis: "Many years after the reign of Caesar, a young ape goes on a journey that will lead him to question everything he's been taught about the past.",
    video: "video/venom tld.mp4"
  },
  {
    title: "Oppenheimer",
    poster: "img/oppenheimer.jpeg",
    genre: ["Biography", "Drama", "History"],
    duration: "3h 0m",
    rating: "8.6",
    year: 2023,
    director: "Christopher Nolan",
    cast: "Cillian Murphy, Emily Blunt, Matt Damon",
    synopsis: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    video: "video/conjuring.mp4"
  },
  {
    title: "The Nun",
    poster: "img/the nun.webp",
    genre: ["Horror", "Mystery", "Thriller"],
    duration: "1h 36m",
    rating: "5.3",
    year: 2018,
    director: "Corin Hardy",
    cast: "Demián Bichir, Taissa Farmiga, Jonas Bloquet",
    synopsis: "A priest with a haunted past and a novice on the threshold of her final vows are sent by the Vatican to investigate the death of a young nun in Romania.",
    video: "video/conjuring.mp4"
  },
  {
    title: "The Scent",
    poster: "img/The-Scent-Horror-Movie-Poster-2020-1090x1536.webp",
    genre: ["Horror", "Thriller"],
    duration: "1h 30m",
    rating: "4.2",
    year: 2020,
    director: "Tony Elwood",
    cast: "Megan Pereira, Tony Elwood, Eric Roberts",
    synopsis: "A woman is tormented by a demonic entity that manifests through scent.",
    video: "video/conjuring.mp4"
  },
  {
    title: "The Chase",
    poster: "img/thechase.jpg",
    genre: ["Action", "Thriller"],
    duration: "1h 42m",
    rating: "5.5",
    year: 2022,
    director: "Michael Matteo Rossi",
    cast: "Kristos Andrews, Denise Richards, Casper Van Dien",
    synopsis: "A man finds himself in a deadly cat-and-mouse chase when he accidentally receives a mysterious package from a beautiful woman being hunted down.",
    video: "video/venom tld.mp4"
  },
  {
    title: "Us",
    poster: "img/us.jpg",
    genre: ["Horror", "Mystery", "Thriller"],
    duration: "1h 56m",
    rating: "6.8",
    year: 2019,
    director: "Jordan Peele",
    cast: "Lupita Nyong'o, Winston Duke, Elisabeth Moss",
    synopsis: "A family's serene beach vacation turns to chaos when their doppelgängers appear and begin to terrorize them.",
    video: "video/conjuring.mp4"
  }
];

// Active State
let currentGenre = "All";
let searchQuery = "";

document.addEventListener("DOMContentLoaded", () => {
    // Initial Render
    renderTrendingMovies();
    renderTopRatedSlider();
    
    // Wire up Search Input
    const searchBar = document.getElementById("searchBar");
    if (searchBar) {
        searchBar.addEventListener("input", (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            renderTrendingMovies();
        });
    }

    // Wire up Category Pills
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentGenre = btn.getAttribute("data-genre");
            renderTrendingMovies();
        });
    });

    // Wire up Category Grid Click handlers
    const catCards = document.querySelectorAll(".category-card");
    catCards.forEach(card => {
        card.addEventListener("click", () => {
            const genre = card.getAttribute("data-genre");
            
            // Activate corresponding pill
            const matchingPill = document.querySelector(`.filter-btn[data-genre="${genre}"]`);
            if (matchingPill) {
                filterButtons.forEach(b => b.classList.remove("active"));
                matchingPill.classList.add("active");
                currentGenre = genre;
                renderTrendingMovies();
                
                // Scroll down to Trending Section
                const trendingSec = document.getElementById("trendingSection");
                if (trendingSec) {
                    trendingSec.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        });
    });

    // Wire up Slider Controls
    const slider = document.getElementById("topRatedSlider");
    const prevBtn = document.getElementById("slidePrev");
    const nextBtn = document.getElementById("slideNext");

    if (slider && prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
            slider.scrollBy({ left: -300, behavior: "smooth" });
        });
        nextBtn.addEventListener("click", () => {
            slider.scrollBy({ left: 300, behavior: "smooth" });
        });
    }

    // Modal Close Cleanup: Stop trailer video when modal is hidden
    const movieModalEl = document.getElementById("movieDetailsModal");
    if (movieModalEl) {
        movieModalEl.addEventListener("hidden.bs.modal", () => {
            const videoPlayer = document.getElementById("modalVideoPlayer");
            if (videoPlayer) {
                videoPlayer.pause();
                videoPlayer.currentTime = 0;
            }
        });
    }

    // Mobile Hamburger Toggle
    const hamburger = document.getElementById("hamburgerBtn");
    const navLinks = document.getElementById("navLinksMenu");
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }
});

// Render Trending Section Grid with current filter + search states
function renderTrendingMovies() {
    const grid = document.getElementById("trendingGrid");
    if (!grid) return;

    // Filter list
    const filtered = movieDatabase.filter(movie => {
        const matchesGenre = currentGenre === "All" || movie.genre.includes(currentGenre);
        const matchesSearch = movie.title.toLowerCase().includes(searchQuery) || 
                              movie.genre.some(g => g.toLowerCase().includes(searchQuery));
        return matchesGenre && matchesSearch;
    });

    // If empty result
    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="col-12 text-center py-5">
                <p class="text-muted fs-5">No movies found matching "${searchQuery || currentGenre}"</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(movie => {
        return `
            <div class="col">
                <div class="movie-card h-100">
                    <div class="movie-poster-wrap">
                        <img src="${movie.poster}" class="movie-poster" alt="${movie.title}" onerror="this.src='img/maxresdefault.jpg'">
                        <div class="rating-badge">★ ${movie.rating}</div>
                        <div class="card-overlay">
                            <p class="mb-2 text-white-50" style="font-size: 13px;">${movie.duration} | ${movie.year}</p>
                            <button class="btn btn-watch-trailer w-100" onclick="openTrailerModal('${movie.title.replace(/'/g, "\\'")}')">Watch Details</button>
                        </div>
                    </div>
                    <div class="movie-card-body">
                        <h5 class="movie-card-title">${movie.title}</h5>
                        <p class="movie-card-genre">${movie.genre.join(', ')}</p>
                        <div class="movie-card-meta">
                            <span>IMDb Rating</span>
                            <strong style="color: #ffc107;">★ ${movie.rating}</strong>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Render Top Rated Section Horizontal Slider
function renderTopRatedSlider() {
    const slider = document.getElementById("topRatedSlider");
    if (!slider) return;

    // Sort database by rating descending
    const sorted = [...movieDatabase].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));

    slider.innerHTML = sorted.map(movie => {
        return `
            <div class="slider-item">
                <div class="movie-card" style="width: 260px;">
                    <div class="movie-poster-wrap">
                        <img src="${movie.poster}" class="movie-poster" alt="${movie.title}" onerror="this.src='img/maxresdefault.jpg'">
                        <div class="rating-badge">★ ${movie.rating}</div>
                        <div class="card-overlay">
                            <p class="mb-2 text-white-50" style="font-size: 13px;">${movie.duration} | ${movie.year}</p>
                            <button class="btn btn-watch-trailer w-100" onclick="openTrailerModal('${movie.title.replace(/'/g, "\\'")}')">Watch Details</button>
                        </div>
                    </div>
                    <div class="movie-card-body">
                        <h5 class="movie-card-title">${movie.title}</h5>
                        <p class="movie-card-genre">${movie.genre.join(', ')}</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Open Dynamic Trailer Modal
function openTrailerModal(movieTitle) {
    const movie = movieDatabase.find(m => m.title === movieTitle);
    if (!movie) return;

    // Get elements
    const modalTitle = document.getElementById("modalMovieTitle");
    const modalGenre = document.getElementById("modalMovieGenre");
    const modalDuration = document.getElementById("modalMovieDuration");
    const modalRating = document.getElementById("modalMovieRating");
    const modalDirector = document.getElementById("modalMovieDirector");
    const modalCast = document.getElementById("modalMovieCast");
    const modalSynopsis = document.getElementById("modalMovieSynopsis");
    const videoPlayer = document.getElementById("modalVideoPlayer");
    const videoSource = document.getElementById("modalVideoSource");
    const modalBuyBtn = document.getElementById("modalBuyTicketBtn");

    if (modalTitle) modalTitle.textContent = movie.title;
    if (modalGenre) modalGenre.textContent = movie.genre.join(', ');
    if (modalDuration) modalDuration.textContent = movie.duration;
    if (modalRating) modalRating.textContent = movie.rating + " / 10 (IMDb)";
    if (modalDirector) modalDirector.textContent = movie.director;
    if (modalCast) modalCast.textContent = movie.cast;
    if (modalSynopsis) modalSynopsis.textContent = movie.synopsis;

    // Load trailer video
    if (videoPlayer && videoSource) {
        videoSource.src = movie.video;
        videoPlayer.load();
        videoPlayer.muted = false;
        videoPlayer.play().catch(err => {
            console.log("Autoplay blocked by browser policy: ", err);
        });
    }

    // Set up Buy Ticket redirect action
    if (modalBuyBtn) {
        modalBuyBtn.onclick = () => {
            // store full movie object for booking page (title, poster, duration, etc.)
            try{ localStorage.setItem('selectedMovieData', JSON.stringify(movie)); }catch(e){ console.warn(e); }
            localStorage.setItem("selectedMovie", movie.title);
            localStorage.setItem("selectedPoster", movie.poster || '');
            window.location.href = "booking.html"; // Redirect to booking page
        };
    }

    // Show Bootstrap Modal
    const movieModal = new bootstrap.Modal(document.getElementById("movieDetailsModal"));
    movieModal.show();
}

// Watch Now button click from featured section or elsewhere
function watchFeaturedMovie(movieTitle) {
    openTrailerModal(movieTitle);
}
