import {api} from './serverdomain.js'

document.cookie = 'submit=1'

window.getCookie = function(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
}

const tel_wrapper = document.querySelectorAll(".tel_wrapper");
const elForm = document.querySelector(".adduser_form");
const elInputName = document.querySelector("#input_name");
const elInputSurname = document.querySelector("#input_surname");
const elInputAge = document.querySelector("#input_age");
const elInputAbout = document.querySelector("#input_about");
const elInputTel = document.querySelector("#input_tel");
const elInputTell = document.querySelector("#input_tell");
const elInputAddress = document.querySelector("#input_address");

elForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const tes = window.getCookie('submit')
    
    if (+tes === 1) {
        document.cookie = 'submit=0'
        elInputName.classList.remove('error_border_color')
        elInputSurname.classList.remove('error_border_color')
        elInputAge.classList.remove('error_border_color')
        elInputAbout.classList.remove('error_border_color')
        elInputTel.classList.remove('error_border_color')
        elInputTell.classList.remove('error_border_color')
        elInputAddress.classList.remove('error_border_color')
        
        const fullname = elInputSurname.value + ' ' + elInputName.value
        const tel1 = +(elInputTel.value)
        const tel2 = +(elInputTell.value)
        const tea = new RegExp('^998[389][012345789][0-9]{7}$', 'gi')
        
        if(fullname.length <= 36 && fullname.length === 1){
            document.cookie = 'submit=1'
            elInputName.classList.add('error_border_color')
            elInputSurname.classList.add('error_border_color')
        } else if (elInputAge.value ? !(/^(0?[1-9]|[12]\d|3[01])[\-](0?[1-9]|1[0-2])[\-](19|20)\d{2}$/.test(elInputAge.value)) : false) {
            document.cookie = 'submit=1'
            elInputAge.classList.add('error_border_color')
        } else if(elInputTel.value.length > 9 || elInputTell.value.length > 9 || elInputTel.value === '' ? true : isNaN(tel1) || elInputTell.value === '' ? true : isNaN(tel2)) {
            document.cookie = 'submit=1'
            for (const i of tel_wrapper) {
                i.classList.add('error_border_color')
                i.classList.add('error_border_color')
            }
        } else if(elInputAddress.value <= 56 && elInputAddress.value === '') {
            document.cookie = 'submit=1'
            elInputAddress.classList.add('error_border_color')
        } else if(elInputAbout.value.length <= 200 && elInputAbout.value === '') {
            document.cookie = 'submit=1'
            elInputAbout.classList.add('error_border_color')
        } else {
            const res = await fetch(api+'/userspost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullname,   
                phone_number_first: +(elInputTel.value),
                phone_number_second: +(elInputTell.value),
                about: elInputAbout.value,
                address: elInputAddress.value,
                age: elInputAge.value,  
                token: localStorage.getItem('token'),
                company_id: localStorage.getItem('company') ? localStorage.getItem('company') : 1
            })})
            
            const data = await res.json()
            
            if(data.status === 200){
                window.location = '/users.html'
            } else {
                alert(`Sizning mijoz qo'shish uchun huquqingiz yoq`)
                window.location = '/users.html'
            }
        }
    }
    
})
