// Targeting user profile information
const overview = document.querySelector(".overview");
const username = "Erin3511";
const repoList = document.querySelector(".repo-list");
const allReposSection = document.querySelector(".repos");
const individualRepoData = document.querySelector(".repo-data");


const getProfileData = async function () {
    const userRequest = await fetch (
        `https://api.github.com/users/${username}`
    );
    const data = await userRequest.json ();
    displayProfileData(data);
};

getProfileData();

const displayProfileData = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> 
`;
  overview.append(div);
  getRepos();
}; 

const getRepos = async function () {
  const reposRequest = await fetch (
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
  );
  const repoData = await reposRequest.json();
  displayRepos(repoData);
};

const displayRepos = function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};

repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
  const repoName = e.target.innerText;
  getRepoInfo(repoName);
}
});

const getRepoInfo = async function (repoName) {
  const fetchInfo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await fetchInfo.json();
  console.log(repoInfo);

  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();

  const languages = [];
  for (const language in languageData) {
    languages.push(language);
}

displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
  individualRepoData.innerHTML = "";
  individualRepoData.classList.remove("hide");
  allReposSection.classList.add("hide");
  const div = document.createElement("div");
  div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;
  individualRepoData.append(div);
};
