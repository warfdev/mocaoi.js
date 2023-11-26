
// 1
const chalk = require("chalk");
const { exec } = require("child_process");
const fetch = require("node-fetch");
const { version } = require("../package.json");
const { dependencies } = require("../../../package.json");
const aoiversion = dependencies['aoi.js'];
const axios = require("axios");
const Discord = require("discord.js");

// 2
const devIds = require("./json/devs.json");
const warfdevID = devIds.discord.ids.warfdev; // discord name: zmochas

// 3
class Plugin {
  constructor(options) {
    this.executeOnLog = options.executeOnLog || false;
    this.loadPlugin = options.loadPlugin || false;
    this.autoUpdate = options.autoUpdate || false;
    this.options = options;
    if(!options.client){
      console.log("[ERR]: You have not inputted your aoi client.");
      process.exit(0);
    }
    
    if(this.loadPlugin && this.executeOnLog){
      this.LoadFuncs();
      this.AndLog();
    } else if(this.loadPlugin && !this.executeOnLog){
      this.LoadFuncs();
    }
    
    // auto update
    if(this.autoUpdate){
      this.checkUpdates();
    }
    
  } AndLog() {
    const client = this.options.client;
    client.on("ready", () => {
      console.log("\n\n\n");
      console.log(chalk.magenta.bold(`'|————— mocaoi.js | Plugin - Vers: v${version} —————'`));
      console.log(chalk.magenta.bold(`'|————— developer — github: warfdev —————'`));
      console.log(chalk.green.bold(`'|—— INFORMATION ——|`) + chalk.white.dim(`functions list: https://github.com/warfdev/mocaoi.js`));
      console.log(chalk.green.bold(`'|—— INFORMATION ——|`) + chalk.white.dim(`Discord Support: https://discord.com/invite/RVN8dGhNEY`));
      console.log("\n\n\n");
    })
  } LoadFuncs(){
    
    const client = this.options.client;
    // functions;
    
        /**
     * $mocaoiVersion
     * PARAMS: []
     */
    client.functionManager.createFunction({
      name: "$mocaoiVersion",
      type: "djs",
      code : async d => {
        const data = d.util.aoiFunc(d);
        data.result = version;

        return {
          code: d.util.setCode(data)
        }
      }
    });
    
    
    client.functionManager.createFunction({
      name: "$aoiVersion",
      type: "djs",
      code: async d => {
        const data = d.util.aoiFunc(d);
        data.result = aoiversion;
        
        return {
          code: d.util.setCode(data)
        }
      }
    });
    
    
    /**
     * $clientInfo
     * PARAMS: [str_info]
     * ispublic
     * isverified
     * memory
     * rss
     * platform
     * arch
     */
     
    client.functionManager.createFunction({
      name: '$clientInfo',
      type: 'djs',
      code: async d => {
        const data = d.util.aoiFunc(d);
        const [info] = data.inside.splits;
    
        if (!info) return d.aoiError.fnError(d, 'custom', {}, 'Invalid Parameters');
    
        switch (info.toLowerCase()) {
          case 'ispublic':
            data.result = client.user.bot ? false : true;
            break;
          case 'isverified':
            data.result = client.user.verified ? false : true;
            break;
          case 'memory':
            data.result = (process.memoryUsage().rss / 1024 / 1024).toFixed(2);
            break;
          case 'rss':
            data.result = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
            break;
          case 'platform':
            data.result = process.platform;
            break;
          case 'arch':
            data.result = process.arch;
            break;
          default:
            return d.aoiError.fnError(d, 'custom', {}, 'Info Parameter');
        }
    
        //data.code = typeof result === 'object' ? JSON.stringify(result) : result;
    
        return {
          code: d.util.setCode(data)
        };
      }
    });
    
    
    /**
     * $sendColoredLog
     * PARAMS: [str_text ; hex?]
    */
    
    client.functionManager.createFunction({
      name: "$sendColoredLog",
      type: "djs",
      code: async d => {
        const data = d.util.aoiFunc(d);

        if (data.err) return d.error(data.err);

        const [msg, color = "#f70000"] = data.inside.splits;
        if (!msg) return d.aoiError.fnError(d, 'custom', {}, 'no text provided');
        console.log(chalk.hex(color)(msg.addBrackets()));

        return {
          code: d.util.setCode(data)
        }
      }
    });
    
    
        /**
     * $commandExists
     * PARAMS: [str_name ; str_type?]
     */
    
    client.functionManager.createFunction({
      name: '$commandExists',
      code: async function(d) {
        let data = d.util.aoiFunc(d)
        let [name, type = 'default'] = data.inside.splits
        if (!name) return d.aoiError.fnError(d, 'custom', {}, 'Missing command name!')
        if (!d.client.cmd.types.includes(type)) return d.aoiError.fnError(d, 'custom', {}, 'Invalid command type!')
  
        data.result = d.client.cmd[type].some(cmd => cmd.name.toLowerCase() === name.toLowerCase() || cmd.aliases && cmd.aliases.map(al => al.toLowerCase()).includes(name.toLowerCase()))

        return {
          code: d.util.setCode(data)
        }
      }
    });
    
    
    /**
     * $translate
     * PARAMS: [str_from? ; str_to? ; str_text]
     */
    
    client.functionManager.createFunction({
      name: "$translate",
      type: "djs",
      code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [from = "auto", to = "en", text = "Text"] = data.inside.splits;

        async function translate() {
          let request = await fetch(`https://ild.vercel.app/api/translate?from=${from}&to=${to}&text=${text}`);

          let result = await request.json()
          return result.output;
        }

        data.result = await translate();

        return {
          code: d.util.setCode(data)
        };
      }
    });
    
    
    /**
     * $spotifySearch
     * PARAMS: [str_songname]
     */
     
