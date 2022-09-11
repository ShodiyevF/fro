import {api} from './serverdomain.js'

const form = document.querySelector('.login_form')
const input = document.querySelector('.login_input')

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    console.log('asd');

    const res = await fetch(api+'/recoverpass',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: input.value 
        })
    })
    const data = await res.json()

    if (data.status === 200) {
        await (window.location = '/index.html')
        localStorage.setItem('newpass', 1)
    } else {
        input.classList.add('error_border_color')
    }
    
})