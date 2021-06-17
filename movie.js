fetch('https://calm-sleepy-link.glitch.me/movies')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        alert("Loading...")
})
    .catch(err => {
    console.log(err);
    alert("sorry an error occurred please try again later")
});

