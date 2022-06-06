let maincontent = document.getElementById('app-container')
let nextbtn = document.getElementById('nextbtn')
console.log(nextbtn)
async function getuser() {
    let url = 'https://randomuser.me/api/';
    let response = await fetch(url)
    let result = await response.json()
    return result['results']

}

async function renderuser() {
    let users = await getuser()
    return users
}

function cvIterator(profiles) {
    let nextIndex = 0;
    return {
        next: function () {
            if (nextIndex < profiles.length) {
                return {
                    value: profiles[nextIndex++],
                    done: false
                }
            } else {
                return {
                    done: true
                }
            }
        }
    }
}
nextCV()
async function nextCV() {
    let data = await getuser();
    let currentCandidate = cvIterator(data).next().value
    let image = document.getElementById("photo");
    let name = document.getElementById("name");
    let dob = document.getElementById("dob");
    let list = document.getElementById("list");
    // console.log(currentCandidate)
    image.src = currentCandidate['picture']['large'];
    name.innerText = currentCandidate['name']['title'] + " " + currentCandidate['name']['first'] + " " + currentCandidate['name']['last'];
    dob.innerHTML = 'DOB: ' + currentCandidate.dob.date.slice(0, 13) + '<br>' + 'Age: ' + currentCandidate.dob.age;
    list.innerHTML = `<li class="list-group-item">Phone: ${currentCandidate.phone}</li>
                <li class="list-group-item">E-mail: ${currentCandidate.email}</li>
                <li class="list-group-item">ID: ${currentCandidate.id.value}</li>`
}
nextbtn.addEventListener('click', nextCV);