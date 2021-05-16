const formEl = document.querySelector('#form');
const searchEl = document.querySelector('#search');
const pictureEl = document.querySelector('#image');
const fullNameEl = document.querySelector('#full-name');
const userNameEl = document.querySelector('#username');
const bioEl = document.querySelector('#bio');
const reposEl = document.querySelector('#repos');
const APIURL = 'https://api.github.com/users/';
const deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
const deviceHeight = screen.height;
const modalPopUp = document.querySelector('#myModal');

async function getData(username) {
    let data = await (await fetch(APIURL + username).catch(handleError)).json();
    let repos = await (await fetch(APIURL + username + '/repos').catch(handleError)).json();
    changeDOM(data, repos);
}

function handleError(error) {
    console.warn(error)
}

function changeDOM(user, repos) {
    if (!user.avatar_url) {
        modalPopUp.style.display = "block";
        return
    }
    pictureEl.setAttribute('src', user.avatar_url);
    fullNameEl.textContent = user.name;
    userNameEl.textContent = `@${user.login}`;
    bioEl.textContent = user.bio;

    reposEl.innerHTML = "";
    let repoCount = 0;
    let maxRepoCount = 15;
    if (deviceWidth < 721) maxRepoCount = 12;
    if (deviceWidth < 400) maxRepoCount = 8;
    if (deviceHeight < 750) maxRepoCount = 5;

    for (const repo of repos) {

        let repoEl = document.createElement("a");
        repoEl.classList.add("repo");
        repoEl.innerText = repo.name;
        repoEl.href = repo.html_url;
        if (repoCount < maxRepoCount) {
            reposEl.appendChild(repoEl);
            repoCount++;
        }

    }

}

function closeModal() {
    modalPopUp.style.display = "none";
}

getData('robinwettstaedt');

formEl.addEventListener('submit', (event) => {
    event.preventDefault();

    let input = searchEl.value
    if (input) getData(input);

});

window.onclick = function(event) {
    if (event.target !== modalPopUp) {
        modalPopUp.style.display = "none";
    }
}