//TODO...
const BASE_URL = 'http://localhost:3030/jsonstore/tasks/';

document.getElementById("add-weather").addEventListener('click', POST);

async function POST() {

    let location = document.querySelector('#location').value;
    let temperature = document.querySelector('#temperature').value;
    let date = document.querySelector('#date').value;

    let wederObj = {}
    wederObj.location = location;
    wederObj.temperature = temperature;
    wederObj.date = date;

    document.querySelector('#location').value = '';
    document.querySelector('#temperature').value = '';
    document.querySelector('#date').value = '';

    await fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(wederObj)
    })

    GET();

}

document.getElementById("load-history").addEventListener('click', GET);

async function GET() {

    const response = await fetch(BASE_URL);
    const data = await response.json();

    let list = document.getElementById('list');

    list.innerHTML = '';

    let weder = Object.values(data)

    for (let index = 0; index < weder.length; index++) {
        list.appendChild(loadWeder(weder[index]))
    }


}

function loadWeder(weders) {

    let id = weders._id

    let divContainer = document.createElement('div');
    divContainer.setAttribute("class", "container");

    let h2 = document.createElement('h2');
    h2.innerText = weders.location;
    divContainer.appendChild(h2);

    let h3ForDate = document.createElement('h3');
    h3ForDate.innerText = weders.date;
    divContainer.appendChild(h3ForDate);

    let h3ForTemperature = document.createElement('h3');
    h3ForTemperature.setAttribute("class", "celsius");
    h3ForTemperature.innerText = weders.temperature;
    divContainer.appendChild(h3ForTemperature);

    let divButtonsContainer = document.createElement('div');
    divButtonsContainer.setAttribute("class", "buttons-container");

    let buttonForChange = document.createElement('button');
    buttonForChange.setAttribute("class", "change-btn");
    buttonForChange.innerText = 'Change';
    divButtonsContainer.appendChild(buttonForChange);
    buttonForChange.addEventListener('click', function (e) {
        e.preventDefault();

        let editWeather = document.getElementById('edit-weather');
        editWeather.disabled = false;

        let location = document.getElementById('location');
        let temperature = document.getElementById('temperature');
        let date = document.getElementById('date');

        location.value = e.target.parentElement.parentElement.querySelector('h2').innerText;

        temperature.value = e.target.parentElement.parentElement.querySelectorAll('h3')[1].innerText;

        date.value = e.target.parentElement.parentElement.querySelector('h3').innerText

        editWeather.addEventListener('click', async function (e) {
            debugger
            
            let location = document.getElementById('location');
            let temperature = document.getElementById('temperature');
            let date = document.getElementById('date');

            let obj = {}
            obj.location = location.value;
            obj.temperature = temperature.value
            obj.date = date.value

            location.value = '';
            temperature.value = '';
            date.value = ''

            editWeather.disabled = true;
            await fetch(`${BASE_URL}/${id}`,{
                method : 'PUT',
                body:  JSON.stringify(obj)
              })
            
              GET();
        });

    });


    let buttonForDelete = document.createElement('button');
    buttonForDelete.setAttribute("class", "delete-btn");
    buttonForDelete.innerText = 'Delete';
    divButtonsContainer.appendChild(buttonForDelete);
    buttonForDelete.addEventListener('click', async function (e) {
        e.preventDefault();
        await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        GET();
    });


    divContainer.appendChild(divButtonsContainer);

    return divContainer
}