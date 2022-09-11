import { api } from "./serverdomain.js"

const list = document.querySelector('.left_main_list');

const cash = document.querySelector('.left_item_cash');
const statistic = document.querySelector('.left_item_statistic');
const settings = document.querySelector('.left_item_settings');

(async () => {
    const res = await fetch(api + '/companys/owner', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('token')
        })
    })
    
    const check = await res.json()
    if (check.status === 200) {
        list.innerHTML = `<li class="left_main_item left_item_users left_itemm">
                        <a class="left_main_item_link" href="users.html">
                            <img class="left_main_item_img" src="img/main/mijozlar.svg" alt="">
                            <p class="left_main_item_text">Mijozlar</p>
                        </a>
                    </li>
                    <li class="left_main_item left_item_orders left_itemm">
                        <a class="left_main_item_link" href="orders.html">
                            <img class="left_main_item_img" src="img/main/orders.svg" alt="">
                            <p class="left_main_item_text">Buyurtmalar</p>
                        </a>
                    </li>
                    <li class="left_main_item left_item_cash left_itemm">
                        <a class="left_main_item_link" href="cash.html">
                            <img class="left_main_item_img" src="img/main/moliya.svg" alt="">
                            <p class="left_main_item_text">Moliya</p>
                        </a>
                    </li>
                    <li class="left_main_item left_item_statistic left_itemm">
                        <a class="left_main_item_link" href="statistic.html">
                            <img class="left_main_item_img" src="img/main/statistic.svg" alt="">
                            <p class="left_main_item_text">Statistka</p>
                        </a>
                    </li>`
    }
    if (check.status != 200) {
        list.innerHTML = `<li class="left_main_item left_item_users left_itemm">
                        <a class="left_main_item_link" href="users.html">
                            <img class="left_main_item_img" src="img/main/mijozlar.svg" alt="">
                            <p class="left_main_item_text">Mijozlar</p>
                        </a>
                    </li>
                    <li class="left_main_item left_item_orders left_itemm">
                        <a class="left_main_item_link" href="orders.html">
                            <img class="left_main_item_img" src="img/main/orders.svg" alt="">
                            <p class="left_main_item_text">Buyurtmalar</p>
                        </a>
                    </li>`
    }

    const elLeftItem = document.querySelectorAll('.left_main_item')
    const left = document.querySelectorAll('.left_itemm')
    
    const classs = localStorage.getItem('route_class')
    
    const elItemUsers = document.querySelector('.left_item_users')
    if (classs === 'left_item_users') {
        elItemUsers.classList.add('left_main_item--active')
    }
    
    const elItemOrders = document.querySelector('.left_item_orders')
    if (classs === 'left_item_orders') {
        elItemOrders.classList.add('left_main_item--active')
    }

    const elItemCash = document.querySelector('.left_item_cash')
    if (classs === 'left_item_cash') {
        elItemCash.classList.add('left_main_item--active')
    }

    const elItemStatistic = document.querySelector('.left_item_statistic')
    if (classs === 'left_item_statistic') {
        elItemStatistic.classList.add('left_main_item--active')
    }


    for (const i of left) {
        i.onclick = (e) => {
            localStorage.setItem('route_class', i.classList[1])
            for (const j of elLeftItem) {
                j.classList.remove('left_main_item--active')
            }
            i.classList.add('left_main_item--active')
        }
    }
})()