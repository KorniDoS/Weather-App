const key = "f8719ca40261e1669ea3a27ecef961ec";

const select = document.querySelector(".form-select");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const icon = document.querySelector(".icon");
const weatherType = document.querySelector(".weather-type");
const time = document.querySelector(".time");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const atmp = document.querySelector(".atmp");

const details = document.querySelector(".details");
const forecast = document.querySelector(".forecast");
const hours = document.querySelector(".hours");
const info = document.querySelector(".info");

const day = document.querySelector(".day");
const current_day = document.querySelector(".current-day");

const table = document.querySelector("table");

const cities = document.querySelector("#cities");
const current_country = document.querySelector("#current-country");

//let options = cities.getElementsByTagName('OPTION');




//Getting the cityID from the previous page
let cityID = window.localStorage.getItem('CITY_ID');



const data = [];


const kelvinToCelsius = (degrees) => {
  const celsius = degrees - 273.15;
  return celsius.toFixed(1);
}


const getCities = (cc) => {
  fetch('../data/all_cities.json', {
    method: 'GET',
  })

    .then(response => response.json())
    .then(data => {
      data.forEach(city => {
        /* if (city.country===cc){
           const optiontest = document.createElement("option");
           optiontest.value = city.id;
           optiontest.text = city.name;
          
            if (city.id === cityID){
              optiontest.setAttribute("selected", true);
              window.localStorage.setItem('CITY_ID',city.id);
            }
           
           cities.appendChild(optiontest);
         }*/
        if (city.country === cc) {
          const option = document.createElement("option");
          option.value = city.id;
          option.text = city.name;


          /* const option = document.createElement("option");
           option.value = city.id;
           option.text = city.name;*/

          // if the current id of the city from the option is equal to the ID from the previous page, make that option selected
          if (city.id == cityID) {

            option.setAttribute("selected", true);

          }


          select.appendChild(option);
        }
      });



    })

    .catch((error) => {
      console.log('Request failed', error);
    });

}




