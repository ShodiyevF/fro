import { api } from "./serverdomain.js";


const right_header_title = document.querySelector('.right_header_title');

const input = document.querySelectorAll('input');
const company_name = document.querySelector('.company_name');
const workers_list_info = document.querySelector('.workers_list_info');
const next = document.querySelector('.next');

const user_info_fir = document.querySelector('.user_info--fir');
const user_info_sur = document.querySelector('.user_info--sur');
const user_auth_login = document.querySelector('.user_auth--login');
const user_auth_password = document.querySelector('.user_auth--password');

const read_user = document.querySelector('#read_user');
const add_user = document.querySelector('#add_user');
const delete_user = document.querySelector('#delete_user');
const put_user = document.querySelector('#put_user');

const read_order = document.querySelector('#read_order');
const add_order = document.querySelector('#add_order');
const delete_order = document.querySelector('#delete_order');
const put_order = document.querySelector('#put_order');

const orderStatusChange = document.querySelectorAll('.order');
const orderStatusChangeLabel = document.querySelectorAll('.order_label');

const daliy_cash = document.querySelector('#daliy_cash');

var modal = document.getElementById("myModal");

var span = document.getElementsByClassName("prev")[0];

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


workers_list_info.ondblclick = async (e) => {
    modal.style.display = "block";
}

next.onclick = async (e) => {
    const res = await fetch(api + '/companys/workers/delete', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('token'),
            user_id: localStorage.getItem('idu')
        })
    })
    
    const data = await res.json()

    if (data.status == 200) {
        window.location = '/workers.html'
    }
}


(async ()=> {
    const res = await fetch(api + '/companys/workers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('token')
        })
    })
    
    const data = await res.json()
    
    const findedData = data.data.find(el => el.user_id === +(localStorage.getItem('idu')))

    document.querySelector('title').textContent = findedData.user_fullname
    right_header_title.textContent = findedData.user_fullname
    
    user_info_fir.textContent = findedData.user_fullname.split(' ')[0]
    user_info_sur.textContent = findedData.user_fullname.split(' ')[1]
    
    user_auth_login.textContent = findedData.user_login
    user_auth_password.textContent = findedData.user_password

    
    const companysResponse = await fetch(api + '/companys', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('token'),
            company_id: +(localStorage.getItem('company'))
        })
    })
    
    const companys = await companysResponse.json()

    // const findedDataa = companys.data.find(el => el.user_id === +(localStorage.getItem('idu')))
    
    for (const i of companys.data) {
        const option = document.createElement('option')
        option.value = i.company_id
        option.dataset.id = i.company_id
        option.textContent = i.company_fullname
        option.classList.add('company_option')
        company_name.appendChild(option)
    }

    company_name.value = findedData.company_id

})()

company_name.onchange = async (e) => {
    const res = await fetch(api + '/companys/workers/put', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('token'),
            user_id: +(localStorage.getItem('idu')),
            company_id: e.target.value
        })
    })

    const data = await res.json()
}



async function getpermissions() {
    const res = await fetch(api + '/companys/workers/permissions/get', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('token'),
            user_id: +(localStorage.getItem('idu'))
        })
    })

    // const status = (await res.json()).status
    const data = await res.json()
    
    const dat = data.data
    console.log(dat);

    const statuts = []
    for (const i of orderStatusChange) {
        statuts.push(i)
    }

    const statutsLabel = []
    for (const i of orderStatusChangeLabel) {
        statutsLabel.push(i)
    }

    
    for (const i of dat) {
        const asd = statuts.filter(el => el.id.split(' ')[0] == i.permissions_name)
        for (const i of asd) {
            i.checked = true
        }

        if (i.action_id === 1 && i.permissions_names_id === 1) {
            read_user.checked = true
        }

        if (i.action_id === 1 && i.permissions_names_id === 2) {
            add_user.checked = true
        }

        if (i.action_id === 1 && i.permissions_names_id === 3) {
            delete_user.checked = true
        }

        if (i.action_id === 1 && i.permissions_names_id === 4) {
            put_user.checked = true
        }


        if (i.action_id === 2 && i.permissions_names_id === 1) {
            read_order.checked = true
        }

        if (i.action_id === 2 && i.permissions_names_id === 2) {
            add_order.checked = true
        }

        if (i.action_id === 2 && i.permissions_names_id === 3) {
            delete_order.checked = true
        }

        if (i.action_id === 2 && i.permissions_names_id === 4) {
            put_order.checked = true
        }

        console.log(i.action_id, i.permissions_names_id);
        
        if (i.action_id === 3 && i.permissions_names_id === 1) {
            daliy_cash.checked = true
        }

        

    }
    
}

getpermissions()

for (const i of input) {
    i.onclick = async (e) => {
        const user = e.target.id.includes('read') ? 1 : e.target.id.includes('add') ? 2 : e.target.id.includes('delete') ? 3 : e.target.id.includes('to') ? e.target.id.split(' ')[0] : 4
        const res = await fetch(api + '/companys/workers/permissions/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem('token'),
                user_id: localStorage.getItem('idu'),
                action: e.target.id.includes('order') ? 2 : e.target.id.includes('user') ? 1 : 3,
                name: user
            })
        })

        const data = await res.json()
    }
}