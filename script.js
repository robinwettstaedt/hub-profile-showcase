const formEl = document.querySelector('#form');
const searchEl = document.querySelector('#search');
const pictureEl = document.querySelector('#image');
const fullNameEl = document.querySelector('#full-name');
const userNameEl = document.querySelector('#username');
const bioEl = document.querySelector('#bio');
const reposEl = document.querySelector('#repos');
const APIURL = 'https://api.github.com/users/';

async function getData(username) {
    let data = await (await fetch(APIURL + username).catch(handleError)).json();
    let repos = await (await fetch(APIURL + username + '/repos').catch(handleError)).json();
    changeDOM(data, repos);
}

function handleError(error) {
    console.warn(error)
}

function changeDOM(user, repos) {
    pictureEl.setAttribute('src', user.avatar_url);
    fullNameEl.textContent = user.name;
    userNameEl.textContent = `@${user.login}`;
    bioEl.textContent = user.bio;

    reposEl.innerHTML = "";
    for (const repo of repos) {
        let repoEl = document.createElement("a");
        repoEl.classList.add("repo");
        repoEl.innerText = repo.name;
        repoEl.href = repo.html_url;
        reposEl.appendChild(repoEl);
    }

}

getData('robinwettstaedt');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    let input = searchEl.value
    if (input) getData(input);

});