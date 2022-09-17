import {api} from './serverdomain.js'

(async () => {
    
    const res = await fetch(api+'/companys', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        company_id: localStorage.getItem('company') ? localStorage.getItem('company') : 0,
        token: localStorage.getItem('token')    
    })})
    
    const data = await res.json()
    
    console.log(data);
    if (!(localStorage.getItem('company'))) {
        localStorage.setItem('company', data.data[0].company_id)
    }

})()

async function checktoken() {
    const res = await fetch(api+'/checktoken',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('token')
        })
    })
    const data = await res.json()
    if (data.status != 200) {
        window.location = '/index.html'
    }
}

checktoken()