const API_KEY = "Ptiw52dqDsW3KS0Mj1N9_V8whfI";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));
document.getElementById("submit").addEventListener("click", e => postForm(e));

async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`;

    const response = await fetch(queryString);

    const data = await response.json();

    if (response.ok) {
        displayStatus(data);
    } else {
        throw new Error(data.error);
    }
}

function displayStatus(data) {
    document.getElementById("resultsModalTitle").innerText = "API Key Status"
    document.getElementById("results-content").innerHTML = `<div>Your Key is valid until ${data.expiry}</div>`
    resultsModal.show();
}

async function postForm(e) {
    const form = new FormData(document.getElementById("checksform"));

    const response = await fetch(API_URL, {
                        method: "POST",
                        headers: {
                                    "Authorization": API_KEY,
                                 },
                        body: form
    })
    const data = await response.json();

    if (response.ok) {
        displayErrors(data);
    } else {
        throw new Error(data.error);
    }
}

function displayErrors() {
    let heading = `JSHint Results for ${data.file}`;

    if(data.total_errors === 0) {
        results = `<div>No errors reported!</div>`
    } else {
        results = `<div>Total Errors: <span>${data.total_error}</span>`
        for (let error of data.errors_list) {
            results += `<div>At line <span>${error.line}</span>`;
            results += `column <span>${error.col}</span></div>`;
            results += `<div>${error.error}</div>`;
        }
    }
    document.getElementById("resultsModalTitle").innerText = heading
    document.getElementById("results-content").innerHTML = results
    resultsModal.show();
}

