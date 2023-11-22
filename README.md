- ****mocaoi.js****

# ✨️ Getting Started
- mocaoi.js offers more useful functions (not available in aoi.js) to your aoi.js bot.
- only supports aoi.js version: v6+

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

| Functions               | Params                   | Required Params ( true / false ) |
|-------------------------|--------------------------|----------------------------------|
| $mocaoiVersion          | []                       | []                               |
| $clientInfo             | [info]                   | [true]                           |
| $sendColoredLog         | [text;hex?]              | [true, false]                    |
| $commandExists          | [name;type?]             | [true, false]                    |
| $translate              | [from;to;text]           | [true, true, true]               |
| $aoiVersion             | []                       | []                               |
| $spotifySearch          | [song_name]              | [true]                           |
| $isCaps                 | [percentage%;text]       | [true, true]                     |
| $chatAI                 | [text]                   | [true]                           |
| $urlCheck               | [text]                   | [true]                           |
| $textToImage            | [text]                   | [true]                           |


- ****$clientInfo Parameters****
  - ispublic
  - isverified
  - memory
  - rss
  - platform
  - arch

</details>


### 🌐 Links;
- [GitHub](https://github.com/warfdev)
- [Discord Support](https://discord.com/invite/RVN8dGhNEY)