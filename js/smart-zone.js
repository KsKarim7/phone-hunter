// search result value 
const searchPhone = () => {
    const inputField = document.getElementById('search-field');
    const searchText = (inputField.value).toLowerCase();
    // console.log(searchText.toLowerCase());
    inputField.value = '';


    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data))

}
// const dataLimit = data => {
//     const 
// }


const phoneDetails = document.getElementById('phone-details');
const spinner = document.getElementById('spinners')

// display phone result 
const displaySearchResult = data => {
    // console.log(data)
    spinner.style.display = 'block'
    const displayResult = document.getElementById('display-result');
    displayResult.textContent = '';
    phoneDetails.textContent = '';
    if(data.length == 0){
        const searchFail = document.getElementById('error');
        searchFail.classList.remove('d-none');
        searchFail.classList.add('d-block') 
        spinner.style.display = 'none' 
    }
   
    
    else if(data.length > 0){
        const searchFail = document.getElementById('error');
        searchFail.classList.remove('d-block');
        searchFail.classList.add('d-none') 
        data?.slice(0, 20).forEach(data => {
            // console.log(data);
           
        //    console.log(slug)
            
            const div = document.createElement('div');
            div.classList.add('col');
            
            div.innerHTML = `
            <div class="card h-100 bg-color">
                <img src="${data.image}" class="card-img-top w-25 mx-auto" alt="..." >
                <div class="card-body ">
                  <h5 class="card-title text-center">${data.phone_name}</h5>
                  <h6 class="card-title text-center">${data.brand}</h6>
                  <button type="button" class="btn btn-secondary button " onclick="loadPhoneDetail('${data.slug}')">Explore</button>
                </div>
              </div>
            `
            displayResult.appendChild(div);
        }) 
        spinner.style.display = 'none'
    } 
}
// loading phone's details
const loadPhoneDetail = phoneSlug => {
    console.log(phoneSlug);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneSlug}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetail(data.data))
}

// display phone details 

const displayPhoneDetail = data => {
    // console.log(phone);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    
    div.innerHTML = `
    
    <img src="${data.image}" class="card-img-top w-25  rounded mx-auto  alt="...">
    <div class="card-body">
    <h5 class="card-title text-center">${data.name}</h5>
    <h5 class="card-title text-center">${data.releaseDate?data.releaseDate:'No release date found'}</h5>
    <div class="list-item text-center">
    <span class="fw-bold fs-6">Main Features:</span>
        <p>Storage: ${data.mainFeatures.storage}</p>
        <p>Display Size:${data.mainFeatures.displaySize}</p>
        <p>Chip set: ${data.mainFeatures.chipSet}</p>
        <p>Memory: ${data.mainFeatures.memory}</p>
        <p class="fs-6">Sensors: 
        <li>${data.mainFeatures.sensors[0]}</li>
        <li>${data.mainFeatures.sensors[1]}</li>
        <li>${data.mainFeatures.sensors[2]}</li>
        <li>${data.mainFeatures.sensors[3]}</li>
        <li>${data.mainFeatures.sensors[4]}</li>
        <li>${data.mainFeatures.sensors[5]}</li>
    </p>
    </div>
    <div class="list-item text-center">
    <span class="fw-bold fs-6">Other Features:</span>
        <li>${data.others?data.others.WLAN:'no feature found'}</li>
        <li>${data.others?data.others.Bluetooth:'no feature found'}</li>
        <li>${data.others?data.others.GPS:'no feature found'}</li>
        <li>${data.others?data.others.NFC:'no feature found'}</li>
        <li>${data.others?data.others.Radio:'no feature found'}</li>
        <li>${data.others?data.others.USB:'no feature found'}</li>
    </div>
</div>
    `; 
    phoneDetails.appendChild(div)
}
