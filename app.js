console.log("JS Connected!");

async function searchProfile() {
    var userNameInput = document.getElementById("usernameInput").value.trim().toLowerCase();

    if (!userNameInput) {
        alert("Please Enter User Name!")
    };

    var profileApi = `https://api.github.com/users/${userNameInput}`;
    var reposApi = `https://api.github.com/users/${userNameInput}/repos`;

    try {
        var profileResponse = await fetch(profileApi);
        if (!profileResponse.ok) {
            throw new Error("User Not Found!");
        }
        var profileData = await profileResponse.json();
        console.log(profileData);


        var reposResponse = await fetch(reposApi);
        var reposData = await reposResponse.json();
        console.log(reposData);

        var reposDisplay = "";
        reposData.forEach(repo => {
            reposDisplay += `
        <div class="repo">
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
          <div class="stars">⭐ ${repo.stargazers_count}</div>
        </div>
      `;
        });

        document.getElementById("resultBox").innerHTML = `
        <div class="profile-box">
        <a href="https://github.com/${userNameInput}" target="_blank">
        <img id="userGithubProfile" src="${profileData.avatar_url}" alt="User Profile Pic">
        </a>
        <h3>${profileData.name || profileData.login}</h3>
        <p>${profileData.bio || "No Bio Available!"}</p>
        <p>Followers: ${profileData.followers} | Following: ${profileData.following}</p>
        <p>Public Repositories: ${profileData.public_repos}</p>
        <div id="repos">
        <h4>Repositories</h4>
        ${reposDisplay || "No Repositories Found!"}
        </div>
        </div>`
    } catch (error) {
        document.getElementById("resultBox").innerHTML = "Error: " + error.message;
    }

};