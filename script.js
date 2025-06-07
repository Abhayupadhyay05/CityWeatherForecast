let valueSearch = document.getElementById('valueSearch');
let city = document.getElementById('city');
let temperature = document.getElementById('temperature');
let description = document.querySelector('.description'); //class direct ho jata h by using quer... dont need to give specific id
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let form = document.querySelector('form');
let main = document.querySelector('main'); // **Add this line to get a reference to the main element**

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if(valueSearch.value != ''){
        searchWeather();
    }
})

let id = '8393372fca65155b18630c76b4dcbc8f';
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;

const searchWeather = () => {
    fetch(url+'&q='+ valueSearch.value)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // **Clear any previous error message before processing new data**
            if (main.querySelector('.error-message')) {
                main.querySelector('.error-message').remove();
            }

            if(data.cod == 200){
                city.querySelector('figcaption').innerHTML = data.name;
                city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
                temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                temperature.querySelector('span').innerText = data.main.temp;
                description.innerText = data.weather[0].description;

                clouds.innerText = data.clouds.all;
                humidity.innerText = data.main.humidity;
                pressure.innerText = data.main.pressure;
            } else {
                
                if (!main.querySelector('.error-message')) { 
                    const errorMessage = document.createElement('p');
                    errorMessage.classList.add('error-message');
                    errorMessage.style.color = 'red'; 
                    errorMessage.innerText = 'City not found. Please try a different city name.';
                    main.appendChild(errorMessage);
                }

    
                main.classList.add('error');
                setTimeout(() => {
                    main.classList.remove('error');
                }, 3000); 
            }
            valueSearch.value = '';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            // **Adding a generic error message for fetch errors**
             if (!main.querySelector('.error-message')) {
                    const errorMessage = document.createElement('p');
                    errorMessage.classList.add('error-message');
                    errorMessage.style.color = 'red'; 
                    errorMessage.innerText = 'An error occurred while fetching weather data.';
                    main.appendChild(errorMessage);
                }
             main.classList.add('error');
                setTimeout(() => {
                    main.classList.remove('error');
                }, 3000);
        });
}

const initApp = () => {
    valueSearch.value = 'Delhi'; 
    searchWeather();
}
initApp();
