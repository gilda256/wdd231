const newUrl = "https://gilda256.github.io/wdd231/chamber/data/members.json";
const spotlight = document.getElementById("spot-ad");

async function getRanMembersData() {
    try {
        const response = await fetch(newUrl);
        if (response.ok) {
            const data = await response.json();
            displayRanMembers(data.companies);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error("Error fetching members:", error);
    }
}

function displayRanMembers(companies) {
    const needed = [];

    // فقط Gold و Silver
    for (let i = 0; i < companies.length; i++) {
        if (companies[i].membership_level === "Gold" || companies[i].membership_level === "Silver") {
            needed.push(companies[i]); 
        }
    }

    console.log("Needed companies:", needed);

    if (needed.length < 3) {
        console.warn("Not enough Gold/Silver members to show spotlight ads.");
        return;
    }

    // انتخاب تصادفی 3 تا
    const set = new Set();
    while (set.size < 3) {
        const ranNum = Math.floor(Math.random() * needed.length);
        set.add(ranNum);
    }

    set.forEach((index) => {
        const x = needed[index];
        const article = document.createElement("article");
        article.classList.add('spotAdArticle');

        const businessName = document.createElement('div');
        businessName.classList.add('businessName');
        businessName.innerHTML = `<h3>${x.name}</h3>`;

        const businessDesc = document.createElement('div');
        businessDesc.classList.add('businessDesc');

        const spotAdImage = document.createElement('div');
        spotAdImage.classList.add('spotAdImage');
        const logo = document.createElement("img");
        logo.setAttribute('src', x.icon_image);
        logo.setAttribute('alt', x.name);
        logo.setAttribute('loading', 'lazy');
        logo.setAttribute('height', '100px');
        logo.setAttribute('width', '100px');
        logo.classList.add('thumbnail'); 
        spotAdImage.appendChild(logo);

        const spotAdDesc = document.createElement('div');
        spotAdDesc.classList.add('spotAdDesc');

        const address = document.createElement("p");
        address.innerHTML = `<strong>ADDRESS:</strong> ${x.address}`;

        const phone = document.createElement("p");
        phone.innerHTML = `<strong>PHONE:</strong> ${x.phone_number}`;

        const url = document.createElement("p");
        url.innerHTML = `<strong>URL:</strong> <a href="${x.website_url}" target="_blank">${x.website_url}</a>`;

        const membership = document.createElement("p");
        membership.innerHTML = `<strong>MEMBERSHIP LEVEL:</strong> ${x.membership_level}`;

        spotAdDesc.append(address, phone, url, membership);
        businessDesc.append(spotAdImage, spotAdDesc);

        article.append(businessName, businessDesc);
        spotlight.appendChild(article);
    });
}

getRanMembersData();
