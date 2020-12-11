let url = 'http://localhost:3000';

function onLoad(){
    fetch(url + `/get_count`, {
        method: "GET",
        headers: {
            'Content-type': 'application/json'
        }
        })
        .then((resp) => resp.json())
        .then((data) => {
            if (data.message === "Success"){
                let pastOneDay = document.getElementById("pastOnedayId")
                pastOneDay.innerText = data.oneDayCount
                let pastThirtyDay = document.getElementById("pastThirtydayId")
                pastThirtyDay.innerText = data.thirtyDayCount
            }  
        })
        .catch((err)=>{
            
        })
}

onLoad();

function startShortening() {
    window.location.href = "https://sukriti-url-shortner.netlify.app/urlShortner.html";
}