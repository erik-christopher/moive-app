let URL = 'https://calm-sleepy-link.glitch.me/movies'

const postsList = document.querySelector('.posts-list');
const addPostForm = document.querySelector('.add-post-form');
const titleValue = document.getElementById('title-value');
const bodyValue = document.getElementById('body-value');
const btnSubmit = document.querySelector('.btn')

let output = '';


///Card that renders for movies
const renderPosts = (posts) => {
    posts.forEach(post => {
        console.log(post)
        output += `
                        <div class="posts-list row">
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
    console.log(posts);
}


fetch('https://calm-sleepy-link.glitch.me/movies')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        renderPosts(data)})
    .then(setTimeout(function () {
        $('#heart').hide();
    }, 2000))

postsList.addEventListener('click', (e) => {
    e.preventDefault();
    let delButtonPressed = e.target.id == 'delete-post'
    let editButtonPressed = e.target.id == 'edit-post'

    let id = e.target.parentElement.dataset.id
    console.log(id)
    ////Delete- remove existing post
    if (delButtonPressed) {
        fetch(`${URL}/${id}` , {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(() => location.reload())
    }
    /// Edit Button
    if(editButtonPressed) {
        console.log(id)
        const parent = e.target.parentElement;
        let titleContent = parent.querySelector(".card-title").textContent;

        console.log(titleContent)
        let bodyContent = parent.querySelector(".card-text").textContent;
        console.log(bodyContent)
        titleValue.value = titleContent;
        bodyValue.value = bodyContent;
    }
    ////upadate existing code

    btnSubmit.addEventListener('click', () =>{
        console.log(id)
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
            .then(() => location.reload())
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
            console.log('post submit was a success')
            location.reload()
        })

        .catch(/* handle errors */);


    // fetch(URL, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         title: titleValue.value,
    //         body: bodyValue.value
    //     })
    //
    // })
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data);
    //         const dataArr = [];
    //         dataArr.push(data);
    //         console.log(dataArr)
    //         renderPosts(dataArr);
    //     })
})





    // .catch(err => {
    //     console.log(err);
    //     alert("sorry an error occurred please try again later")
    // });


