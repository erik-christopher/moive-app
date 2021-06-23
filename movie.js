let URL = 'https://calm-sleepy-link.glitch.me/movies'

const postsList = document.querySelector('.posts-list');
const addPostForm = document.querySelector('.add-post-form');
const titleValue = document.getElementById('title-value');
const bodyValue = document.getElementById('body-value');
const btnSubmit = document.querySelector('#the-button')




///Card that renders for movies

const renderPosts = (posts) => {
    let output = '';
    posts.forEach(post => {

        output += `
                        <div class="posts-list">
                            <div class="card-body" data-id=${post.id}>
                                    <img src="${post.poster}">
                                    <h5 class="card-title">${post.title}</h5>
<!--                                    // <h6 class="card-subtitle">${post.actor}</h6-->
                                    <p class="card-text">${post.body}</p>
                                    <a href="#" class="card-link" id="edit-post">Edit</a>
                                    <a href="#" class="card-link" id="delete-post">Delete</a>
                            </div>
                        </div>
                   `;
    })
    postsList.innerHTML = output;
    console.log(postsList);
}

getAllMovies();
function getAllMovies() {

    fetch('https://calm-sleepy-link.glitch.me/movies')
        .then(response => response.json())
        .then(data => {

            renderPosts(data)
        })
        .then(setTimeout(function () {
            $('#heart').hide();
        }, 2000))
};

postsList.addEventListener('click', (e) => {
    e.preventDefault();

    let delButtonPressed = e.target.id == 'delete-post'
    let editButtonPressed = e.target.id == 'edit-post'

    let id = e.target.parentElement.dataset.id

    ////Delete- remove existing post
    if (delButtonPressed) {
        fetch(`${URL}/${id}` , {
            method: "DELETE",
        })
            // .then(res => res.json())
            .then(() => getAllMovies())
    }
    /// Edit Button
    if(editButtonPressed) {

        const parent = e.target.parentElement;
        let titleContent = parent.querySelector(".card-title").textContent;


        let bodyContent = parent.querySelector(".card-text").textContent;

        titleValue.value = titleContent;
        bodyValue.value = bodyContent;
    }
    ////upadate existing code

    btnSubmit.addEventListener('click', () =>{

        fetch(`${URL}/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                title: titleValue.value,
                body: bodyValue.value,
            })
        })
            .then(res => res.json())
            .then(() => getAllMovies())
    })


});


//// Add new POST
addPostForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const moviePost = {title: titleValue.value, body: bodyValue.value};
    const url = 'https://calm-sleepy-link.glitch.me/movies';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(moviePost),
    };
    fetch(url, options)
        .then(/* post was created successfully */
            response => response.json())
        .then(() => {

            getAllMovies();
        })

        .catch(/* handle errors */);



})



