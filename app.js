const cpf = document.getElementById('inputCPF')
const phoneNumber = document.getElementById('inputPhoneNumber')
const myForm = document.getElementById('botao')
const errorElement = document.getElementById('error')
let firstName = document.getElementById('inputFirstName')
let lastName = document.getElementById('inputLastName')
let email = document.getElementById('inputEmail')
let cep = document.getElementById('inputZip')
let houseNumber = document.getElementById('inputAddress2')
let valid = document.getElementById('gridCheck')


//máscara de cpf 
cpf.addEventListener('keypress', () => {
    let cpfLength = cpf.value.length

    if (cpfLength === 3 || cpfLength === 7) {
        cpf.value += '.'
    } else if (cpfLength === 11) {
        cpf.value += '-'
    }
})

//mascara de telefone 
phoneNumber.addEventListener('keypress', () => {
    let phoneNumberLength = phoneNumber.value.length

    if (phoneNumberLength === 0) {
        phoneNumber.value += '('
    } else if (phoneNumberLength === 3) {
        phoneNumber.value += ') '
    } else if (phoneNumberLength === 10) {
        phoneNumber.value += '-'
    }
})

//validar o form
botao.addEventListener('click', (e) => {
    //let messages = []

    //if (messages.length > 0) {
    //    e.preventDefault()
    //}

    if (document.getElementById('gridCheck').checked) {
        if (firstName.value != '' && lastName.value != '' && cpf.value != '' && phoneNumber.value != '' && email.value != '' && houseNumber.value != '' && valid.checked) {
            window.location.href = './success.html'
        } else {
            errorElement.innerText = 'You must complete everything.'
        }
    } else {
        errorElement.innerText = 'Check box is not ticked.'
    }
})

//mascara de cep 
cep.addEventListener('keypress', () => {
    let cepLength = cep.value.length

    if (cepLength === 5) {
        cep.value += '-'
    } 
})

//get cep
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