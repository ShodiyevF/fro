import {api} from './serverdomain.js'

const companys = document.querySelector(".companys")
const active_company = document.querySelector(".active_company")
const logout_btn = document.querySelector(".logout_btn")
const create_company_input = document.querySelector(".create_company_input")
const create_company_btn = document.querySelector(".create_company_btn")


const addcompany = document.querySelector(".addcompany");
const line = document.querySelectorAll(".line");
const workers_links = document.querySelector(".workers_links");
const workers_link = document.querySelector(".workers_link");

(async () => {
    const res = await fetch(api + '/companys/owner', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('token')
        })}) 

    const data = await res.json()

    if (data.status === 400) {
        addcompany.remove()
        workers_links.remove()
        workers_link.remove()
        for (const i of line) {
            i.remove()
        }
    }
})()


logout_btn.onclick = (e) => {
    localStorage.clear()
    window.location = '/index.html'
}

companys.onchange = (e) => {
    const value = +(companys.value)
    localStorage.setItem('company', value)
    location.reload()
}

create_company_btn.onclick = async (e) => {
    if (create_company_input.value) {
        const res = await fetch(api+'/companys/create',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem('token'),
                company_name: create_company_input.value
            })
        })

        create_company_input.value = ''
        if ((await res.json()).status === 200) {
            location.reload()
        } else {
            alert('siz companiyani asoschisi emassiz !')
        }
    }
}

(async () => {
    const res = await fetch(api+'/companys', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        token: localStorage.getItem('token'),
        company_id: +(localStorage.getItem('company'))
    })})
    
    const data = await res.json()

    const activecompany = localStorage.getItem('company')

    if (!activecompany) {
        localStorage.setItem('company', data.data[0].company_id)
    }
    
    for (const i of data.data) {
        const option = document.createElement('option')
        option.value = i.company_id
        option.dataset.id = i.company_id
        option.textContent = i.company_fullname
        option.classList.add('company_option')
        companys.appendChild(option)
    }

    const option = document.querySelectorAll('option')
    const a = []
    for (const i of option) {
        a.push(i)
    }
    
    const tes = a.find(el => el.dataset.id == (+(localStorage.getItem('company')) ? +(localStorage.getItem('company')) : 1))

    active_company.textContent = 'Aktiv companiya: ' + tes.innerHTML

    companys.value = (+(localStorage.getItem('company')) ? +(localStorage.getItem('company')) : 1)  

    if (companys.length === 1) {
        localStorage.setItem('company', companys[0].dataset.id)
    }

})()