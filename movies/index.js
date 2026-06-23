// Movie data mapping for details display
const movieData = {
  "Guardians of the Galaxy": {
    poster: "img/gardiansof.webp",
    genre: "Action, Adventure, Sci-Fi",
    duration: "2h 2m",
    rating: "8.0/10 (IMDb)",
    director: "James Gunn",
    cast: "Chris Pratt, Zoe Saldana, Dave Bautista",
    synopsis: "A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe."
  },
  "Aquaman": {
    poster: "img/Aquaman.webp",
    genre: "Action, Adventure, Fantasy",
    duration: "2h 23m",
    rating: "6.8/10 (IMDb)",
    director: "James Wan",
    cast: "Jason Momoa, Amber Heard, Willem Dafoe",
    synopsis: "Arthur Curry, the human-born heir to the underwater kingdom of Atlantis, goes on a quest to prevent a war between the worlds of ocean and land."
  },
  "Batman": {
    poster: "img/batman.jpg",
    genre: "Action, Crime, Drama",
    duration: "2h 56m",
    rating: "7.9/10 (IMDb)",
    director: "Matt Reeves",
    cast: "Robert Pattinson, Zoë Kravitz, Jeffrey Wright",
    synopsis: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption."
  },
  "Hard Tide": {
    poster: "img/hardtide.jpg",
    genre: "Action, Thriller",
    duration: "1h 25m",
    rating: "4.8/10 (IMDb)",
    director: "Marc Zammit",
    cast: "Nathan Phillips, Nic Rasenti, Lauren Okadigbo",
    synopsis: "A fisherman gets caught up in a dangerous criminal underworld when he rescues a young girl from human traffickers."
  },
  "Inception": {
    poster: "img/inception.webp",
    genre: "Action, Adventure, Sci-Fi",
    duration: "2h 28m",
    rating: "8.8/10 (IMDb)",
    director: "Christopher Nolan",
    cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
    synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
  },
  "John Wick": {
    poster: "img/johnwick.jpg",
    genre: "Action, Crime, Thriller",
    duration: "1h 41m",
    rating: "7.4/10 (IMDb)",
    director: "Chad Stahelski",
    cast: "Keanu Reeves, Michael Nyqvist, Alfie Allen",
    synopsis: "An ex-hitman comes out of retirement to track down the gangsters who killed his dog and stole his car."
  },
  "Planet of the Apes": {
    poster: "img/Kingdom-of-the-Planet-of-the-Apes-Movie-Poster-Temp.avif",
    genre: "Action, Adventure, Sci-Fi",
    duration: "2h 22m",
    rating: "6.5/10 (IMDb)",
    director: "Wes Ball",
    cast: "Owen Teague, Freya Allan, Kevin Durand",
    synopsis: "Many years after the reign of Caesar, a young ape goes on a journey that will lead him to question everything he's been taught about the past."
  },
  "Oppenheimer": {
    poster: "img/oppenheimer.jpeg",
    genre: "Biography, Drama, History",
    duration: "3h",
    rating: "8.6/10 (IMDb)",
    director: "Christopher Nolan",
    cast: "Cillian Murphy, Emily Blunt, Matt Damon",
    synopsis: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb."
  },
  "The Nun": {
    poster: "img/the nun.webp",
    genre: "Horror, Mystery, Thriller",
    duration: "1h 36m",
    rating: "5.3/10 (IMDb)",
    director: "Corin Hardy",
    cast: "Demián Bichir, Taissa Farmiga, Jonas Bloquet",
    synopsis: "A priest with a haunted past and a novice on the threshold of her final vows are sent by the Vatican to investigate the death of a young nun in Romania."
  },
  "The Scent": {
    poster: "img/The-Scent-Horror-Movie-Poster-2020-1090x1536.webp",
    genre: "Horror, Thriller",
    duration: "1h 30m",
    rating: "4.2/10 (IMDb)",
    director: "Tony Elwood",
    cast: "Megan Pereira, Tony Elwood, Eric Roberts",
    synopsis: "A woman is tormented by a demonic entity that manifests through scent."
  },
  "The Chase": {
    poster: "img/thechase.jpg",
    genre: "Action, Thriller",
    duration: "1h 42m",
    rating: "5.5/10 (IMDb)",
    director: "Michael Matteo Rossi",
    cast: "Kristos Andrews, Denise Richards, Casper Van Dien",
    synopsis: "A man finds himself in a deadly cat-and-mouse chase when he accidentally receives a mysterious package from a beautiful woman being hunted down."
  },
  "Us": {
    poster: "img/us.jpg",
    genre: "Horror, Mystery, Thriller",
    duration: "1h 56m",
    rating: "6.8/10 (IMDb)",
    director: "Jordan Peele",
    cast: "Lupita Nyong'o, Winston Duke, Elisabeth Moss",
    synopsis: "A family's serene beach vacation turns to chaos when their doppelgängers appear and begin to terrorize them."
  }
};

