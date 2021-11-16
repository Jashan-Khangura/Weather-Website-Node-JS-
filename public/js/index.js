const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#p1')
const message2 = document.querySelector('#p2')
const message3 = document.querySelector('#p3')

message1.textContent = ''
message2.textContent = ''
message3.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
 
    message1.textContent = 'Loading...'
    message2.textContent = ''
    message3.textContent = ''

    fetch('/weather?address='+ search.value)
    .then((response) => {
        response.json().then((data) => {
         if(data.error) {
             message1.textContent = data.error
         }
           else{
            message1.textContent = 'Location: ' + data.location
            message2.textContent = 'Temperature: ' + data.weather.Temperature
            message3.textContent = 'Humidity: ' + data.weather.Humidity   
        }
        })
    })
    
})