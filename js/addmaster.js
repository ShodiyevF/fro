import { api } from './serverdomain.js'

const fullname = document.querySelector('.master_fullname');
const login = document.querySelector('.master_login');
const password = document.querySelector('.master_password');
const company = document.querySelector('.company');
const addmaster_btn = document.querySelector('.addmaster_btn');

(async () => {
    const res = await fetch(api + '/companys', {
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

    for (const i of data.data) {
        const option = document.createElement('option')
        option.value = i.company_id
        option.dataset.id = i.company_id
        option.textContent = i.company_fullname
        option.classList.add('company_option')
        company.appendChild(option)
    }

})()

addmaster_btn.onclick = async (e) => {
    fullname.style.borderColor = '#A7A7A7'
    login.style.borderColor = '#A7A7A7'
    password.style.borderColor = '#A7A7A7'
    company.style.borderColor = '#A7A7A7'

    
    if (!(fullname.value.length) || fullname.value.length > 54) {
        fullname.style.borderColor = 'red'
    } else if (!(login.value.length) || login.value.length > 54) {
        login.style.borderColor = 'red'
    } else if (!(password.value.length) || password.value.length > 7 || typeof +(password.value) != 'number') {
        password.style.borderColor = 'red'
    } else if (!(company.value) || typeof +(company.value) != 'number') {
        company.style.borderColor = 'red'
    } else {
        const res = await fetch(api + '/companys/workers/add',{
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem('token'),
                fullname: fullname.value,
                login: login.value,
                password: password.value,
                company_id: company.value
            })
        })

        const data = await res.json()

        if (data.status === 200) {
            window.location = '/workers.html'
        }
    }
}