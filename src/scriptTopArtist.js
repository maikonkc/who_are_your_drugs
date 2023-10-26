const clientId = "c48e0be2ada84eb994ab6bae7233731b"; // Replace with your client ID
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (!code) {
    redirectToAuthCodeFlow(clientId);
    console.log("autocode!");
} else {
    const accessToken = await getAccessToken(clientId, code);
    const items = await fetchItems(accessToken);
    console.log(items);
    populateUI(items);
}

export async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "https://maikonkc.github.io/who_is_your_drugs/callback");
    params.append("scope", "user-read");//user-top-read
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
    console.log("generatecode!");
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}


export async function getAccessToken(clientId, code) {
    console.log("getaccesstoken!");
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "https://maikonkc.github.io/who_is_your_drugs/callback");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

async function fetchItems(token) {
    console.log("fetchitens!");
    const result = await fetch("https://api.spotify.com/v1/me/top/artists", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

function populateUI(items){
    
    
    // Defina o texto fornecido pelo usuário como conteúdo da div
    
    document.getElementById("artist0").innerText = items.items[0].name;
    document.getElementById("artist1").innerText = items.items[1].name;
    document.getElementById("artist2").innerText = items.items[2].name;
    document.getElementById("artist3").innerText = items.items[3].name;
    document.getElementById("artist4").innerText = items.items[4].name;
    document.getElementById("artist5").innerText = items.items[5].name;
    document.getElementById("artist6").innerText = items.items[6].name;
    document.getElementById("artist7").innerText = items.items[7].name;
    document.getElementById("artist8").innerText = items.items[8].name;
    document.getElementById("artist9").innerText = items.items[9].name;
}