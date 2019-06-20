/* eslint-disable prettier/prettier */
require('dotenv').config();

module.exports = {
  addFollower,
  addSubscriber,
  addGiftedSubscriber,
  addCheerer,
  addRaider,
  addTimestamp,
  getAllData
};

const channel = process.env.TWITCH_CHANNEL.toLowerCase();
let followersText = '';
let subscribersText = '';
let cheerersText = '';
let raidersText = '';
let timestampsText = '| Timestamp | Topic |\n| --------- | ------------ |\n';

function addFollower(username) {
  if (!username) {
    return;
  }

  const formattedText = `- [@${username}](https://twitch.tv/${username})\n`;
  followersText += formattedText;
  return formattedText;
}

function addSubscriber(username, months) {
  if (!username || !months) {
    return;
  }

  const monthsText = months > 1 ? 'months' : 'month';
  const formattedText = `- [@${username}](https://twitch.tv/${username}) (${months} ${monthsText})\n`;
  subscribersText += formattedText;
  return formattedText;
}

function addGiftedSubscriber(username, months, gifterUsername) {
  if (!username || !months || !gifterUsername) {
    return;
  }

  const monthsText = months > 1 ? 'months' : 'month';
  const formattedText = `- [@${username}](https://twitch.tv/${username}) (${months} ${monthsText}) \`gifted by\` [@${gifterUsername}](https://twitch.tv/${gifterUsername})\n`;
  subscribersText += formattedText;
  return formattedText;
}

function addCheerer(username, bits) {
  if (!username || !bits) {
    return;
  }

  const formattedText = `- [@${username}](https://twitch.tv/${username}): ${bits} bits\n`;
  cheerersText += formattedText;
  return formattedText;
}

function addRaider(username, raidCount, hostCount) {
  if (!username || !raidCount) {
    return;
  }
  const formattedText = `- [@${username}](https://twitch.tv/${username}) (${raidCount})\n`;
  raidersText += formattedText;
  return formattedText;
}

function addTimestamp(
  timestamp,
  comment,
  username,
  streamId = 'https://www.twitch.tv/videos/id'
) {
  if (!timestamp) {
    return;
  }

  const timestampString = `${timestamp.hour}:${timestamp.minute}:${
    timestamp.second
  }`;
  const timestampLink = `${streamId}?t=${timestamp.hour}h${timestamp.minute}m${
    timestamp.second
  }s`;
  let formattedText = '';

  if (username && username.toLowerCase() !== channel) {
    formattedText = `| [${timestampString}](${timestampLink}) | ${comment} created by [@${username}](https://twitch.tv/${username}) |\n`;
  } else {
    formattedText = `| [${timestampString}](${timestampLink}) | ${comment} |\n`;
  }
  timestampsText += formattedText;
  return formattedText;
}

function getAllData() {
  return {
    followers: followersText,
    subscribers: subscribersText,
    cheerers: cheerersText,
    raiders: raidersText,
    timestamps: timestampsText
  };
}
