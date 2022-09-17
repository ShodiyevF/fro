import {api} from './serverdomain.js'

const form = document.querySelector(".login_form")
const inputEmail = document.querySelector(".input_email")
const inputPassword = document.querySelector(".input_password")
const rememberme = document.querySelector(".login_remember_check")

async function checktoken() {
    const res = await fetch(api+'/checktoken',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('token')
        })
    })
    const data = await res.json()
    if (data.status === 200 && localStorage.getItem('_id')) {
        window.location = '/main.html'
    }
}

checktoken()

if (localStorage.getItem('newpass') === '1') {
    function myFunction() {
        var x = document.getElementById("snackbar");
        
        x.className = "show";
        
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        localStorage.removeItem('newpass')
    }
    myFunction()
}

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    inputEmail.style.borderColor = '#97AFCB'
    inputPassword.style.borderColor = '#97AFCB'
    
    const res = await fetch(api+'/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({login: inputEmail.value,password: inputPassword.value})
    })

    const data = await res.json()
    console.log(data);
    if (data.status === 200) {
        localStorage.setItem('token', data.key)
        if(rememberme.checked){
            localStorage.setItem('_id', 1)
        }
        window.location = '/main.html'  
    } else {
        inputEmail.style.borderColor = 'red'
        inputPassword.style.borderColor = 'red'
    }
})