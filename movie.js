let fetchURL = 'https://calm-sleepy-link.glitch.me/movies'

fetch('https://calm-sleepy-link.glitch.me/movies')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        alert("Loading...")
        listMovies(data)
        })
    .catch(err => {
        console.log(err);
        alert("sorry an error occurred please try again later")
    });

test

// $.ajax('https://calm-sleepy-link.glitch.me/movies')
//     .then(response => {
//         console.log(response);
//         listMovies(response);
//         return response;
//     });


