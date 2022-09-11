import { api } from "./serverdomain.js"

(async () => {
    const res = await fetch(api + '/cash/daily', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            company_id: localStorage.getItem('company'),
            from: '2022-08-05 22:07:53.064327+05',
            to: '2022-08-06 17:45:43.808795+05'
        })
    })
    const data = await res.json()
})()