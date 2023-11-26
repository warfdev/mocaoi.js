<p align="center">
  <a href="https://www.npmjs.com/package/mocaoi.js?activeTab=readme">
    <img width="300" src="https://cdn.discordapp.com/attachments/1175816404579135559/1178308022926319666/20231126_151442.jpg?ex=6575abdc&is=656336dc&hm=d3430af448f89671168b3221f003f14ff8bc96cc256e75854ec1af8b8e8ad541&" alt="mocaoijs">
  </a>
</p>

<div align="center">
  <b>mocaoi.js offers more useful functions (not available in aoi.js) to your aoi.js bot..</b>
</div>

<br/>

<div align="center">

[![NPM downloads][download-image]][download-url] &nbsp; &nbsp;
[![NPM version][npm-image]][npm-url] &nbsp; &nbsp;
![License](https://img.shields.io/npm/l/mocaoi.js) &nbsp; &nbsp;

[npm-image]: https://img.shields.io/npm/v/mocaoi.js.svg?color=42cfff
[npm-url]: https://npmjs.org/package/mocaoi.js
[download-image]: https://img.shields.io/npm/dt/mocaoi.js.svg?color=3182b0
[download-url]: https://npmjs.org/package/mocaoi.js

  </div>

---

<br/>

# ✨️ Information
- **What is mocaoi.js:** mocaoi.js module is a module made for aoi.js. This module contains custom functions that are not available in aoi.js. And it offers you more useful functions.
- **Warning:** only supports aoi.js version: v6+

- **Explanation for those who do not know aoi.js:** 
  - aoi.js is a JavaScript library that is designed to make it easy to build Discord bots.

  - It is open-source and free to use, and provides a simple, easy-to-use interface for interacting with the Discord API and handling events.
  
  - aoi.js is suitable for beginners who are new to building bots, as well as experienced developers who want to save time and streamline their workflow.

--- 

### 📒 Setup
- To get started with mocaoi.js, follow these steps:
- index.js
```js
const { AoiClient } = require("aoi.js");
const client = new AoiClient({
  token: "Discord Bot Token",
  prefix: "Discord Bot Prefix",
  intents: ["MessageContent", "Guilds", "GuildMessages"],
  events: ["onMessage", "onInteractionCreate"],
  database: {
    type: "aoi.db",
    db: require("@akarui/aoi.db"),
    tables: ["main"],
    path: "./database/",
    extraOptions: {
      dbType: "KeyValue",
    },
  },
});



// mocaoi.js setup
const { Plugin } = require("mocaoi.js");
const maoi = new Plugin({
  executeOnLog: true, // executeOnLog, mocaoi.js log is sent to the console when your project is started.
  loadPlugin: true, // loadPlugin is required for the functions to work.
  autoUpdate: true, // autoUpdate automatically updates if a new update is available.
  client: client // We define our client object.
});
```

- If you come to our [Discord support](https://discord.com/invite/RVN8dGhNEY) server, you can get more detailed information about function usage!

<details>
  <summary>Show Function's List</summary>

| Functions               | Params                          | Required Params ( true / false ) |
|-------------------------|---------------------------------|----------------------------------|
| $mocaoiVersion          | []                              | []                               |
| $clientInfo             | [info]                          | [true]                           |
| $sendColoredLog         | [text;hex?]                     | [true, false]                    |
| $commandExists          | [name;type?]                    | [true, false]                    |
| $translate              | [from;to;text]                  | [true, true, true]               |
| $aoiVersion             | []                              | []                               |
| $spotifySearch          | [song_name]                     | [true]                           |
| $isCaps                 | [percentage%;text]              | [true, true]                     |
| $chatAI                 | [text]                          | [true]                           |
| $urlCheck               | [text]                          | [true]                           |
| $textToImage            | [text]                          | [true]                           |
| $recreateChannel        | []                              | []                               |
| $c ( comment )          | [text]                          | [true]                           |
| $createTranscript       | [channelId?;logChannelId?]      | [false, false]                   |


- ****$clientInfo Parameters****
  - ispublic
  - isverified
  - memory
  - rss
  - platform
  - arch

</details>

<details>
  <summary>Show Update Logs</summary>

## v1.1.4 [ NEW ]
- Updated `$recreateChannel` function
  - New Params: [chanelID , returnID?]
- Added `$createTranscript` function

## v1.1.3 [ OLD ]
- Added `$recreateChannel` function
- Added `$c` function

## v1.1.2 [ OLD ]
- Some changes

## v1.1.1 [ OLD ]
- Added `$textToImage` function

## v1.0.11 [ OLD ]
- Added `$chatAI` function
- Added `$isCaps` function

</details>

<br />

---

<br/>

<div align = "center">

**[ NPM ](https://www.npmjs.com/package/mocaoi.js?activeTab=readme)** | **[ Support Server ](https://discord.com/invite/RVN8dGhNEY)**

</div>

