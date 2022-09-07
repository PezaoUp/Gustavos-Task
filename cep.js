function getCep() {
    let cep = document.getElementById("inputZip").value 
    if (cep !== "") {
        let url = "https://brasilapi.com.br/api/cep/v1/" + cep;
        let req = new XMLHttpRequest();

        req.open("GET", url); 
        req.send();

        req.onload = function () {
            if (req.status === 200) {
                let endereço = JSON.parse(req.response);
                document.getElementById("inputAddress").value = endereço.street;
                document.getElementById("inputCity").value = endereço.city;
                document.getElementById("inputState").value = endereço.state;
            } else if (req.status === 404) {
                alert("Wrong CEP");
            } else {
                alert("Unknown error.");
            }
            
        }
    }
}

window.onload = function () {
    let inputZip = document.getElementById("inputZip");
    inputZip.addEventListener("blur", getCep);
}