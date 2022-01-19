window.addEventListener('DOMContentLoaded', (event) => {
  fetch('../all_cities.json',{
    method: 'GET'
  })
})


const key = "f8719ca40261e1669ea3a27ecef961ec"; //Our key to access the data from Weather API


//Selecting our html elements
const countries = document.querySelector("#countries");
const cities = document.querySelector("#cities");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const icon = document.querySelector(".icon");
const weatherType = document.querySelector(".weather-type");
const time = document.querySelector(".time");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const atmp = document.querySelector(".atmp");
const details = document.querySelector(".details");
const daysofweek = document.querySelector(".daysofweek");
const forecast = document.querySelector(".forecast");

let options = cities.getElementsByTagName('OPTION');

//Initial cityID to get the weather forecast
let cityID = 683506;


let my_country = "RO";
let LIST;




//Initial array for working with our data
const data = [];

const kelvinToCelsius = (degrees) =>{
  const celsius = degrees - 273.15;
  return celsius.toFixed(1);
}

window.localStorage.removeItem('COUNTRY_CODE');
window.localStorage.removeItem('CITY_ID');
window.localStorage.removeItem('TEST_valiue');



const getCountries = () =>{
  fetch('../all_countries.json', {
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
    data.forEach(country => {
      const option = document.createElement("option");
      option.text=country.name;
      option.value=country.code;
      

      if(country.code == window.localStorage.getItem('COUNTRY_CODE')){
        option.setAttribute("selected",true);
      
      
      } else if (country.code === 'RO'){
        option.setAttribute("selected", true);
        window.localStorage.setItem('COUNTRY_CODE',country.code)
      }
     
      countries.appendChild(option);
    })
  })
}




const getCities_default = (cc) =>{
  fetch('../all_cities.json', {
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
    data.forEach(city=> {
      if (city.country===cc){
        const optiontest = document.createElement("option");
        optiontest.value = city.id;
        optiontest.text = city.name;
       
         if (city.id === cityID){
           optiontest.setAttribute("selected", true);
           window.localStorage.setItem('CITY_ID',city.id);
         }
        
        cities.appendChild(optiontest);
      }

    })
  })


  

}

const getCities = (motherland) => {
  fetch('../all_cities.json', {
    method: 'GET',
  })

    .then(response => response.json())
    .then(data => {
      data.forEach(city => {
        //Creating an option for each city


  if(city.country===motherland){
    const optiontest = document.createElement("option");
    optiontest.value = city.id;
    optiontest.text = city.name;

 
     
    
    cities.appendChild(optiontest);
    
  

options[0].setAttribute("selected",true);
//window.localStorage.setItem('TEST_valiue', parseInt(options[0].value));

      
//console.log(options[0].value);
  
LIST = options[0].value;
return LIST;

  }
  

//return options[0].value;


      });



    })

    .catch((error) => {
      console.log('Request failed', error);
    });

}


//Using Google fetch method

