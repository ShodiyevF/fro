import {api} from './serverdomain.js'

const form = document.querySelector('.adduser_form')
const inputName = document.querySelector('#input_name')
const inputSername = document.querySelector('#input_surname')
const inputAge = document.querySelector('#input_age')
const inputTel = document.querySelector('#input_tel');
const inputTell = document.querySelector('#input_tell')
const inputAddress = document.querySelector('#input_address');

async function getDeviceTypes() {
    const res = await fetch(api + '/order/device/get', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('token'),
            company_id: +(localStorage.getItem('company'))
        })
    })

    const data = await res.json()
    if (!(data.data.length)) {
        alert('Qurilma turi yoq, Sozlamalar bolimidan kiriting qurilma turini kiriting')
        window.location = 'settings.html'
    } else {
        for (const i of data.data) {
            const option = document.createElement('option')
            option.value = i.device_id
            option.textContent = i.device_name
            inputName.appendChild(option)
        }
    }
}

getDeviceTypes()

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    // /^(0?[1-9]|1[0-2])[\.](0?[1-9]|[0-2]\d|3[01])[\.](19|20)\d{2}$/.test()


    inputName.style.borderColor = '#A7A7A7'
    inputSername.style.borderColor = '#A7A7A7'
    inputAge.style.borderColor = '#A7A7A7'
    inputTel.style.borderColor = '#A7A7A7'
    inputTell.style.borderColor = '#A7A7A7'
    inputAddress.style.borderColor = '#A7A7A7'

    console.log(typeof +(inputTel.value) != 'number');
    console.log(inputTel.value);
    
    if (inputName.value === '' || inputName.value.length > 50 || typeof inputTel.value != 'string') {
        
        inputName.style.borderColor = 'red'
        
    } else if (inputSername.value === '' || inputSername.value.length > 50 || typeof inputTel.value != 'string') {
        
        inputSername.style.borderColor = 'red'

    } else if (inputAge.value === '' || inputAge.value.length > 100 || typeof inputTel.value != 'string') {
        
        inputAge.style.borderColor = 'red'
        
    } else if (inputTel.value === '' || typeof +(inputTel.value) != 'number') {
        
        inputTel.style.borderColor = 'red'
        
    } else if (isNaN(parseInt(inputTel.value))) {
        
        inputTel.style.borderColor = 'red'
        
    } else if (!(/^(0?[1-9]|[12]\d|3[01])[\-](0?[1-9]|1[0-2])[\-](19|20)\d{2}$/.test(inputTell.value))) {

        inputTell.style.borderColor = 'red'
        
    } else if (inputAddress.value.length > 150) {

        inputAddress.style.borderColor = 'red'

    } else {
        const res = await fetch(api+'/postorders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem('token'),
                order_device_type: inputName.value,
                order_device_name: inputSername.value,
                order_device_bug: inputAge.value,
                order_price: inputTel.value,
                order_over_time: inputTell.value,
                order_about: inputAddress.value,
                client_id: localStorage.getItem('client_id'),
                company_id: +(localStorage.getItem('company'))
            })
        })

        const data = await res.json()
        if (data.status === 400) {
            alert(`Sizda buyurtma qo'shish huquqingiz yoq`)
            window.location = 'orders.html'
        } else if (data.status === 200) {
            window.location = 'orders.html'
        }
    }
})