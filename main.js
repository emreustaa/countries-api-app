const countries = document.querySelector(".countries");
const mainWrapper = document.querySelector(".mainWrapper");
const filterContinent = Array.from(document.querySelectorAll("option"));
const modal = document.querySelector(".modal");
const backBtn = document.getElementById("backBtn");
const continents = document.querySelector(".continents");
const searchCountry = document.querySelector("input[type='search']");

let modalWrapper = document.createElement("div");
let codeArray = [];
let countryArray = [];
let borderArray = [];


const fetchCountry = (event) => {

    const apiEndpoint = `https://restcountries.eu/rest/v2/all`;

    fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {

            data.forEach(element => {

                const [currency, ] = element.currencies;
                let country = document.createElement("div");
                let countryDetails = document.createElement("div");
                let img = document.createElement("img");
                let allCountries = document.createElement("allCountries")
                codeArray.push(element.alpha3Code);

                countryArray.push(element.name);

                country.classList.add("allCountries");
                countryDetails.classList.add("paraName");
                img.classList.add("flags");
                img.alt = `${element.name}'s flag`;

                country.appendChild(img);
                countries.appendChild(country);
                country.appendChild(countryDetails);
                countryDetails.innerHTML = `
				
				<h2> ${element.name}</h2>
				<h5>Nüfus: ${element.population.toLocaleString()}  </h5>
				<h5>Kıta: <span>${element.region}</span></h5>
                <h5>Başkent:  ${element.capital} </h5>
                
			  
				`


                img.src = `${element.flag}`;
                allCountries.src = `${element.flag}`;

                img.addEventListener("click", function(evt) {

                    mainWrapper.style.display = "none";
                    modal.style.display = "block";

                    borderArray = [];
                    element.borders.map(country => {
                        console.log(country)
                        codeArray.forEach((elm, index) => {

                            if (country == elm) {
                                borderArray.push(countryArray[index]);
                                console.log(countryArray[index]);
                            }
                        })
                    });

                    modal.appendChild(modalWrapper);
                    modalTemplate(element)


                })

            });

        })
        .catch(error => console.log("Error :", error));
};

backBtn.addEventListener("click", () => {
    mainWrapper.style.display = "block";
    if (modal.children.length > 1) {
        modal.lastElementChild.remove()
    }
    modal.style.display = "none";
})

fetchCountry();


searchCountry.addEventListener("input", (e) => {

    const resultCountry = e.target.value;
    const availableCountries = Array.from(document.querySelectorAll(".paraName h2"));
    availableCountries.forEach(country => {
        const myCountry = country.innerHTML.toLowerCase().trim();
        if (myCountry.includes(resultCountry.toLowerCase().trim())) {
            country.parentElement.parentElement.style.display = "block";
        } else {
            country.parentElement.parentElement.style.display = "none";
        }
    })

    console.log(e.target.value);
})


const continentSelect = document.querySelector("select");

continentSelect.onchange = (evt) => {

    const availableCountries = Array.from(document.querySelectorAll(".paraName span"));
    availableCountries.forEach(country => {
        const myCountry = country.innerHTML.toLowerCase().trim();

        if (myCountry == continentSelect.value || continentSelect.value === "all") {
            country.parentElement.parentElement.parentElement.style.display = "block";
        } else {
            country.parentElement.parentElement.parentElement.style.display = "none";
        }
    })

}

const modalTemplate = (element) => {
        console.log("tiklandi")
        console.log(element.latlng)

        console.log(element)
        modalWrapper.innerHTML = `				
        
		<div class="countryDetails">		
			<img src= ${element.flag} alt="" tabindex=0>
			<div class="primarySecondary">
				<div class="primary">           
           			 <h3>${element.name}</h3>
            	 	 <h6><span class="highLight">Yerel Dilde Ülke İsmi:</span> ${element.nativeName}</h6>
            	 	 <h6><span class="highLight">Nüfus:</span> ${element.population.toLocaleString()}</h6>
           			 <h6><span class="highLight">Kıtası:</span> ${element.region}</h6>
            	 	 <h6><span class="highLight">Başkent:</span> ${element.capital}</h6>
            
			    </div>
			
          		<div class="secondary">
					<h6>
						<span class="highLight">Ülke Kısaltması:</span> ${element.topLevelDomain}
					</h6>			
					<h6>
						<span class="highLight">Para Birimleri:</span>
						<span>
							${element.currencies.map(current => current.code)}
						</span>	
					</h6>			
					<h6><span class="highLight">Diller:</span> 
						<span>${element.languages.map(language => language.name)}</span>
					</h6>
		 		 </div>
  
		 		 <div class="borderingCity">
		  			<h6><span class="highLight">Sınır Komşuları:</span></h6>
		  			<div class="bordering">${borderArray.map(border => `
		  	 			<button class="border btn"> ${border}</button> `).join("")}
		   			</div>
				 </div>		  

			</div> 
    </div>     
        <div id=one>
        <h2 id=title></h2>
    </div>
    <div style="margin-left:25px;padding-bottom:20px;font-weight:300">Harita Görünümü </div>
    <div id=map style="position: relative;width: 300px;height: 300px; margin-left:25px"></div>
    <div id=two>
        </p>
    </div>
    `
    init(element.latlng[0],element.latlng[1])

	const borderingCountries = document.querySelector(".bordering");


	console.log(borderingCountries)

	borderingCountries.addEventListener("click", (evt) => {
        const apiEndpoint = `https://restcountries.eu/rest/v2/name/${event.target.innerHTML.trim()}`
        if(evt.target.className == "border btn"){


		console.log(evt.target.innerHTML)
        console.log(apiEndpoint)
		fetch(apiEndpoint)
			.then(response => response.json())
			.then(data => {
				console.log(data[0])
			
					borderArray = [];
					data[0].borders.map(country => {
						console.log(country)
						codeArray.forEach((elm, index) => {
	
							if (country == elm) {
								borderArray.push(countryArray[index]);
								console.log(countryArray[index]);
							}
						})
					});
            
                    
				console.log(data[0].borders)
				modalTemplate(data[0])
            })
        }
	})




}


"use strict"
var MAP 
function init(lat,lng) {
    let p = {lat, lng}
  
    MAP = L.map('map').setView(p, 5)  
    let u = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    let attribution = '&copy; OpenStreetMap contributors'
    L.tileLayer(u, {attribution}).addTo(MAP)
    let report = () => out.innerText = MAP.getZoom()
   
}