const getWeather = (cityID) => {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${cityID}&appid=${key}`, {
    method: 'GET',
  })

    .then(response => response.json())
    .then(data => {


      city.innerText = data.city.name;

      //Counter variables - used below
      let counterVariable = 0;
      let counterVariable2 = 0;


  
      function dayOfTheWeek(weather) {


        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const weekdayIndex = [0, 8, 16, 24, 32]; // these indexes is where the data for the next days is stored at, and used below as index;

        for (let i = counterVariable; i < 5; i++) {
          const c = weekday[new Date(weather).getDay()] + `<br> ${data.list[weekdayIndex[i]].dt_txt.substring(0, 10)}`;
          counterVariable++;
          counterVariable2++;

          return c;

        }
      }

      let weather_array = [`${data.list[0].dt_txt}`, `${data.list[8].dt_txt}`, `${data.list[16].dt_txt}`, `${data.list[24].dt_txt}`, `${data.list[32].dt_txt}`];
      //Array for storing each consecutive day's data (eg. Monday, Tuesday, Wednesday, Thursday, Friday);





      function generateHTML() {
        const html = `
       <a href="../weather-app-forecast.html" class="forecast-link"  target="_BLANK" value="0">
        <div>
        <p class="test">${dayOfTheWeek(weather_array[counterVariable2])}
        </p>

        <div id="day1" class="forecast">
        <h2 class="temp">${kelvinToCelsius(data.list[0].main.temp) + '\xB0C'}</h2>
    <img class="icon" src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png" alt="icon"/>
    <h3 class="weather-type">${data.list[0].weather[0].description}</h3>
    <h4 class="time">${data.list[0].dt_txt.substring(16, 11)}</h4>
    <h5 class="wind">Wind: ${data.list[0].wind.speed + ' m/s'}</h5>
    <h5 class="humidity">Humidity: ${data.list[0].main.humidity + '%'}</h5>
    <h5 class="atmp">Atm. pressure: ${data.list[0].main.pressure} hPa</h5>
    </div> 
  </div>


  </a>
<a href="../weather-app-forecast.html"" class="forecast-link" target="_blank" value="1">
  <div>
        <p class="test">${dayOfTheWeek(weather_array[counterVariable2])}
        </p>
    <div id="day2" class="forecast">
        <h2 class="temp">${kelvinToCelsius(data.list[8].main.temp) + '\xB0C'}</h2>
    <img class="icon" src="http://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png" alt="icon"/>
    <h3 class="weather-type">${data.list[8].weather[0].description}</h3>
    <h4 class="time">${data.list[8].dt_txt.substring(16, 11)}</h4>
    <h5 class="wind">Wind: ${data.list[8].wind.speed + ' m/s'}</h5>
    <h5 class="humidity">Humidity: ${data.list[8].main.humidity + '%'}</h5>
    <h5 class="atmp">Atm. pressure: ${data.list[8].main.pressure} hPa</h5>
    </div> 
    </div>
</a>

<a href="../weather-app-forecast.html"" class="forecast-link" target="_blank" value="2">
    <div>
        <p class="test">${dayOfTheWeek(weather_array[counterVariable2])}
        </p>
    
    <div id="day3" class="forecast">
        <h2 class="temp">${kelvinToCelsius(data.list[16].main.temp) + '\xB0C'}</h2>
    <img class="icon" src="http://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png" alt="icon"/>
    <h3 class="weather-type">${data.list[16].weather[0].description}</h3>
    <h4 class="time">${data.list[16].dt_txt.substring(16, 11)}</h4>
    <h5 class="wind">Wind: ${data.list[16].wind.speed + ' m/s'}</h5>
    <h5 class="humidity">Humidity: ${data.list[16].main.humidity + '%'}</h5>
    <h5 class="atmp">Atm. pressure: ${data.list[16].main.pressure} hPa</h5>
    </div> 
    </div>
</a>


<a href="../weather-app-forecast.html"" class="forecast-link" target="_blank" value="3">
    <div>
        <p class="test">${dayOfTheWeek(weather_array[counterVariable2])}
        </p>
    
    <div id="day4" class="forecast">
        <h2 class="temp">${kelvinToCelsius(data.list[24].main.temp) + '\xB0C'}</h2>
    <img class="icon" src="http://openweathermap.org/img/wn/${data.list[24].weather[0].icon}@2x.png" alt="icon"/>
    <h3 class="weather-type">${data.list[24].weather[0].description}</h3>
    <h4 class="time">${data.list[24].dt_txt.substring(16, 11)}</h4>
    <h5 class="wind">Wind: ${data.list[24].wind.speed + ' m/s'}</h5>
    <h5 class="humidity">Humidity: ${data.list[24].main.humidity + '%'}</h5>
    <h5 class="atmp">Atm. pressure: ${data.list[24].main.pressure} hPa</h5>
    </div> 
    </div>

    </a>

    <a href="../weather-app-forecast.html"" class="forecast-link" target="_blank" value="4">
    <div>
        <p class="test">${dayOfTheWeek(weather_array[counterVariable2])}
        </p>
    
    <div id="day5" class="forecast">
        <h2 class="temp">${kelvinToCelsius(data.list[32].main.temp) + '\xB0C'}</h2>
    <img class="icon" src="http://openweathermap.org/img/wn/${data.list[32].weather[0].icon}@2x.png" alt="icon"/>
    <h3 class="weather-type">${data.list[32].weather[0].description}</h3>
    <h4 class="time">${data.list[32].dt_txt.substring(16, 11)}</h4>
    <h5 class="wind">Wind: ${data.list[32].wind.speed + ' m/s'}</h5>
    <h5 class="humidity">Humidity: ${data.list[32].main.humidity + '%'}</h5>
    <h5 class="atmp">Atm. pressure: ${data.list[32].main.pressure} hPa</h5>
    </div> 
    </div>
    </a>
    `;

        details.innerHTML = html;

      }
      generateHTML();



      let linksArray = document.querySelectorAll(".forecast-link");

      linksArray.forEach(function (item) {
        item.addEventListener('click', function () {
          let link_value = item.getAttribute("value");
          window.localStorage.setItem('dayCounter', link_value);
          //console.log(link_value);
        });
      });


      console.log("Success: ", data);

    })

    .catch((error) => {
      console.log('Request failed', error);
    });

}

countries.addEventListener("change",function(f){
  countryCode = f.target.value;
  

  window.localStorage.setItem('COUNTRY_CODE',countryCode);
  
 


  const removeAll = (selectBox) => {
    while (selectBox.options.length > 0) {
        selectBox.remove(0);
    }
  }

  removeAll(cities);



  var delay = ( function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();


getCities(window.localStorage.getItem('COUNTRY_CODE'));





const deviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    delay(function(){


      getWeather(LIST);
      localStorage.setItem('CITY_ID', LIST);
       
    }, 5000 );
    console.log("tablet");
      return "tablet";
  }
  else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    delay(function(){


      getWeather(LIST);
      localStorage.setItem('CITY_ID', LIST);
       
    }, 8000 );
      console.log("mobile");
      return "mobile";
  }
  console.log("desktop");
  delay(function(){


    getWeather(LIST);
    localStorage.setItem('CITY_ID', LIST);
     
  }, 2000 );
  return "desktop";
  


};
deviceType();


 

  })





cities.addEventListener("change", function (e) {
  cityID = e.target.value;
  window.localStorage.setItem('CITY_ID', cityID);

  getWeather(cityID);


})


getCountries();
getCities_default(my_country);
getWeather(cityID);











