const apiKey = 'YOUR_TMDB_API_KEY'; // Replace with your TMDb API Key
const apiUrl = 'https://api.themoviedb.org/3';
let currentSearch = '';

async function fetchMovies(searchQuery = '') {
    let url = `${apiUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

    if (searchQuery) {
        url = `${apiUrl}/search/movie?api_key=${apiKey}&language=en-US&page=1&query=${searchQuery}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    const movies = data.results;

    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        const movieImage = document.createElement('img');
        movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        movieImage.alt = movie.title;

        const movieTitle = document.createElement('h3');
        movieTitle.textContent = movie.title;

        movieElement.appendChild(movieImage);
        movieElement.appendChild(movieTitle);
        movieList.appendChild(movieElement);
    });
}

async function searchMovies() {
    const searchQuery = document.getElementById('search-input').value.trim();
    currentSearch = searchQuery;
    await fetchMovies(currentSearch);
}

// Fetch initial popular movies on page load
fetchMovies();
