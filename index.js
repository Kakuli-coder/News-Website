console.log("This is News Website!");

// Instantiate an xhr object
const xhr = new XMLHttpRequest();

// Open the object
// Initialise the news api parameters
let source = "bbc-news";
let apiKey = "619e026173994d50be4269ea99791c89";
// AJAX GET request
xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`, true);

// What to de when response is ready
xhr.onload = function () {
    if (this.status === 200) {
        let object = JSON.parse(this.responseText);
        // console.log(object);

        let obj = Object.values(object)[2];
        // console.log(obj);

        let newsAccordion = document.querySelector("#newsAccordion");
        let newsHtml = ``;
        obj.forEach(function(key, index) {
            newsHtml += `
                <div class="accordion-item">
                    <h2 class="accordion-header" id="heading${index}">
                        <button id="newsHeadline" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                        <strong>Breaking News ${index+1}:</strong><span>${key.title}</span>
                        </button>
                    </h2>
                    <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#newsAccordion">
                        <div class="accordion-body">
                            <strong>${key.description}</strong> ${key.content} <a href="${key.url}" target="_blank">Read more</a>
                        </div>
                    </div>
                </div>
                `;
            newsAccordion.innerHTML = newsHtml;
            });
    } else {
        console.log("Some error occured!");
    };
}

// Send the request (FOR)
xhr.send();

// search
let search = document.querySelector("#search");
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    let newsHeadlines = document.querySelectorAll("#newsHeadline");
    Array.from(newsHeadlines).forEach(function (element) {
        let newsHeadlinesTxt = element.querySelector("span").innerText.toLowerCase();

        if (newsHeadlinesTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
});
// search ends