// =================== Time ==================
function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    
    // Get time components
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    // const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    
    timeElement.textContent = `${hours}:${minutes}: ${ampm}`;
}

// Update the time immediately on page load
updateTime();
// Update the time every minute (60,000 milliseconds)
setInterval(updateTime, 60000);

// =================== Date ==================
function updateDate() {
    const dateElement = document.getElementById('Date');
    const now = new Date();
    
    // Get date components
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(now.getDate()).padStart(2, '0');
    
    // Format the date as DD/MM/YYYY
    dateElement.textContent = `${day}/${month}/${year}`;
}

// Update the date immediately on page load
updateDate();


// ==============================prayers=================
document.addEventListener("DOMContentLoaded", function() {
    // Your city coordinates
    const latitude = 26.133200;
    const longitude = 87.458200;
    
    // Fetch prayer times from Aladhan API
    fetch(`https://api.aladhan.com/timingsByAddress/09-03-2015?address=Dubai,UAE&method=8`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Debugging: log the entire data object
            const timings = data.data.timings;
            document.getElementById("fajr").textContent = timings.Fajr;
            document.getElementById("dhuhr").textContent = timings.Dhuhr;
            document.getElementById("asr").textContent = timings.Asr;
            document.getElementById("maghrib").textContent = timings.Maghrib;
            document.getElementById("isha").textContent = timings.Isha;
        })
        .catch(error => console.error('Error fetching prayer times:', error));
});

 // Get the marquee element
 const marquee = document.getElementById('scrolling-text');

 // Add event listeners to stop and start scrolling on hover
 marquee.addEventListener('mouseover', function() {
     marquee.stop();
 });

 marquee.addEventListener('mouseout', function() {
     marquee.start();
 });


 const apiKey = '8c78f246d1c546af911d2f68578c87e0';
        const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

        async function fetchNews() {
            const response = await fetch(url);
            const data = await response.json();
            return data.articles;
        }

        async function displayNews() {
            const articles = await fetchNews();
            const newsContainer = document.getElementById('news-container');
            articles.forEach(article => {
                const card = document.createElement('div');
                card.className = 'card';

                const cardBody = `
                    <img src="${article.urlToImage}" alt="${article.title}" class="card-img-top">
                    <div class="card-body">
                        <h3>${article.title}</h3>
                        <p>${article.description}</p>
                    </div>
                `;

                card.innerHTML = cardBody;
                newsContainer.appendChild(card);
            });
        }

        displayNews();