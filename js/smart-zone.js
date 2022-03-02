const spinner = document.getElementById('spinners')
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




const displaySearchResult = data => {
    console.log(data)
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
           
            
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100 bg-color">
                <img src="${data.image}" class="card-img-top w-25 mx-auto" alt="..." >
                <div class="card-body ">
                  <h5 class="card-title text-center">${data.phone_name}</h5>
                  <h6 class="card-title text-center">${data.brand}</h6>
                  <button type="button" class="btn btn-secondary button " onclick="loadDetails(${data.slug})">Secondary</button>
                </div>
              </div>
            `
            displayResult.appendChild(div);
        }) 
        spinner.style.display = 'none'
    } 
}
const loadDetails = phoneSlug => {
    // console.log(phoneSlug);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneSlug}`
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data))
}

