import { api } from './serverdomain.js'

const fullname = document.querySelector('.master_fullname');
const addmaster_btn = document.querySelector('.addmaster_btn');
const company = document.querySelector('.company');

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
    company.value = localStorage.getItem('company')

})()

addmaster_btn.onclick = async (e) => {
    fullname.style.borderColor = '#A7A7A7'

    if (!(fullname.value.length) || fullname.value.length > 54) {
        fullname.style.borderColor = 'red'
    } else {
        const res = await fetch(api + '/order/device/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem('token'),
                device_name: fullname.value,
                company_id: company.value
            })
        })

        const data = await res.json()

        if (data.status === 200) {
            window.location = '/devices.html'
        }
    }
}