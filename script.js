const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultDiv = document.getElementById("result");

searchForm.addEventListener('submit', (e) => {
e.preventDefault();

const searchTerm = searchInput.value.toLowerCase().trim();


if (!searchTerm) {
    showAlert("Please enter a character name");
    return;
  }

fetchData().then((data) =>{
    // console.log(data);
    displayData(data , searchTerm)
}).catch((error) => {
    console.log(error);
})
})

function fetchData() {
    const url = 'https://data.covid19india.org/v4/min/data.min.json';
    return new Promise((resolve, reject) => {
        fetch(url) 
        .then((response) => {

            if(!response.ok) {
                reject('not fetching Data');
                return;
            }
            return response.json()

        })
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        })
    })
}


function displayData(data, searchTerm) {
    resultDiv.innerHTML = ''; // Clear previous results

    // let matchFound = false; // Flag to track if a match is found
    // Use a dictionary to map state codes to state names
    const stateNames = {
      "AN": "Andaman and Nicobar Islands",
      "AP": "Andhra Pradesh",
      "AR": "Arunachal Pradesh",
      "AS": "Assam",
      "BR": "Bihar",
      "CH": "Chandigarh",
      "CT": "Chhattisgarh",
      "DL": "Delhi",
      "DN": "Dadra and Nagar Haveli and Daman and Diu",
      "GA": "Goa",
      "GJ": "Gujarat",
      "HP": "Himachal Pradesh",
      "HR": "Haryana",
      "JH": "Jharkhand",
      "JK": "Jammu and Kashmir",
      "KA": "Karnataka",
      "KL": "Kerala",
      "LA": "Ladakh",
      "LD": "Lakshadweep",
      "MH": "Maharashtra",
      "ML": "Meghalaya",
      "MN": "Manipur",
      "MP": "Madhya Pradesh",
      "MZ": "Mizoram",
      "NL": "Nagaland",
      "OR": "Odisha",
      "PB": "Punjab",
      "PY": "Puducherry",
      "RJ": "Rajasthan",
      "SK": "Sikkim",
      "TG": "Telangana",
      "TN": "Tamil Nadu",
      "TR": "Tripura",
      "UP": "Uttar Pradesh",
      "UT": "Uttarakhand",
      "WB": "West Bengal"
    };

    for (const stateCode in data) {
     
      console.log('',stateCode);
      const stateName = stateNames[stateCode];

      console.log('Name : ',stateName);
   
      if (stateName.toLowerCase().includes(searchTerm)) {
        const stateData = data[stateCode];

        console.log('stateData',stateData);
        const card = document.createElement('div');
        card.classList.add('card', 'mt-3');
        card.innerHTML = `
          <div class="card-body">
            <h5 class="card-title">${stateName}</h5>
            <p class="card-text"><strong>Total Confirmed:</strong> ${stateData.total.confirmed}</p>
            <p class="card-text"><strong>Total Deceased:</strong> ${stateData.total.deceased}</p>
            <p class="card-text"><strong>Total Recovered:</strong> ${stateData.total.recovered}</p>
            <p class="card-text"><strong>Total Tested:</strong> ${stateData.total.tested}</p>
            <p class="card-text"><strong>Total Vaccinated 1:</strong> ${stateData.total.vaccinated1}</p>
            <p class="card-text"><strong>Total Vaccinated 2:</strong> ${stateData.total.vaccinated2}</p>
          </div>
        `;
        resultDiv.appendChild(card);
        
      }
      // else {
      //     resultDiv.innerHTML = `<div class="alert alert-danger" role="alert">No matching state found.</div>`;
      // }
    }
  }

function showAlert(mess) {
alert(mess)
}