    client.functionManager.createFunction({
      name: "$spotifySearch",
      type: "djs",
      code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [songName] = data.inside.splits;

        if (!songName) return d.aoiError.fnError(d, 'custom', {}, 'Missing song name!');

        // You should use your own credentials from the Spotify API here
        const clientId = '62296fb6b69f4fcc9c471b4c92ccbbc0';
        const clientSecret = 'cd8eef61aacc411bac306aad9f9d666f';

        
        const authResponse = await axios.post('https://accounts.spotify.com/api/token', null, {
            params: {
                grant_type: 'client_credentials',
            },
            headers: {
                Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
            },
        });

        const accessToken = authResponse.data.access_token;

       
        const searchResponse = await axios.get('https://api.spotify.com/v1/search', {
            params: {
                q: songName,
                type: 'track',
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const firstTrack = searchResponse.data.tracks.items[0];

        if (!firstTrack) {
            return d.aoiError.fnError(d, 'custom', {}, 'No results found for the song!');
        }

        const spotifyUrl = firstTrack.external_urls.spotify;
        const urlWithoutHttps = spotifyUrl.replace(/^https:\/\//, ''); // Remove "https://"

        data.result = urlWithoutHttps;
        return {
            code: d.util.setCode(data)
        };
      },
    });
    
    
    /**
     * $isCaps
     * PARAMS: [int_percentage% ; str_text]
     */
    client.functionManager.createFunction({
      name: "$isCaps",
      type: "djs",
      code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [percentage, message] = data.inside.splits;

        const capsPercentage = (message.replace(/[^A-Z]/g, "").length / message.length) * 100;
        const isCaps = capsPercentage >= parseFloat(percentage);

        data.result = isCaps;
        return {
            code: d.util.setCode(data)
        };
      }
    });
    
    
    /**
     * $chatAI
     * PARAMS: [str_text]
     * NOTE: API LANGUAGE -> TURKISH
    */
    
    client.functionManager.createFunction({
      name: "$chatAI",
      type: "djs",
      code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [text] = data.inside.splits;
        
        if(!text) return d.aoiError.fnError("custom", {}, "You did not write text.");
        const api = await fetch(`https://api.codare.fun/sor/${encodeURI(text)}`)
          .then(response => response.json());
        if(api.error) throw 'Could not connect to CodAre API'
        data.result =  api.cevap;
        
        return {
          code: d.util.setCode(data)
        }
      }
    });
    
    
    /**
     * $urlCheck
     * PARAMS: [text]
     * returns: bool
     */
     
     client.functionManager.createFunction({
      name: "$urlCheck",
      type: "djs",
      code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [ link ] = data.inside.splits;
        const pattern = /(((?:http(?:s){0,1}:\/\/){0,1}(?:w{0,3}\.){0,1})([a-z0-9\w-]+(\.[a-z\.]+)\/{0,1})([a-z0-9\/@\w]+)?)/gi;
        
        data.result = pattern.test(link);

        return {
            code: d.util.setCode(data)
        };
      }
    });
    
    
    /**
     * $textToImage
     * PARAMS: [str_text]
    */
    
