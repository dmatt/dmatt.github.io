let topTenStreams;
let freeCodeCampStream;
var twitchApi = 'https://api.twitch.tv/kraken/'
var myHeaders = new Headers({
  "Client-ID": "lnr7ybs8r23c75ogxck7pi5br73rje"
});

var twitchInit = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
};

// Store this "top 10" element as a variable to intert data into
var topTenChannelsElement = document.querySelector('#twitch-top-10');

// Generic error handling for fetch promise
var handleErrors = response => {
  if (!response.ok) throw Error(response);
  return response;
}

// Call Twitch streams endpoint for topTenStreams
fetchAPI(twitchInit, twitchApi, 'streams', '?first=10&limit=10');

// Call Twitch streams endpoint for freeCodeCamp status
fetchAPI(twitchInit, twitchApi, 'streams', '/freecodecamp', true);

// Fetch function that handles HTTP status and network errors
function fetchAPI(init, api, endpoint, params, isFcc) {
  fetch(api+endpoint+params, init)
    .then(handleErrors)
    .then(response => response.json())
    .then(response => isFcc ? FccStatus(response) : HTMLize(response))
    .catch(error => console.log(error));
  }

function HTMLize(response) {
  topTenStreams = response.streams
  startFirstChannel(topTenStreams[0].channel.name)
    topTenStreams.forEach( (obj, i) =>
    Object.keys(obj).forEach( function (attributeName) {
      switch (attributeName) {
        case 'preview':
          let thumbnailElement = document.createElement("img");
          thumbnailElement.classList = "card-text card-img-top";
          let newthumbnailUrl = obj.preview.template.replace("{width}x{height}","770x430"); // arbitrary size
          thumbnailElement.src = newthumbnailUrl;
          document.querySelector('#place-'+i).parentNode.prepend(thumbnailElement);
        break;
        case 'viewers':
          let viewersElement = document.createElement("h6");
          viewersElement.classList = "card-subtitle mb-2 text-muted";
          viewersElement.innerHTML = "👀 " + obj.viewers.toLocaleString();
          document.querySelector('#place-'+i).appendChild(viewersElement);
        break;        
        case 'channel':
          let titleElement = document.createElement("h5");
          titleElement.classList = "card-title";
          titleElement.innerHTML = obj.channel.display_name;
          document.querySelector('#place-'+i).appendChild(titleElement);
          let textElement = document.createElement("p");
          textElement.classList = "card-text";
          textElement.innerHTML = obj.channel.status;
          document.querySelector('#place-'+i).appendChild(textElement);
        break;
    }
  }
  ))
  return response
  }

function FccStatus(response) {
  freeCodeCampStream = response.stream;
  freeCodeCampStream ? document.querySelector('#fcc-status').innerHTML = "Status: 💚 streaming" : null
}

document.querySelectorAll('.expand, .watch').forEach(function() {addEventListener("click", handleClick, false)});

// start the first twitch viewer with #1 channel
function startFirstChannel(channel) {
  let firstChannel = channel;
  document.querySelector("#twitch-embed").innerHTML = null;
  new Twitch.Embed("twitch-embed", {
    width: 854,
    height: 480,
    channel: firstChannel,
    muted: true
  });
}

function handleClick(e) {
  // open / close the clicked parent div with every click
  if (e.target.classList.contains("expand")) {
    event.target.parentElement.querySelector('.card-text').classList.toggle('collapsed');
    let collapseButtonState = event.srcElement
    collapseButtonState.innerHTML == '🐵' ? collapseButtonState.innerHTML = '🙈' : collapseButtonState.innerHTML = '🐵';
  }
  // start a new twitch viewer with the desired channel
  else if (e.target.classList.contains("watch")) {
    let nextChannel;
    e.target.id == "watch-10" ? nextChannel = "freecodecamp" : nextChannel = topTenStreams[e.target.id.split("-")[1]].channel.name
    document.querySelector("#twitch-embed").innerHTML = null;
    new Twitch.Embed("twitch-embed", {
      width: 600,
      channel: nextChannel,
      muted: false
    });
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }
}
