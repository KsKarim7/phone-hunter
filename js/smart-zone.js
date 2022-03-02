const searchPhone = () => {
    const inputField = document.getElementById('search-field');
    const searchText = inputField.value;
    // console.log(searchText);
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



const spinner = document.getElementById('spinners')
const displaySearchResult = data => {
    // console.log(data)
    spinner.style.display = 'block'
    const displayResult = document.getElementById('display-result');
    displayResult.textContent = '';
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
const loadPhoneDetail = phoneSlug => {
    console.log(phoneSlug);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneSlug}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetail(data.data))
}



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
    <h5 class="card-title text-center">${data?.releaseDate}</h5>
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
        <li>${data.others?.WLAN}</li>
        <li>${data.others?.Bluetooth}</li>
        <li>${data.others?.GPS}</li>
        <li>${data.others?.NFC}</li>
        <li>${data.others?.Radio}</li>
        <li>${data.others?.USB}</li>
    </div>
</div>
    `; 
    phoneDetails.appendChild(div)
}
