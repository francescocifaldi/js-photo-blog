let num = prompt('Quante foto vuoi vedere?')
const row = document.getElementById("card-container");
const regenBtn = document.getElementById("regen")
const closeBtn = document.getElementById('close')
const selectedBg = document.getElementById('selected-bg')
const bodySelector = document.querySelector('body')

function generateList(num) {
    row.classList.add("d-none")
    axios
        .get(`https://jsonplaceholder.typicode.com/photos?_limit=${num}`)
        .then((res) => {
            for (let i = 0; i < num; i++) {
                const newCol = document.createElement('div')
                newCol.classList.add('col', 'col-lg-4', 'col-md-6')
                newCol.innerHTML += `
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
                                    `
                row.append(newCol);
            }
        })
        .catch((err) => {
            console.log('Errore')
        })
        .then(() => {
            row.classList.remove("d-none");
            console.log(document.querySelectorAll('.col'))
        })
}

generateList(num);

regenBtn.addEventListener("click", function () {
    row.innerHTML = '';
    num = prompt('Quante email vuoi generare?')
    generateList(num)
})

closeBtn.addEventListener('click', function () {
    selectedBg.classList.add('d-none')
    bodySelector.classList.remove('overflow-y-hidden')
})
