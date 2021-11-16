const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#p1')
const message2 = document.querySelector('#p2')
const message3 = document.querySelector('#p3')
const message4 = document.querySelector('#p4')
const message5 = document.querySelector('#p5')

message1.textContent = ''
message2.textContent = ''
message3.textContent = ''
message4.textContent = ''
message5.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
 
    message1.textContent = 'Loading...'
    message2.textContent = ''
    message3.textContent = ''
    message4.textContent = ''
    message5.textContent = ''

    fetch('/weather?address='+ search.value)
    .then((response) => {
        response.json().then((data) => {
         if(data.error) {
             message1.textContent = data.error
         }
           else{
            message1.textContent = 'Location: ' + data.location
            message2.textContent = 'Description: ' + data.weather.description
            message3.textContent = 'Feels like: ' + data.weather.feels
            message4.textContent = 'Temperature: ' + data.weather.Temperature
            message5.textContent = 'Humidity: ' + data.weather.Humidity   
        }
        })
    })
    
})