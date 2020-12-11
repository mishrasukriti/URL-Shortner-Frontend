let url = "http://localhost:3000";
/**
 * Function to convert long URL to short URL and update the same in short URL textbox
 */
function shortenUrl() {
    let longURL = document.getElementById("longUrlText").value;
    fetch(url + `/shortenURL`, {
        method: "POST",
        body: JSON.stringify({
            longURL
        }),
        headers: {
            'Content-type': 'application/json'
        }
        })
        .then((resp) => resp.json())
        .then((data) => {
            let shortenUrlFormElement = document.getElementById("shortenURLFormId")
            let alertDiv = document.createElement("div")
            alertDiv.setAttribute("role", "alert")
            // alertDiv.setAttribute("style", "margin-top: 50px")
            alertDiv.setAttribute("id", "urlShortenSuccessId")
            if (data.message === 'URL is shortened'){
                alertDiv.setAttribute("class", "alert alert-success");
                alertDiv.innerHTML = "<strong>URL Shortened Successfully!</strong> " + data.message
                let shortenUrlTextBox = document.getElementById("shortUrlText");
                console.log("shortened URL is: " + data.shortenedURL);
                shortenUrlTextBox.innerHTML = data.shortenedURL;
                shortenUrlTextBox.value = data.shortenedURL;
            } 
            else {
                alertDiv.setAttribute("class", "alert alert-danger")
                alertDiv.innerHTML = "<strong>Failure!</strong> " + data.message
            }
             
            shortenUrlFormElement.appendChild(alertDiv);
            deleteAlert("urlShortenSuccessId")

        })
        .catch((err)=>{
            let colDiv2 = document.getElementById("shortenURLFormId")
            let alertDiv = document.createElement("div")
            alertDiv.setAttribute("class", "alert alert-danger")
            alertDiv.setAttribute("role", "alert")
            // alertDiv.setAttribute("style", "margin-top: 50px")
            alertDiv.setAttribute("id", "urlShortenFailureId")
            alertDiv.innerHTML = "<strong>Failure!</strong> Internal Server Error"
            colDiv2.appendChild(alertDiv)
            deleteAlert("urlShortenFailureId")
        })
}

function deleteAlert(elementId){
    setTimeout(function(){
        let node = document.getElementById(elementId)
        node.remove()
    }, 6000)
}

function onCopy() {
    var copyText = document.getElementById("shortUrlText");
  
    copyText.select();
    copyText.setSelectionRange(0, 99999);
  
    document.execCommand("copy");
    alert("Copied the URL");
  }

  function checkDashboard() {
      window.location.href = "http://127.0.0.1:5500/dashboard.html";
  }
