import { api } from "./serverdomain.js";

const right_header_input = document.querySelector('.right_header_input')
const users_list = document.querySelector('.users_list')
const user_deleter = document.querySelector('.user_deleter')

right_header_input.onkeyup = async (e) => {
    right_header_input.style.borderColor = 'black'
    if (e.keyCode === 13) {
        const res = await fetch(api + '/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                key: right_header_input.value,
                token: localStorage.getItem('token'),
                company_id: localStorage.getItem('company'),
                action: 1
            })
        })

        const data = await res.json()
        console.log(data);

        right_header_input.style.borderColor = 'black'
        right_header_input.style.outlineColor = 'black'
        if (data.status === 200) {
            if (data.role === 1) {
                users_list.innerHTML = ''
                for (const i of data.data) {
                    const asd = i.client_add_date.split('-')
                    let tes = asd[2][0] + asd[2][1] + '-' + asd[1] + '-' + asd[0]

                    const div_users_status_img_wrapper = document.createElement('div')
                    const div_fullname = document.createElement('div')
                    const div_phonenumber = document.createElement('div')

                    const li = document.createElement('li')
                    const p_user_id = document.createElement('p')
                    const img_status = document.createElement('img')
                    const a_fullname_link = document.createElement('a')
                    const p_fullname = document.createElement('p')
                    const a_phonenumber_first = document.createElement('a')
                    const a_phonenumber_second = document.createElement('a')
                    const p_date = document.createElement('p')
                    const button_info = document.createElement('button')

                    li.classList.add('users_item')
                    if (i.client_delete === 1) {
                        li.classList.add('deleted_user')
                    }

                    p_user_id.classList.add('user_text', 'user_id')
                    div_users_status_img_wrapper.classList.add('users_status_img_wrapper')
                    img_status.classList.add('users_status_img')
                    div_fullname.classList.add('user_fullname_wrapper')
                    a_fullname_link.classList.add('user_fullname_link')
                    p_fullname.classList.add('user_text', 'user_fullname')
                    p_fullname.dataset.client_id = i.client_id
                    div_phonenumber.classList.add('user_phonenumber_wrapper')
                    a_phonenumber_first.classList.add('user_text', 'user_phonenumber_1')
                    a_phonenumber_second.classList.add('user_text', 'user_phonenumber_2')
                    p_date.classList.add('user_text', 'user_date')
                    button_info.dataset.client_id = i.client_id
                    button_info.classList.add('user_info', 'user_info_btn')


                    const client_id = i.client_idd.toString().length === 1 ? '@ 00000' + i.client_idd : i.client_idd.toString().length === 2 ? '@ 0000' + i.client_idd : i.client_idd.toString().length === 3 ? '@ 000' + i.client_idd : i.client_idd.toString().length === 4 ? '@ 00' + i.client_idd : i.client_idd.toString().length === 5 ? '@ 0' + i.client_idd : i.client_idd.toString().length === 6 ? i.client_idd : i.client_idd

                    p_user_id.textContent = client_id
                    img_status.src = i.client_status === 1 ? './../img/users/tanish.svg' : i.client_status === 2 ? './../img/users/muammo.svg' : i.client_status === 3 ? './../img/users/yaxshi.svg' : './../img/users/sinalmagan.svg'

                    p_fullname.textContent = i.client_fullname
                    a_phonenumber_first.textContent = '+' + '998' + i.client_phone_number_first
                    a_phonenumber_second.textContent = '+' + '998' + i.client_phone_number_second
                    p_date.textContent = tes

                    a_fullname_link.href = 'user.html'
                    a_phonenumber_first.href = `tel:${i.client_phone_number_first}`
                    a_phonenumber_second.href = `tel:${i.client_phone_number_second}`

                    div_users_status_img_wrapper.appendChild(img_status)
                    div_fullname.appendChild(a_fullname_link)
                    a_fullname_link.appendChild(p_fullname)
                    div_phonenumber.appendChild(a_phonenumber_first)
                    div_phonenumber.appendChild(a_phonenumber_second)
                    li.appendChild(p_user_id)
                    li.appendChild(div_users_status_img_wrapper)
                    li.appendChild(div_fullname)
                    li.appendChild(div_phonenumber)
                    li.appendChild(p_date)
                    li.appendChild(button_info)
                    users_list.appendChild(li)



                }
                const btn = document.querySelectorAll('.user_info_btn');
                const modal_user_date = document.querySelector('.modal_user_date');
                const modal_user_id = document.querySelector('.modal_user_id');
                const modal_user_fullname = document.querySelector('.modal_user_fullname');
                const modal_user_info_text = document.querySelector('.modal_user_info_text');
                const user_fullname_linkAll = document.querySelectorAll('.user_fullname_link');
                const user_fullname_linkAlla = document.querySelectorAll('.user_fullname');

                for (const i of user_fullname_linkAlla) {
                    i.onclick = (e) => {
                        localStorage.setItem('client_id', e.target.dataset.client_id)
                    }
                }

                var modal = document.getElementById("myModal");
                var span = document.getElementsByClassName("close")[0];

                span.onclick = function () {
                    modal.style.display = "none";
                }

                window.onclick = function (event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }

                for (const i of btn) {
                    i.onclick = async (e) => {
                        modal.style.display = "block";

                        const about_user = data.data.find(el => el.client_id === e.target.dataset.client_id)

                        console.log(about_user);
                        const asd = about_user.client_add_date.split('-')
                        let tes = asd[2][0] + asd[2][1] + '.' + asd[1] + '.' + asd[0];
                        console.log(about_user);
                        const client_dasdidd = about_user.client_idd.toString().length === 1 ? '@ 00000' + about_user.client_idd : about_user.client_idd.toString().length === 2 ? '@ 0000' + about_user.client_idd : about_user.client_idd.toString().length === 3 ? '@ 000' + about_user.client_idd : about_user.client_idd.toString().length === 4 ? '@ 00' + about_user.client_idd : about_user.client_idd.toString().length === 5 ? '@ 0' + about_user.client_idd : about_user.client_idd.toString().length === 6 ? about_user.client_idd : about_user.client_idd
                        // const client_id = i.client_id.toString().length === 1 ? '@ 00000' + i.client_id : i.client_id.toString().length === 2 ? '@ 0000' + i.client_id : i.client_id.toString().length === 3 ? '@ 000' + i.client_id : i.client_id.toString().length === 4 ? '@ 00' + i.client_id : i.client_id.toString().length === 5 ? '@ 0' + i.client_id : i.client_id.toString().length === 6 ? i.client_id : i.client_id


                        modal_user_date.textContent = tes;
                        modal_user_id.textContent = client_dasdidd;
                        modal_user_fullname.textContent = about_user.client_fullname;
                        modal_user_info_text.textContent = about_user.client_about;

                        if (about_user.client_delete) {
                            const deleteRes = await fetch(api + '/user/' + about_user.client_deleter)
                            const dataa = await deleteRes.json()
                            user_deleter.classList.remove('display_none')
                            user_deleter.textContent = dataa.data[0].user_fullname
                        }
                        

                    }
                }
            } else {
                right_header_input.style.borderColor = 'red'
                right_header_input.style.outlineColor = 'red'
            }
        } else {
            users_list.innerHTML = '';
            (async () => {
                const res = await fetch(api + '/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token: localStorage.getItem('token') ? localStorage.getItem('token') : 'asd',
                        company_id: localStorage.getItem('company') ? localStorage.getItem('company') : 1
                    })
                })

                const data = await res.json()

                console.log(data);

                if (data.status != 200) {
                    messageModal.textContent = `Siz da "Mijozlar" bo'limini ko'rish huquqi yoq`
                    messageModal.classList.remove('display_none')
                    rightMain.classList.add('display_none')
                } else {
                    if (!(data.data.length)) {
                        usersSection.style.display = 'none'
                        messageModall.textContent = 'Mijozlar yoq !'
                        messageModall.classList.remove('display_none')
                    } else {
                        for (const i of data.data) {
                            const asd = i.client_add_date.split('-')
                            let tes = asd[2][0] + asd[2][1] + '-' + asd[1] + '-' + asd[0]

                            const div_users_status_img_wrapper = document.createElement('div')
                            const div_fullname = document.createElement('div')
                            const div_phonenumber = document.createElement('div')

                            const li = document.createElement('li')
                            const p_user_id = document.createElement('p')
                            const img_status = document.createElement('img')
                            const a_fullname_link = document.createElement('a')
                            const p_fullname = document.createElement('p')
                            const a_phonenumber_first = document.createElement('a')
                            const a_phonenumber_second = document.createElement('a')
                            const p_date = document.createElement('p')
                            const button_info = document.createElement('button')

                            li.classList.add('users_item')

                            if (i.client_delete === 1) {
                                li.classList.add('deleted_user')
                            }

                            p_user_id.classList.add('user_text', 'user_id')
                            div_users_status_img_wrapper.classList.add('users_status_img_wrapper')
                            img_status.classList.add('users_status_img')
                            div_fullname.classList.add('user_fullname_wrapper')
                            a_fullname_link.classList.add('user_fullname_link')
                            p_fullname.classList.add('user_text', 'user_fullname')
                            p_fullname.dataset.client_id = i.client_id
                            div_phonenumber.classList.add('user_phonenumber_wrapper')
                            a_phonenumber_first.classList.add('user_text', 'user_phonenumber_1')
                            a_phonenumber_second.classList.add('user_text', 'user_phonenumber_2')
                            p_date.classList.add('user_text', 'user_date')
                            button_info.dataset.client_id = i.client_id
                            button_info.classList.add('user_info', 'user_info_btn')


                            const client_id = i.client_id.toString().length === 1 ? '@ 00000' + i.client_id : i.client_id.toString().length === 2 ? '@ 0000' + i.client_id : i.client_id.toString().length === 3 ? '@ 000' + i.client_id : i.client_id.toString().length === 4 ? '@ 00' + i.client_id : i.client_id.toString().length === 5 ? '@ 0' + i.client_id : i.client_id.toString().length === 6 ? i.client_id : i.client_id

                            p_user_id.textContent = client_id
                            img_status.src = i.client_status === 1 ? './../img/users/tanish.svg' : i.client_status === 2 ? './../img/users/muammo.svg' : i.client_status === 3 ? './../img/users/yaxshi.svg' : './../img/users/sinalmagan.svg'

                            p_fullname.textContent = i.client_fullname
                            a_phonenumber_first.textContent = '+' + '998' + i.client_phone_number_first
                            a_phonenumber_second.textContent = '+' + '998' + i.client_phone_number_second
                            p_date.textContent = tes

                            a_fullname_link.href = 'user.html'
                            a_phonenumber_first.href = `tel:${i.client_phone_number_first}`
                            a_phonenumber_second.href = `tel:${i.client_phone_number_second}`

                            div_users_status_img_wrapper.appendChild(img_status)
                            div_fullname.appendChild(a_fullname_link)
                            a_fullname_link.appendChild(p_fullname)
                            div_phonenumber.appendChild(a_phonenumber_first)
                            div_phonenumber.appendChild(a_phonenumber_second)
                            li.appendChild(p_user_id)
                            li.appendChild(div_users_status_img_wrapper)
                            li.appendChild(div_fullname)
                            li.appendChild(div_phonenumber)
                            li.appendChild(p_date)
                            li.appendChild(button_info)
                            users_list.appendChild(li)

                        }
                    }
                }

                const btn = document.querySelectorAll('.user_info_btn');
                const modal_user_date = document.querySelector('.modal_user_date');
                const modal_user_id = document.querySelector('.modal_user_id');
                const modal_user_fullname = document.querySelector('.modal_user_fullname');
                const modal_user_info_text = document.querySelector('.modal_user_info_text');
                const user_fullname_linkAll = document.querySelectorAll('.user_fullname_link');
                const user_fullname_linkAlla = document.querySelectorAll('.user_fullname');

                for (const i of user_fullname_linkAlla) {
                    i.onclick = (e) => {
                        localStorage.setItem('client_id', +(e.target.dataset.client_id))
                    }
                }

                var modal = document.getElementById("myModal");
                var span = document.getElementsByClassName("close")[0];

                span.onclick = function () {
                    modal.style.display = "none";
                }

                window.onclick = function (event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }

                for (const i of btn) {
                    i.onclick = async (e) => {
                        modal.style.display = "block";

                        const about_user = data.data.find(el => el.client_id === +(e.target.dataset.client_id))

                        const asd = about_user.client_add_date.split('-')
                        let tes = asd[2][0] + asd[2][1] + '-' + asd[1] + '-' + asd[0];
                        const client_dasdidd = about_user.client_id.toString().length === 1 ? '@ 00000' + about_user.client_id : about_user.client_id.toString().length === 2 ? '@ 0000' + about_user.client_id : about_user.client_id.toString().length === 3 ? '@ 000' + about_user.client_id : about_user.client_id.toString().length === 4 ? '@ 00' + about_user.client_id : about_user.client_id.toString().length === 5 ? '@ 0' + about_user.client_id : about_user.client_id.toString().length === 6 ? about_user.client_id : about_user.client_id

                        modal_user_date.textContent = tes;
                        modal_user_id.textContent = client_dasdidd;
                        modal_user_fullname.textContent = about_user.client_fullname;
                        modal_user_info_text.textContent = about_user.client_about;

                        if (about_user.client_delete) {
                            const deleteRes = await fetch(api + '/user/' + about_user.client_deleter)
                            const dataa = await deleteRes.json()
                            user_deleter.classList.remove('display_none')
                            user_deleter.textContent = dataa.data[0].user_fullname
                        }

                    }
                }
            })()
        }
    }
}