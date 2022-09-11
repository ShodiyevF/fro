import { api } from "./serverdomain.js";

async function checkadmin (){
    const res = await fetch(api+'/admin/get',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('token')
        })
    })
    const data = await res.json()
    if (data.status === 404) {
        window.location = 'main.html'
    }
}

checkadmin()