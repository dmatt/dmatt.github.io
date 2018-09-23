let topTenStreams;
let freeCodeCampStream;
const twitchApi = 'https://api.twitch.tv/kraken/';
const myHeaders = new Headers({
  'Client-ID': 'lnr7ybs8r23c75ogxck7pi5br73rje',
});

const twitchInit = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default',
};

// Generic error handling for fetch promise
const handleErrors = (response) => {
  if (!response.ok) throw Error(response);
  return response;
};

// Fetch function that handles HTTP status and network errors
function fetchAPI(init, api, endpoint, params, isFcc) {
  fetch(api + endpoint + params, init)
    .then(handleErrors)
    .then(response => response.json())
    .then(response => (isFcc ? FccStatus(response) : HTMLize(response)))
    .catch(error => console.log(error));
}

// Call Twitch streams endpoint for topTenStreams
fetchAPI(twitchInit, twitchApi, 'streams', '?first=10&limit=10');

// Call Twitch streams endpoint for freeCodeCamp status
fetchAPI(twitchInit, twitchApi, 'streams', '/freecodecamp', true);

// start the first twitch viewer with #1 channel
function startFirstChannel(channel) {
  const firstChannel = channel;
  document.querySelector('#twitch-embed').innerHTML = null;
  new Twitch.Embed('twitch-embed', {
    width: 854,
    height: 480,
    channel: firstChannel,
    muted: true,
  });
}

function HTMLize(response) {
  // set global variable with all streams from the API response
  topTenStreams = response.streams;
  // get name or first channel asap and start
  startFirstChannel(topTenStreams[0].channel.name);
  topTenStreams.forEach((obj, i) => Object.keys(obj).forEach((attributeName) => {
    // every `case` is data we want append to the DOM
    switch (attributeName) {
      case 'preview': {
        const thumbnailElement = document.createElement('img');
        thumbnailElement.classList = 'card-text card-img-top';
        const newthumbnailUrl = obj.preview.template.replace('{width}x{height}','770x430'); // arbitrary size
        thumbnailElement.src = newthumbnailUrl;
        document.querySelector(`#place-${i}`).parentNode.prepend(thumbnailElement);
        break;
      }
      case 'viewers': {
        const viewersElement = document.createElement('h6');
        viewersElement.classList = 'card-subtitle mb-2 text-muted';
        viewersElement.innerHTML = `👀 ${obj.viewers.toLocaleString()}`;
        document.querySelector(`#place-${i}`).appendChild(viewersElement);
        break;
      }
      case 'channel': {
        const titleElement = document.createElement('h5');
        titleElement.classList = 'card-title';
        titleElement.innerHTML = obj.channel.display_name;
        document.querySelector(`#place-${i}`).appendChild(titleElement);
        const textElement = document.createElement('p');
        textElement.classList = 'card-text';
        textElement.innerHTML = obj.channel.status;
        document.querySelector(`#place-${i}`).appendChild(textElement);
        break;
      }
      default:
        // do nothing
    }
  }));
  return response;
}

// Display "online" status if FCC response is not empty
function FccStatus(response) {
  freeCodeCampStream = response.stream;
  freeCodeCampStream ? document.querySelector('#fcc-status').innerHTML = 'Status: 💚 streaming' : null;
}

function handleClick(e) {
  // open / close the clicked parent div with every click
  if (e.target.classList.contains('expand')) {
    event.target.parentElement.querySelector('.card-text').classList.toggle('collapsed');
    const collapseButtonState = event.srcElement;
    collapseButtonState.innerHTML == '🐵' ? collapseButtonState.innerHTML = '🙈' : collapseButtonState.innerHTML = '🐵';
  }
  // start a new twitch viewer with the desired channel
  else if (e.target.classList.contains('watch')) {
    let nextChannel;
    e.target.id == 'watch-10' ? nextChannel = 'freecodecamp' : nextChannel = topTenStreams[e.target.id.split('-')[1]].channel.name;
    document.querySelector('#twitch-embed').innerHTML = null;
    new Twitch.Embed('twitch-embed', {
      width: 600,
      channel: nextChannel,
      muted: false,
    });
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}

document.querySelectorAll('.expand, .watch').forEach(() => {addEventListener('click', handleClick, false)});
