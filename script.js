const graphicsCards = [
    { name: "NVIDIA RTX 3080", price: 699, memory: 10, region: "USA", link: "https://example.com/rtx3080" },
    { name: "AMD Radeon RX 6800", price: 579, memory: 16, region: "UK", link: "https://example.com/rx6800" },
    { name: "NVIDIA GTX 1660", price: 229, memory: 6, region: "Other", link: "https://example.com/gtx1660" },
    { name: "AMD Radeon RX 7900 XT", price: 899, memory: 20, region: "USA", link: "https://example.com/rx7900xt" },
    { name: "NVIDIA RTX 4090", price: 1599, memory: 24, region: "UK", link: "https://example.com/rtx4090" },
    { name: "Graphics Card 6", price: 300, memory: 8, region: "USA", link: "https://example.com/card6" },
    { name: "Graphics Card 7", price: 450, memory: 12, region: "UK", link: "https://example.com/card7" },
    { name: "Graphics Card 8", price: 700, memory: 16, region: "Other", link: "https://example.com/card8" },
    { name: "Graphics Card 9", price: 1100, memory: 20, region: "USA", link: "https://example.com/card9" },
    { name: "Graphics Card 10", price: 1300, memory: 24, region: "UK", link: "https://example.com/card10" },
    { name: "Graphics Card 11", price: 250, memory: 6, region: "Other", link: "https://example.com/card11" },
    { name: "Graphics Card 12", price: 550, memory: 8, region: "USA", link: "https://example.com/card12" },
    { name: "Graphics Card 13", price: 850, memory: 12, region: "UK", link: "https://example.com/card13" },
    { name: "Graphics Card 14", price: 950, memory: 16, region: "Other", link: "https://example.com/card14" },
    { name: "Graphics Card 15", price: 1200, memory: 20, region: "USA", link: "https://example.com/card15" },
    { name: "Graphics Card 16", price: 1400, memory: 24, region: "UK", link: "https://example.com/card16" },
    { name: "Graphics Card 17", price: 320, memory: 8, region: "Other", link: "https://example.com/card17" },
    { name: "Graphics Card 18", price: 480, memory: 10, region: "USA", link: "https://example.com/card18" },
    { name: "Graphics Card 19", price: 680, memory: 14, region: "UK", link: "https://example.com/card19" },
    { name: "Graphics Card 20", price: 980, memory: 18, region: "Germany", link: "https://example.com/card20" },
    { name: "Graphics Card 21", price: 980, memory: 18, region: "France", link: "https://example.com/card20" }
];

let activeFilters = { price: null, region: "USA", memory: null, sort: null };

function setPriceFilter(min, max, button) {
    clearCategoryFilters('price');
    if (activeFilters.price && activeFilters.price.min === min && activeFilters.price.max === max) {
        activeFilters.price = null;
        button.classList.remove('active');
    } else {
        activeFilters.price = { min, max };
        button.classList.add('active');
    }
    applyFilters();
}

function setRegionFilter(region, button) {
    clearCategoryFilters('region');
    if (activeFilters.region === region) {
        activeFilters.region = null;
        button.classList.remove('active');
    } else {
        activeFilters.region = region;
        button.classList.add('active');
    }
    applyFilters();
}

function setMemoryFilter(min, max, button) {
    clearCategoryFilters('memory');
    if (activeFilters.memory && activeFilters.memory.min === min && activeFilters.memory.max === max) {
        activeFilters.memory = null;
        button.classList.remove('active');
    } else {
        activeFilters.memory = { min, max };
        button.classList.add('active');
    }
    applyFilters();
}

function clearCategoryFilters(category) {
    const buttons = document.querySelectorAll(`button[id^="${category}"]`);
    buttons.forEach(button => button.classList.remove('active'));
    activeFilters[category] = null;
}

function clearFilters() {
    activeFilters = { price: null, region: "USA", memory: null, sort: null };
    document.querySelectorAll('button.active').forEach(button => button.classList.remove('active'));
    applyFilters();
}

function applyFilters() {
    let filteredCards = graphicsCards;

    if (activeFilters.price) {
        filteredCards = filteredCards.filter(card => card.price >= activeFilters.price.min && card.price <= activeFilters.price.max);
    }

    if (activeFilters.region) {
        filteredCards = filteredCards.filter(card => card.region === activeFilters.region);
    }

    if (activeFilters.memory) {
        filteredCards = filteredCards.filter(card => card.memory >= activeFilters.memory.min && card.memory <= activeFilters.memory.max);   
    }

    if (activeFilters.sort) {
        if (activeFilters.sort === 'price') {
            filteredCards.sort((a, b) => a.price - b.price);
        } else if (activeFilters.sort === 'memory') {
            filteredCards.sort((a, b) => a.memory - b.memory);
        }
    }

    displayGraphicsCards(filteredCards);
}


function sortList(criteria) {
    activeFilters.sort = criteria;
    applyFilters();
}

function displayGraphicsCards(cards) {
    const table = document.getElementById('graphicsCardTable');
    // Clear the existing table body
    table.innerHTML = '';

    // Create the table header
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>Name</th>
        <th>Price</th>
        <th>Memory</th>
        <th>Region</th>
        <th>Action</th>
    `;
    table.appendChild(headerRow);

    // Populate the table with card data
    cards.forEach(card => {
        const row = document.createElement('tr');
        
      
        if (card.region === 'USA') {
            currencySymbol = '$';
        } else if (card.region === 'UK') {
            currencySymbol = '£'; // &#36; is the pound sign in HTML
        } else if (card.region === 'France'||card.region === 'Germany') {
            currencySymbol = '€'; // &#8364; is the euro sign in HTML, but it's more common to use € directly
        } else {
            currencySymbol = '$'; // default to dollar sign if region is unknown
        }
        row.innerHTML = `
            <td>${card.name}  </td>
            <td>${currencySymbol}${card.price}  </td>
            <td>${card.memory}  </td>
            <td>${card.region}  </td>
            <td><a href="${card.link}" target="_blank">BUY HERE</a></td>
        `;
        table.appendChild(row);
    });
}

// Initial display
applyFilters();
