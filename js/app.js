//let num = prompt('Quante foto vuoi vedere?')
const row = document.getElementById("card-container");
const form = document.getElementById("request-form")
const formContainer = document.getElementById("form-container")
const picsToShow = document.getElementById("pics-to-show")
const regenBtn = document.getElementById("regen")
const overlayElem = document.getElementById('overlay')
const imageToShow = document.getElementById('img-show')
const bodySelector = document.querySelector('body')

const baseUrl = 'https://jsonplaceholder.typicode.com/'
let urlBody = 'photos'
let urlParam = '?_limit='

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const num = picsToShow.value;
    generateList(num);
})

function generateList(num) {
    const completeUrl = baseUrl + urlBody + urlParam + num
    axios
        .get(completeUrl)
        .then((res) => {
            cardsGenerator(res, num)
            cardsOpenerGenerator(res)
            toggleForm()
            picsToShow.value = ''
        })
        .catch((err) => {
            console.log('Errore')
        })
}

regenBtn.addEventListener("click", (event) => {
    row.innerHTML = '';
    toggleForm()
})

overlayElem.addEventListener('click', (event) => {
    event.stopPropagation()
    if (event.target === overlayElem) {
        toggleOverlay()
    }
})

function toggleOverlay() {
    overlayElem.classList.toggle('d-none')
    bodySelector.classList.toggle('overflow-y-hidden')
}

function toggleForm() {
    regenBtn.classList.toggle("d-none")
    formContainer.classList.toggle("d-none")
}

function cardsGenerator(res, numbers) {
    const fragment = document.createDocumentFragment()
    for (let i = 0; i < numbers; i++) {
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
        fragment.appendChild(newCol)
    }
    row.append(fragment);
}

function cardsOpenerGenerator(res) {
    const elements = document.querySelectorAll('.my-card')
    elements.forEach((element, i) => {
        element.addEventListener('click', function () {
            imageToShow.innerHTML = `
                                    <button type="button" class="btn btn-outline-light" id="close">
                                        X
                                    </button>
                                    <img src=${res.data[i].url} alt="">
                                    `
            const closeBtn = document.getElementById('close')
            closeBtn.addEventListener('click', (event) => {
                toggleOverlay()
            })
            toggleOverlay()
        })
    })
}