const getWeather = (cityID = window.localStorage.getItem('CITY_ID')) => {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${cityID}&appid=${key}`, {
    method: 'GET',
  })

    .then(response => response.json())
    .then(data => {

      city.innerText = data.city.name;
      current_country.innerText = "CURRENT COUNTRY: " + `${window.localStorage.getItem('COUNTRY_CODE')}`;



      function dayOfTheWeek(dt_txt) {


        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        const c = weekday[new Date(dt_txt).getDay()];


        current_day.innerText = c;

      }


      let dayCounter_value = window.localStorage.getItem('dayCounter');

      const dt_txt1 = [`${data.list[0].dt_txt}`, `${data.list[8].dt_txt}`, `${data.list[16].dt_txt}`, `${data.list[24].dt_txt}`, `${data.list[32].dt_txt}`];
      dayOfTheWeek(dt_txt1[dayCounter_value]);


      function getH() {
        let hoursArray = [];
        // for (let i in data.list)
        for (let i = 0; i < 8; i++) {
          hoursArray[i] = [data.list[i].dt_txt];
          const tr = document.createElement("tr");
          hours.appendChild(tr);
          const th = document.createElement("th");
          th.value = i;
          th.innerText = data.list[i].dt_txt.substring(16, 11);
          th.setAttribute("scope", "row");
          th.setAttribute("id","th"+i)
          tr.appendChild(th);
          //details.append(td);
          //console.log(data.list[i].dt_txt);
        }


      }

      getH();

      const getForecast = () => {
        //The indexes at which the data is found
        const day0Array = [0, 1, 2, 3, 4, 5, 6, 7];
        const day1Array = [8, 9, 10, 11, 12, 13, 14, 15];
        const day2Array = [16, 17, 18, 19, 20, 21, 22, 23];
        const day3Array = [24, 25, 26, 27, 28, 29, 30, 31];
        const day4Array = [32, 33, 34, 35, 36, 37, 38, 39];


        //create arrays with the data for each day: MONDAY, Tuesday etc.
        // make a switch to display that specific day's forecast array based on the dayCounter from localStorage

        switch (dayCounter_value) {
          case '0':
            for (let i = 0; i < 8; i++) {
              const tr = document.createElement("tr");

              const td = document.createElement("td");
              const td2 = document.createElement("td");
              const td3 = document.createElement("td");

              const img = document.createElement("img");
              const img2 = document.createElement("img");
              const img3 = document.createElement("img");



              info.appendChild(tr);
             
              tr.appendChild(img);
              img.setAttribute("src", `http://openweathermap.org/img/wn/${data.list[day0Array[i]].weather[0].icon}@2x.png`);
              img.setAttribute("alt", "weather-type");
              td.value = i;
              td.innerText = `${kelvinToCelsius(data.list[day0Array[i]].main.temp) + '\xB0C'}`;
              tr.appendChild(td);
              tr.appendChild(img2);
              img2.setAttribute("src", "../images/wind.jpg");
              img2.setAttribute("alt", "wind");
              td2.innerText = data.list[day0Array[i]].wind.speed + ' m/s';



              tr.appendChild(td2);

              img3.setAttribute("src", "../images/humidity.png");
              img3.setAttribute("alt", "humidity level");
              tr.appendChild(img3);
              td3.innerText = data.list[day0Array[i]].main.humidity + '%';
              tr.appendChild(td3);
              continue;

            }
            break;


          case '1':
            for (let i = 0; i < 8; i++) {
              const tr = document.createElement("tr");

              const td = document.createElement("td");
              const td2 = document.createElement("td");
              const td3 = document.createElement("td");

              const img = document.createElement("img");
              const img2 = document.createElement("img");
              const img3 = document.createElement("img");



              info.appendChild(tr);
             
              tr.appendChild(img);
              img.setAttribute("src", `http://openweathermap.org/img/wn/${data.list[day1Array[i]].weather[0].icon}@2x.png`);
              img.setAttribute("alt", "weather-type");
              td.value = i;
              td.innerText = `${kelvinToCelsius(data.list[day1Array[i]].main.temp) + '\xB0C'}`;
              tr.appendChild(td);
              tr.appendChild(img2);
              img2.setAttribute("src", "../images/wind.jpg");
              img2.setAttribute("alt", "wind");
              td2.innerText = data.list[day1Array[i]].wind.speed + ' m/s';



              tr.appendChild(td2);

              img3.setAttribute("src", "../images/humidity.png");
              img3.setAttribute("alt", "humidity level");
              tr.appendChild(img3);
              td3.innerText = data.list[day1Array[i]].main.humidity + '%';
              tr.appendChild(td3);
              continue;

            }
            break;

          case '2':
            for (let i = 0; i < 8; i++) {
              const tr = document.createElement("tr");

              const td = document.createElement("td");
              const td2 = document.createElement("td");
              const td3 = document.createElement("td");

              const img = document.createElement("img");
              const img2 = document.createElement("img");
              const img3 = document.createElement("img");



              info.appendChild(tr);
              
              tr.appendChild(img);
              img.setAttribute("src", `http://openweathermap.org/img/wn/${data.list[day2Array[i]].weather[0].icon}@2x.png`);
              img.setAttribute("alt", "weather-type");
              td.value = i;
              td.innerText = `${kelvinToCelsius(data.list[day2Array[i]].main.temp) + '\xB0C'}`;
              tr.appendChild(td);
              tr.appendChild(img2);
              img2.setAttribute("src", "../images/wind.jpg");
              img2.setAttribute("alt", "wind");
              td2.innerText = data.list[day2Array[i]].wind.speed + ' m/s';



              tr.appendChild(td2);

              img3.setAttribute("src", "../images/humidity.png");
              img3.setAttribute("alt", "humidity level");
              tr.appendChild(img3);
              td3.innerText = data.list[day2Array[i]].main.humidity + '%';
              tr.appendChild(td3);
              continue;
            }


            break;

          case '3':
            for (let i = 0; i < 8; i++) {
              const tr = document.createElement("tr");

              const td = document.createElement("td");
              const td2 = document.createElement("td");
              const td3 = document.createElement("td");

              const img = document.createElement("img");
              const img2 = document.createElement("img");
              const img3 = document.createElement("img");



              info.appendChild(tr);
             
              tr.appendChild(img);
              img.setAttribute("src", `http://openweathermap.org/img/wn/${data.list[day3Array[i]].weather[0].icon}@2x.png`);
              img.setAttribute("alt", "weather-type");
              td.value = i;
              td.innerText = `${kelvinToCelsius(data.list[day3Array[i]].main.temp) + '\xB0C'}`;
              tr.appendChild(td);
              tr.appendChild(img2);
              img2.setAttribute("src", "../images/wind.jpg");
              img2.setAttribute("alt", "wind");
              td2.innerText = data.list[day3Array[i]].wind.speed + ' m/s';



              tr.appendChild(td2);

              img3.setAttribute("src", "../images/humidity.png");
              img3.setAttribute("alt", "humidity level");
              tr.appendChild(img3);
              td3.innerText = data.list[day3Array[i]].main.humidity + '%';
              tr.appendChild(td3);
              continue;
            }
            break;

          case '4':
            for (let i = 0; i < 8; i++) {
              const tr = document.createElement("tr");

              const td = document.createElement("td");
              const td2 = document.createElement("td");
              const td3 = document.createElement("td");

              const img = document.createElement("img");
              const img2 = document.createElement("img");
              const img3 = document.createElement("img");



              info.appendChild(tr);
             
              tr.appendChild(img);
              img.setAttribute("src", `http://openweathermap.org/img/wn/${data.list[day4Array[i]].weather[0].icon}@2x.png`);
              img.setAttribute("alt", "weather-type");
              td.value = i;
              td.innerText = `${kelvinToCelsius(data.list[day4Array[i]].main.temp) + '\xB0C'}`;
              tr.appendChild(td);
              tr.appendChild(img2);
              img2.setAttribute("src", "../images/wind.jpg");
              img2.setAttribute("alt", "wind");
              td2.innerText = data.list[day4Array[i]].wind.speed + ' m/s';



              tr.appendChild(td2);

              img3.setAttribute("src", "../images/humidity.png");
              img3.setAttribute("alt", "humidity level");
              tr.appendChild(img3);
              td3.innerText = data.list[day4Array[i]].main.humidity + '%';
              tr.appendChild(td3);
              continue;
            }


            break;

        }
      }

      getForecast();




    })

    .catch((error) => {
      console.log('Request failed', error);
    });

}


select.addEventListener("change", function (e) {
  cityID = e.target.value;

  
 current_day.innerText = '';
 
  hours.innerText = '';
  info.innerText = '';



  //table.removeChild(current_day);
 
  
  // current_day.style.display="none";
  // info.style.display = "none";
  //hours.style.display =" none";
  /*current_day.innerText = '';
  hours.innerText = '';
  info.innerText = '';
*/
  window.localStorage.getItem('CITY_ID');
  getWeather(cityID);
  


})

getCities(localStorage.getItem('COUNTRY_CODE'));
getWeather();








