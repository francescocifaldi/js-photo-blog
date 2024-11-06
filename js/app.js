let num = prompt('Quante foto vuoi vedere?')
const cardElem = document.getElementById("card-container");
const btn = document.getElementById("regen")

function generateList(num) {
    cardElem.classList.add("d-none")
    axios
        .get(`https://jsonplaceholder.typicode.com/photos?_limit=${num}`)
        .then((res) => {
            for (let i = 0; i < num; i++)
                cardElem.innerHTML += `<div class="col-lg-4 col-md-6">
                                            <div class="my-card h-100">
                                                <img src="img/pin.svg" class="pin"></img>
                                                <div class="img-container">
                                                    <img src=${res.data[i].url} alt="">
                                                </div>
                                                <div class="description">
                                                    <p>
                                                        ${res.data[i].title}   
                                                    </p>
                                                </div>
                                            </div>
                                        </div>`
        })
        .catch((err) => {
            console.log('Errore')
        })
        .then(() => {
            cardElem.classList.remove("d-none");
        })
}

generateList(num);

btn.addEventListener("click", function () {
    cardElem.innerHTML = '';
    num = prompt('Quante email vuoi generare?')
    generateList(num)
})
