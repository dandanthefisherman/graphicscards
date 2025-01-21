import { graphicsCards } from "./graphicsCards";

window.graphicsCards = graphicsCards;
window.setPriceFilter = setPriceFilter;
window.setRegionFilter = setRegionFilter;
window.setMemoryFilter = setMemoryFilter;
window.sortList = sortList;
window.clearFilters = clearFilters;


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
