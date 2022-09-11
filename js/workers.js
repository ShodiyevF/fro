import { api } from "./serverdomain.js";

const workers_list = document.querySelector('.workers_list');
const addmaster = document.querySelector('.addmaster');

addmaster.onclick = (e) => {
    window.location = '/addmaster.html'
}

async function name() {
    
    const res = await fetch(api + '/companys/workers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('token')
        })
    }
    )
    
    const data = await res.json()
    
    for (const i of data.data) {
        
        const li = document.createElement('li')
        const a = document.createElement('div')
        const workers_info_wrapper = document.createElement('div')
        const workers_list_info = document.createElement('div')
        const user_info_sur = document.createElement('a')
        const user_info_fir = document.createElement('a')
        const workers_list_auth = document.createElement('div')
        const user_auth_login = document.createElement('p')
        const user_auth_password = document.createElement('p')
        const logins = document.createElement('span')
        const loginss = document.createElement('span')
        const hr = document.createElement('hr')
        const company_wrapper = document.createElement('div')
        const user_info_company = document.createElement('h1')
        const user_info_company_name = document.createElement('p')
        
        if (i.user_delete == 1) {
            li.style.backgroundColor = 'rgb(241, 129, 148)'
        }
        
        a.href = 'worker.html'
        user_info_sur.href = 'worker.html'
        user_info_fir.href = 'worker.html'
        a.dataset.id = i.user_id
        user_info_sur.dataset.id = i.user_id
        user_info_fir.dataset.id = i.user_id
        
        li.classList.add('workers_item')
        a.classList.add('workers_link')
        workers_info_wrapper.classList.add('workers_info_wrapper')
        workers_list_info.classList.add('workers_list_info')
        user_info_sur.classList.add('user_info', 'user_info--sur')
        user_info_fir.classList.add('user_info', 'user_info--fir')
        workers_list_auth.classList.add('workers_list_auth')
        user_auth_login.classList.add('user_auth', 'user_auth--login')
        user_auth_password.classList.add('user_auth', 'user_auth--password')
        logins.classList.add('logins')
        loginss.classList.add('loginss')
        hr.classList.add('line')
        company_wrapper.classList.add('company_wrapper')
        user_info_company.classList.add('user_info', 'user_info--company')
        user_info_company_name.classList.add('user_info', 'user_info--company_name')
        
        user_info_sur.textContent = i.user_fullname.split(' ')[0]
        user_info_fir.textContent = i.user_fullname.split(' ')[1]
        
        logins.textContent = 'L'
        loginss.textContent = 'P'
        
        user_auth_login.innerHTML = `<span class="logins">L</span>: ${i.user_login}`
        user_auth_password.innerHTML = `<span class="logins">P</span>: ${i.user_password}`
        
        
        user_info_company.textContent = 'company'
        user_info_company_name.textContent = i.company_fullname
        
        workers_list_info.appendChild(user_info_sur)
        workers_list_info.appendChild(user_info_fir)
        
        workers_list_auth.appendChild(user_auth_login)
        workers_list_auth.appendChild(user_auth_password)
        
        
        
        workers_info_wrapper.appendChild(workers_list_info)
        workers_info_wrapper.appendChild(workers_list_auth)
        
        a.appendChild(workers_info_wrapper)
        a.appendChild(hr)
        
        company_wrapper.appendChild(user_info_company)
        company_wrapper.appendChild(user_info_company_name)
        
        a.appendChild(company_wrapper)
        
        li.appendChild(a)
        
        workers_list.appendChild(li)
    }
    
    const as = document.querySelectorAll('.workers_link')
    const fir = document.querySelectorAll('.user_info--sur')
    const sur = document.querySelectorAll('.user_info--fir')

    for (const i of fir) {
        i.onclick = (e) => {
            localStorage.setItem('idu', e.target.dataset.id)
        }
    }

    for (const i of sur) {
        i.onclick = (e) => {
            localStorage.setItem('idu', e.target.dataset.id)
        }
    }
    
    for (const i of as) {
        i.onclick = (e) => {
            localStorage.setItem('idu', e.target.dataset.id)
        }
    }
    
}

name()