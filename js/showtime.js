const elTime = document.querySelector('.right_header_time')
const elDate = document.querySelector('.right_header_date')

function showTime() {
    let date = new Date();
    let h = date.getHours(); // 0 - 23
    let m = date.getMinutes(); // 0 - 59
    let d = date.getDate() // 0 - 59
    let mo = date.getMonth() // 0 - 59
    let y = date.getFullYear() // 0 - 59

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    const a = (mo+1).toString().length === 1 ? '0' + (mo+1) : mo+1

    let time = h + ":" + m;
    elTime.innerText = time;
    elTime.textContent = time;
    elDate.innerText = `${d}.${a}.${y}`;
    elDate.textContent = `${d}.${a}.${y}`;

    setTimeout(showTime, 1000);
}

showTime();