// See More/Less button functionality
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("seeMoreBtn");
  const extraCards = document.querySelectorAll(".extra-card");
  
  if (btn && extraCards.length > 0) {
    btn.addEventListener("click", function () {
      extraCards.forEach(card => {
        card.classList.toggle("d-none");
      });
      // Toggle button text
      btn.innerText = (btn.innerText === "See More") ? "See Less" : "See More";
    });
  }

  // Initialize and assign modal detail button click listeners
  document.querySelectorAll('.btn-primary, .see-more-btn').forEach(button => {
    if (button.textContent.trim() === 'See more' || button.classList.contains('see-more-btn')) {
      const card = button.closest('.card');
      if (card) {
        const cardTitleEl = card.querySelector('.card-title');
        if (cardTitleEl) {
          const cardTitle = cardTitleEl.textContent.trim();
          button.onclick = () => showMovieDetails(cardTitle);
        }
      }
    }
  });

  // Handle mobile navbar toggle
  const hamburger = document.getElementById("hamburgerBtn");
  const navMenu = document.getElementById("navLinksMenu");
  if (hamburger && navMenu) {
      hamburger.addEventListener("click", () => {
          navMenu.classList.toggle("active");
      });
  }

  // Set up Hero Carousel Auto Sliding
  initHeroCarousel();

  // Set up Live Cards Search
  initLiveSearch();

  // Set up statistics animated counter
  initStatisticsCounter();

  // Set up Scroll Reveal Observe
  initScrollReveal();

  // Set up Category redirect trigger
  initCategoryRedirect();

  // Set up Slider arrows if present
  initSliderArrows();
  // Render Top Rated slider on homepage
  renderTopRatedSlider();
});

// Video player functionality
function changeVideo(src, poster = "") {
  const mainVideo = document.getElementById("mainPlayer");
  if (!mainVideo) return;
  
  mainVideo.innerHTML = `<source src="${src}" type="video/mp4">`;
  
  if (poster) {
    mainVideo.poster = poster;
  } else {
    mainVideo.removeAttribute("poster");
  }
  
  mainVideo.muted = false;
  mainVideo.load();
  mainVideo.play();
}

// Function to open modal with movie details
function showMovieDetails(movieTitle) {
  const movie = movieData[movieTitle];
  if (!movie) return;
  
  // Set modal content
  document.getElementById('modalMovieTitle').textContent = movieTitle;
  document.getElementById('modalMoviePoster').src = movie.poster;
  document.getElementById('modalMovieGenre').textContent = movie.genre;
  document.getElementById('modalMovieDuration').textContent = movie.duration;
  document.getElementById('modalMovieRating').textContent = movie.rating;
  document.getElementById('modalMovieDirector').textContent = movie.director;
  document.getElementById('modalMovieCast').textContent = movie.cast;
  document.getElementById('modalMovieSynopsis').textContent = movie.synopsis;
  
  // Show modal
  const movieModal = new bootstrap.Modal(document.getElementById('movieModal'));
  movieModal.show();
  
  // Handle final buy ticket button - redirect to booking page
  document.getElementById('finalBuyTicket').onclick = function() {
    // Store selected movie in localStorage
    localStorage.setItem('selectedMovie', movieTitle);
    // Redirect to booking page
    window.location.href = 'booking.html';
  };
}

