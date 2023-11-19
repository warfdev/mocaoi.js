- ****mocaoi.js****

# ✨️ Getting Started
- mocaoi.js offers more useful functions (not available in aoi.js) to your aoi.js bot.

## 💬 Install
```sh
npm i mocaoi.js@latest
```

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
  exexuteOnLog: true, // executeOnLog, mocaoi.js log is sent to the console when your project is started.
  loadPlugin: true, // loadPlugin is required for the functions to work.
  autoUpdate: true, // autoUpdate automatically updates if a new update is available.
  client: client // We define our client object.
});
```

<details>
  <summary>Show Function's List</summary>

| Functions         | Params           |
|-------------------|------------------|
| $mocaoiVersion    | []               |
| $clientInfo       | [info]           |
| $sendColoredLog   | [text;hex?]      |
| $commandExists    | [name;type?]     |
| $translate        | [from;to;text]   |
| $aoiVersion       | []               |
| $spotifySearch    | [song_name]      |


- ****$clientInfo Parameters****
  - ispublic
  - isverified
  - memory
  - rss
  - platform
  - arch

</details>


### 🌐 Links;
- [NPM](https://www.npmjs.com/package/mocaoi.js)
- [Discord Support](https://discord.com/invite/RVN8dGhNEY)