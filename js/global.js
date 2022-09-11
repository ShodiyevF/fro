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
        list.innerHTML = `<li class="left_main_item left_item_users">
                        <a class="left_main_item_link" href="users.html">
                            <img class="left_main_item_img" src="img/main/mijozlar.svg" alt="">
                            <p class="left_main_item_text">Mijozlar</p>
                        </a>
                    </li>
                    <li class="left_main_item left_item_orders">
                        <a class="left_main_item_link" href="orders.html">
                            <img class="left_main_item_img" src="img/main/orders.svg" alt="">
                            <p class="left_main_item_text">Buyurtmalar</p>
                        </a>
                    </li>
                    <li class="left_main_item left_item_cash">
                        <a class="left_main_item_link" href="cash.html">
                            <img class="left_main_item_img" src="img/main/moliya.svg" alt="">
                            <p class="left_main_item_text">Moliya</p>
                        </a>
                    </li>
                    <li class="left_main_item left_item_statistic">
                        <a class="left_main_item_link" href="statistic.html">
                            <img class="left_main_item_img" src="img/main/statistic.svg" alt="">
                            <p class="left_main_item_text">Statistka</p>
                        </a>
                    </li>`
    }
    if (check.status != 200) {
        list.innerHTML = `<li class="left_main_item left_item_users">
                        <a class="left_main_item_link" href="users.html">
                            <img class="left_main_item_img" src="img/main/mijozlar.svg" alt="">
                            <p class="left_main_item_text">Mijozlar</p>
                        </a>
                    </li>
                    <li class="left_main_item left_item_orders">
                        <a class="left_main_item_link" href="orders.html">
                            <img class="left_main_item_img" src="img/main/orders.svg" alt="">
                            <p class="left_main_item_text">Buyurtmalar</p>
                        </a>
                    </li>`
        cash.remove()
        statistic.remove()
    }
})()