    client.functionManager.createFunction({
      name: "$textToImage",
      type: "djs",
      code: async (d) => {
        const axios = require("axios");
        const sharp = require("sharp");
        const { AttachmentBuilder } = require('discord.js');
    
        const data = d.util.aoiFunc(d);
    
        const base64ToImage = async (base64String, outputPath) => {
          const buffer = Buffer.from(base64String, 'base64');
          await sharp(buffer).toFile(outputPath);
          return outputPath;
        };
    
        const [text] = data.inside.splits;
        if (!text) return d.aoiError.fnError("custom", {}, "You did not enter any text.");
    
        const postData = {
          positive_prompt: text,
          negative_prompt: "blurry, bad",
        };
    
        try {
          const response = await axios.post('https://api.zuzia.dev/text-to-image/v1', postData);
    
          const base64String = response.data.images[0];
          const outputPath = "text-to-image.png";
    
          await base64ToImage(base64String, outputPath);
    
          // v14
         const attachment = new AttachmentBuilder(outputPath);
          const channel = d.message.channel;
          const sentMessage = await channel.send({ files: [attachment] });
          data.result = sentMessage;
    
        } catch (error) {
          console.error('[ $textToImage ] - An error occurred', error);
        } finally {
          return {
            code: d.util.setCode(data)
          };
        }
      }
    });
    
    
    
      client.functionManager.createFunction({
       name: "$recreateChannel",
       type: "aoi.js",
       params: ["channelId"],
       code: `
       $deleteChannels[$get[channelID]]
       $cloneChannel[$get[channelID];$get[channelNAME]]
       $let[channelNAME;$channelName[$get[channelID]]]
       $let[channelID;$replaceText[$replaceText[$checkCondition[$messageExists[{channelId}]==true];true;{channelId}];false;$channelID]]
       `
     });


    client.functionManager.createFunction({
      name: "$c",
      type: "djs",
      code: async (d) => {
        const data = d.util.aoiFunc(d);
        const [ text ] = data.inside.splits;
        if (!text) return d.aoiError.fnError(d, 'custom', {}, 'No Text was Provided');
        return {
          code: d.util.setCode(data)
        }

      }
    })
    
    
    
    
    
    
    
  } checkUpdates() {
    console.log(chalk.white.bold("[Mocaoi.js AutoUpdate] ") + chalk.yellow("Checking for updates..."));

    exec("npm show mocaoi.js version", (error, stdout, stderr) => {
      if (error) {
        console.error(chalk.red("Error checking for updates:", error.message));
        return;
      }

      const latestVersion = stdout.trim();
      const currentVersion = require("../package.json").version;

      if (latestVersion !== currentVersion) {
        console.log(chalk.white.bold("[Mocaoi.js AutoUpdate] ") + chalk.green("Updating module..."));
        exec("npm install mocaoi.js@latest", (updateError) => {
          if (updateError) {
            console.error(chalk.white.bold("[Mocaoi.js AutoUpdate] ") + chalk.red("Error updating module:", updateError.message));
          } else {
            console.log(chalk.white.bold("[Mocaoi.js AutoUpdate] ") + chalk.green("Module updated successfully, Restart your project for the new version to become active."));
          }
        });
      } else {
        console.log(chalk.white.bold("[Mocaoi.js AutoUpdate] ") + chalk.green("Module is up-to-date."));
      }
    });
  }
  
}

module.exports = { Plugin };