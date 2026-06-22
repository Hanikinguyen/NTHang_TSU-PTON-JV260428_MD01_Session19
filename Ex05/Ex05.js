const addBookmarkBtn =
document.getElementById("addBookmarkBtn");

const modal =
document.getElementById("modal");

const closeModal =
document.getElementById("closeModal");

const saveBtn =
document.getElementById("saveBtn");

const websiteName =
document.getElementById("websiteName");

const websiteURL =
document.getElementById("websiteURL");

const bookmarkList =
document.getElementById("bookmarkList");

let bookmarks =
JSON.parse(
    localStorage.getItem("bookmarks")
) || [];


// Hiển thị dữ liệu

function renderBookmarks(){

    bookmarkList.innerHTML = "";

    bookmarks.forEach((bookmark)=>{

        const div =
        document.createElement("div");

        div.classList.add("bookmark");

        div.innerHTML = `
            <a href="${bookmark.url}"
               target="_blank">
               ${bookmark.name}
            </a>

            <button
                class="delete-btn"
                onclick="deleteBookmark(${bookmark.id})"
            >
                ×
            </button>
        `;

        bookmarkList.appendChild(div);

    });

}

// lưu local storage

function saveToLocal(){

    localStorage.setItem(
        "bookmarks",
        JSON.stringify(bookmarks)
    );

}

// mở modal

addBookmarkBtn.onclick = ()=>{

    modal.classList.remove("hidden");

};

// đóng modal

closeModal.onclick = ()=>{

    modal.classList.add("hidden");

};

// thêm bookmark

saveBtn.onclick = ()=>{

    const name =
    websiteName.value.trim();

    let url =
    websiteURL.value.trim();

    if(name === "" || url === ""){

        alert(
          "Vui lòng nhập đầy đủ thông tin"
        );

        return;
    }

    if(
      !url.startsWith("http://") &&
      !url.startsWith("https://")
    ){
        url = "https://" + url;
    }

    const newBookmark = {

        id: Date.now(),
        name,
        url

    };

    bookmarks.push(newBookmark);

    saveToLocal();

    renderBookmarks();

    websiteName.value = "";
    websiteURL.value = "";

    modal.classList.add("hidden");

};

// xóa bookmark

function deleteBookmark(id){

    bookmarks = bookmarks.filter(
        item => item.id !== id
    );

    saveToLocal();

    renderBookmarks();

}

renderBookmarks();