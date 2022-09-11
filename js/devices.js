import { api } from './serverdomain.js'


const workers_list = document.querySelector('.workers_list')

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
    for (const i of data.data) {
        // <li class="workers_item">
        //     <h1 class="user_info user_info--company">company</h1>
        //     <input class="edit_name display_none" type="text" placeholder="Qurilma nomi">
        //         <p class="user_info user_info--company_name">Tahrirlash</p>
        // </li>
        const li = document.createElement('li') 
        const h1 = document.createElement('h1') 
        const input = document.createElement('input') 
        const p = document.createElement('p') 
        
        li.classList.add('workers_item')
        h1.classList.add('user_info', 'user_info--company')
        input.classList.add('edit_name', 'display_none')
        p.classList.add('user_info', 'user_info--company_name')
        
        h1.dataset.id = i.device_id
        p.dataset.id = i.device_id
        input.dataset.id = i.device_id
        
        input.type = 'text'
        input.placeholder = 'Qurilma nomi'
        
        h1.textContent = i.device_name
        p.textContent = 'Tahrirlash'
        
        li.appendChild(h1)
        li.appendChild(input)
        li.appendChild(p)
        workers_list.appendChild(li)
    }
    
    const namea = document.querySelectorAll('.user_info--company')
    const user_info_edit_s = document.querySelectorAll('.user_info--company_name')
    const user_info = document.querySelectorAll('.user_info')
    const inputa = document.querySelectorAll('.edit_name')
    
    const result_name = []
    for (const i of namea) {
        result_name.push(i)
    }
    
    const result = []
    for (const i of inputa) {
        result.push(i)
        
        i.onkeyup = async (e) => {
            if (e.keyCode == '13') {
                if (i.value.length) {
                    const res = await fetch(api + '/order/device/put', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            token: localStorage.getItem('token'),
                            device_name: i.value,
                            device_id: i.dataset.id,
                            company_id: +(localStorage.getItem('company'))
                        })
                    })

                    location.reload()

                } else {
                    i.style.borderColor = 'red'
                }
            }
        }
    }
    
    for (const i of user_info_edit_s) {
        i.ondblclick = (e) => {
            const input = result.find(el => el.dataset.id == e.target.dataset.id)
            const name = result_name.find(el => el.dataset.id == e.target.dataset.id) 
            input.value = name.textContent
            input.style.borderColor = 'black'
            if (input.classList[1]) {
                input.classList.remove('display_none')
                name.classList.add('display_none')
            } else {
                input.classList.add('display_none')
                name.classList.remove('display_none')
            }
        }
        
    }
    
}

getDeviceTypes()