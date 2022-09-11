import { api } from "./serverdomain.js";

const error_message = document.querySelector('.error_message');
const malumot = document.querySelector('.malumot');
const allcashspan = document.querySelector('.all-cash');
const allcountspan = document.querySelector('.all-count');
const inputFrom = document.querySelector('.input_from');
const inputTo = document.querySelector('.input_to');
const sendBtnDaily = document.querySelector('.send_btn_daily');
const results_list = document.querySelector('.results_list');

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

sendBtnDaily.onclick = async (e) => {
    
    const fromReg = inputFrom.value.match(/^(0?[1-9]|[12]\d|3[01])[\-](0?[1-9]|1[0-2])[\-](19|20)\d{2}$/)
    const toReg = inputTo.value.match(/^(0?[1-9]|[12]\d|3[01])[\-](0?[1-9]|1[0-2])[\-](19|20)\d{2}$/)
    
    inputFrom.style.borderColor = 'rgb(118, 118, 118)'
    inputTo.style.borderColor = 'rgb(118, 118, 118)'
    
    if (fromReg == null) {
        inputFrom.style.borderColor = 'red'
    } else if (toReg == null) {
        inputTo.style.borderColor = 'red'
    } else {
        const res = await fetch(api + '/cash/daily', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem('token'),
                company_id: localStorage.getItem('company'),
                from: inputFrom.value,
                to: inputTo.value
            })
        })
        
        const data = await res.json()
        results_list.innerHTML = ''
        if (!(data.data.length)) {
            // error_message.classList.remove('display_none')
        } else {
            // if (!(error_message.className.includes('display_none'))) {
            //     error_message.classList.add('display_none')
            // }

            let allcash = ''
            malumot.classList.add('display_none')
            
            // <li class="result_item">
            //     <h1 class="result_item_id">#000001</h1>
            //     <p class="result_item_name">Samsung A40</p>
            //     <p class="result_item_date">06-08-2022</p>
            //     <p class="result_item_over">06-08-2022</p>
            //     <h2 class="result_item_price">200.000 som</h2>
            // </li>

            let counterr = 0

            allcountspan.textContent = data.data.length
            
            for (const i of data.data) {

                counterr += 1

                allcash = +allcash + +(i.order_price)
                
                const order_id = i.order_idl.toString().length === 1 ? '#0000' + i.order_idl : i.order_idl.toString().length === 2 ? '#000' + i.order_idl : i.order_idl.toString().length === 3 ? '#00' + i.order_idl : i.order_idl.toString().length === 4 ? '#0' + i.order_idl : i.order_idl
                
                const counter = document.createElement('p')
                const user = document.createElement('p')
                const li = document.createElement('li')
                const h1 = document.createElement('h1')
                const device_name = document.createElement('p')
                const date = document.createElement('p')
                const over = document.createElement('p')
                const price = document.createElement('h2')
                
                counter.classList.add('result_item_count')
                user.classList.add('result_item_user')
                li.classList.add('result_item')
                h1.classList.add('result_item_id')
                device_name.classList.add('result_item_name')
                date.classList.add('result_item_date')
                over.classList.add('result_item_over')
                price.classList.add('result_item_price')
                
                counter.textContent = counterr
                user.textContent = i.user_fullname
                h1.textContent = order_id
                device_name.textContent = i.order_device_name
                date.textContent = i.to_char
                over.textContent = i.order_finished
                price.textContent = numberWithCommas(i.order_price) + ' So`m'
                
                
                li.appendChild(counter)
                li.appendChild(user)
                li.appendChild(h1)
                li.appendChild(device_name)
                li.appendChild(date)
                li.appendChild(over)
                li.appendChild(price)
                
                results_list.appendChild(li)
                
            }

            allcashspan.textContent = numberWithCommas(allcash)
            
            
        }
    }
}
