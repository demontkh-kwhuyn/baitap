const titleInput = document.getElementById('movieTitle');
const descInput = document.getElementById('movieDesc');
const btnSave = document.getElementById('btnSave');
const btnClearAll = document.getElementById('btnClearAll');
const movieListContainer = document.getElementById('movieList');

//Khởi tạo mảng phim từ localStorage (nếu có)
let movieWishlist = JSON.parse(localStorage.getItem("movieWishlist")) || [];

//render
function renderMovies() {
    movieListContainer.innerHTML = ""; 

    movieWishlist.forEach((movie) => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <button class="btn-delete" onclick="deleteMovie(${movie.id})">✖</button>
            <h3>🎥 ${movie.title}</h3>
            <p>${movie.description}</p>
            <span class="time">Lưu lúc: ${movie.date}</span>
        `;
        movieListContainer.appendChild(card);
    });
     const titleList = document.querySelector('h2'); 
    if(titleList) titleList.innerText = `Danh sách của bạn (${movieWishlist.length})`;
}

function deleteMovie(id) {
    if (confirm("Bạn muốn xóa phim này khỏi danh sách?")) {
        movieWishlist = movieWishlist.filter(movie => movie.id !== id);
        localStorage.setItem("movieWishlist", JSON.stringify(movieWishlist));
        renderMovies();
    }
}

//lưu phim new
btnSave.onclick = function() {
    const title = titleInput.value.trim();
    const description = descInput.value.trim();

    // Validate
    if (title === "") {
        alert("Vui lòng nhập tiêu đề phim!");
        return;
    }

    // Tạo object phim
    const newMovie = {
        id: Date.now(),
        title: title,
        description: description || "Không có mô tả.",
        date: new Date().toLocaleString('vi-VN')
    };

    // Thêm vào mảng và lưu vào localStorage
    movieWishlist.push(newMovie);
    localStorage.setItem("movieWishlist", JSON.stringify(movieWishlist));

    // rì sét lại form
    titleInput.value = "";
    descInput.value = "";
    renderMovies();
    alert("Đã thêm vào danh sách thành công!");
};

//xóa all
btnClearAll.onclick = function() {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ danh sách?")) {
        movieWishlist = [];
        localStorage.removeItem("movieWishlist");
        renderMovies();
    }
};
renderMovies();
