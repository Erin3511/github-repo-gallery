// Targeting user profile information
const overview = document.querySelector(".overview");
const username = "Erin3511";

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
};