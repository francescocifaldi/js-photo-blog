//let num = prompt('Quante foto vuoi vedere?')
const row = document.getElementById("card-container");
const form = document.getElementById("request-form")
const formContainer = document.getElementById("form-container")
const picsToShow = document.getElementById("pics-to-show")
const regenBtn = document.getElementById("regen")
const closeBtn = document.getElementById('close')
const overlayElem = document.getElementById('overlay')
const imageToShow = document.getElementById('img-show')
const bodySelector = document.querySelector('body')
let responseArray = []

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const num = picsToShow.value;
    generateList(num);
    regenBtn.classList.remove("d-none")
    formContainer.classList.add("d-none")
    picsToShow.value = ''
})

function generateList(num) {
    row.classList.add("d-none")
    axios
        .get(`https://jsonplaceholder.typicode.com/photos?_limit=${num}`)
        .then((res) => {
            for (let i = 0; i < num; i++) {
                responseArray.push(res.data[i])
                const newCol = document.createElement('div')
                newCol.classList.add('col-12', 'col-lg-4', 'col-md-6')
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
            console.log(responseArray)
        })
        .then(() => {
            row.classList.remove("d-none");
            regenBtn.classList.remove("d-none")
            const elements = document.querySelectorAll('.my-card')
            elements.forEach((element, i) => {
                element.addEventListener('click', function () {
                    imageToShow.innerHTML = `<img src=${responseArray[i].url} alt=""></img>`
                    overlayElem.classList.remove('d-none')
                    bodySelector.classList.add('overflow-y-hidden')
                })
            })
        })
        .catch((err) => {
            console.log('Errore')
        })
}

regenBtn.addEventListener("click", (event) => {
    row.innerHTML = '';
    regenBtn.classList.add("d-none")
    formContainer.classList.remove("d-none")
})

closeBtn.addEventListener('click', (event) => {
    event.stopPropagation()
    overlayElem.classList.add('d-none')
    bodySelector.classList.remove('overflow-y-hidden')
})

overlayElem.addEventListener('click', (event) => {
    if (event.target === overlayElem) {
        overlayElem.classList.add('d-none')
        bodySelector.classList.remove('overflow-y-hidden')
    }
})