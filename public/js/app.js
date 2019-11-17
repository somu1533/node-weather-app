console.log('I am inside javascript')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

//message1.textContent = 'Hi Somappa How are you'
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    fetch('/weather?location=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            message1.textContent = data.error
        } else {
            message1.textContent = data.location
            message2.textContent = data.weather
            //console.log(data.location)
            //console.log(data.weather)
            
        }

    })
})
})