// Hero Carousel Auto Sliding
function initHeroCarousel() {
  const slides = document.querySelectorAll(".carousel-slide-item");
  const dots = document.querySelectorAll(".carousel-indicator-dot");
  if (slides.length === 0) return;

  let currentSlide = 0;
  let carouselInterval;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
    if (dots[currentSlide]) {
      dots[currentSlide].classList.add("active");
    }
  }

  function startCycle() {
    carouselInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000);
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      clearInterval(carouselInterval);
      showSlide(idx);
      startCycle();
    });
  });

  // Start sliding cycle
  startCycle();
}

// Live search logic to filter Now Showing cards
function initLiveSearch() {
  const searchInput = document.getElementById("homeSearchInput");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const cards = document.querySelectorAll("#card .col-md-3");

    cards.forEach(card => {
      const titleEl = card.querySelector(".card-title");
      if (titleEl) {
        const title = titleEl.textContent.toLowerCase();
        if (title.includes(query)) {
          card.style.display = "block"; // override Bootstrap layouts cleanly
        } else {
          card.style.display = "none";
        }
      }
    });
  });
}

// Count up stats logic when section enters viewport
function initStatisticsCounter() {
  const statsSection = document.getElementById("statsSection");
  if (!statsSection) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(statsSection);
}

function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number");
  
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute("data-target"));
    const suffix = stat.getAttribute("data-suffix") || "";
    let current = 0;
    const duration = 2000; // 2 seconds
    const intervalTime = 15;
    const steps = duration / intervalTime;
    const increment = Math.ceil(target / steps);

    const counter = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.textContent = target.toLocaleString() + suffix;
        clearInterval(counter);
      } else {
        stat.textContent = current.toLocaleString() + suffix;
      }
    }, intervalTime);
  });
}

// Observe elements and add class when visible
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal-up, .reveal-in");
  if (reveals.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

  reveals.forEach(el => observer.observe(el));
}

// Render Top Rated Section Horizontal Slider (homepage)
function renderTopRatedSlider() {
  const slider = document.getElementById("topRatedSlider");
  if (!slider) return;

  // Use movieData defined at top, sort by rating if present
  const movies = Object.keys(movieData).map(title => {
    const m = movieData[title];
    return {
      title,
      poster: m.poster || 'img/maxresdefault.jpg',
      rating: (m.rating || '').toString().replace(/[^0-9\.]/g, '') || '0',
      duration: m.duration || '',
      year: m.year || ''
    };
  });

  const sorted = movies.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));

  slider.innerHTML = sorted.map(movie => {
    return `
            <div class="slider-item">
                <div class="movie-card" style="width: 260px;">
                    <div class="movie-poster-wrap">
                        <img src="${movie.poster}" class="movie-poster" alt="${movie.title}" onerror="this.src='img/maxresdefault.jpg'">
                        <div class="rating-badge">★ ${movie.rating}</div>
                        <div class="card-overlay">
                            <p class="mb-2 text-white-50" style="font-size: 13px;">${movie.duration} ${movie.year ? '| ' + movie.year : ''}</p>
                            <button class="btn btn-watch-trailer w-100" onclick="showMovieDetails('${movie.title.replace(/'/g, "\\'")}')">Watch Details</button>
                        </div>
                    </div>
                    <div class="movie-card-body">
                        <h5 class="movie-card-title">${movie.title}</h5>
                        <p class="movie-card-genre">${movie.duration}</p>
                    </div>
                </div>
            </div>
        `;
  }).join('');
}

// Redirect category cards to movies page with query parameter
function initCategoryRedirect() {
  const catCards = document.querySelectorAll(".category-card");
  catCards.forEach(card => {
    card.addEventListener("click", () => {
      const genre = card.getAttribute("data-genre");
      localStorage.setItem("selectedCategory", genre);
      window.location.href = "movies.html";
    });
  });
}

// Slider left/right arrows handler
function initSliderArrows() {
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
}
