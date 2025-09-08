const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

const homeButton = document.querySelector('#home');
const chamberButton = document.querySelector('#chamber');
const finalButton = document.querySelector('#final');
const githubProfileButton = document.querySelector('#github_profile');
const linkedinButton = document.querySelector('#linkedin');

homeButton.addEventListener('click', () => {
    homeButton.classList.add("active");
    chamberButton.classList.remove("active");
    finalButton.classList.remove("active");
    githubProfileButton.classList.remove("active");
    linkedinButton.classList.remove("active");
});

chamberButton.addEventListener('click', () => {
    homeButton.classList.remove("active");
    chamberButton.classList.add("active");
    finalButton.classList.remove("active");
    githubProfileButton.classList.remove("active");
    linkedinButton.classList.remove("active");
});

finalButton.addEventListener('click', () => {
    homeButton.classList.remove("active");
    chamberButton.classList.remove("active");
    finalButton.classList.add("active");
    githubProfileButton.classList.remove("active");
    linkedinButton.classList.remove("active");
});

githubProfileButton.addEventListener('click', () => {
    homeButton.classList.remove("active");
    chamberButton.classList.remove("active");
    finalButton.classList.remove("active");
    githubProfileButton.classList.add("active");
    linkedinButton.classList.remove("active");
});

linkedinButton.addEventListener('click', () => {
    homeButton.classList.remove("active");
    chamberButton.classList.remove("active");
    finalButton.classList.remove("active");
    githubProfileButton.classList.remove("active");
    linkedinButton.classList.add("active");
});