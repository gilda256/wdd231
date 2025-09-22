const url = "https://gilda256.github.io/wdd231/chamber/data/members.json";

const cards = document.getElementById("cards");

async function getMembersData() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.companies);
}


const displayMembers = (members) => {

    members.forEach((member) => {

        const section = document.createElement("section");
        section.setAttribute('id', 'section-card');

        const logoContainer = document.createElement("div");
        logoContainer.setAttribute('id', 'logo-container');
        
        const logo = document.createElement("img");
        logo.setAttribute('src', member.icon_image);
        logo.setAttribute('alt', member.name);
        logo.setAttribute('loading', 'lazy');


        const companyName = document.createElement("h2");
         companyName.textContent = member.name;

        const companyAddress = document.createElement("p");
        companyAddress.textContent = member.address;

        const companyPhone = document.createElement("p");
        companyPhone.textContent = member.phone_number;

        const companySite = document.createElement("a");
        companySite.setAttribute('href', member.website_url)
        companySite.setAttribute('target', '_blank')
        companySite.textContent = member.website_url;

        logoContainer.appendChild(logo);
        section.append(logoContainer, companyName, companyAddress, companyPhone, companySite);
        cards.appendChild(section);
    });
}

document.getElementById("grid").addEventListener("click", () => {
    document.body.classList.add("grid");
    document.body.classList.remove("list");
});

document.querySelector("#list").addEventListener("click", () => {
    
    document.body.classList.add("list");
    document.body.classList.remove("grid");
});

getMembersData();
document.body.classList.toggle("grid");