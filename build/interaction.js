"use strict";

let latitude = "";
let longitude = "";
const APIKEY = "Add key here";

const main = () => {
    document.getElementById("userSubmit").addEventListener("click", e => {
        e.preventDefault();
        validateInput(document.getElementById("location").value);
    });
};

const validateInput = checkVal => {
    if (checkVal === "") {
        document.getElementById("status").innerHTML = "Cannot be left empty";
        return;
    }
    document.getElementById("status").innerHTML = "";
    fetchData(checkVal);
};

const fetchData = async (checkval) => {
    await browserCompatibility();
    const command = "https://api.openweathermap.org/data/2.5/weather?q="+`${checkval}`+"&appid="+`${APIKEY}`;
    /*
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        `${latitude}` +
        "&lon=" +
        `${longitude}` +
        "&appid=" +
        `${APIKEY}`;
        */
    console.log(command);

    
    fetch(command).then(response => response.json().then(data =>{
        document.getElementById("city").innerHTML = checkval;
        document.getElementById("temperature").innerHTML = data.main.temp;
        //document.getElementById("image").
        document.getElementById("description").innerHTML = data.weather[0].description;
        console.log(data);
    }));
    
    //})
    
   //console.log(command);
};


const browserCompatibility = async () => {
    if (!navigator.geolocation) {
        console.log("Browser does not support Geolocation.");
        return;
    }
    console.log("Browser supports Geolocation.");

    const position = await getPosition();
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    console.log(latitude);
    console.log(longitude);
};

const getPosition = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

main();