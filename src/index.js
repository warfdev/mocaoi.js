const chalk = require("chalk");
const { exec } = require("child_process");
const fetch = require("node-fetch");
const { version } = require("../package.json");


async function executeLog(){
  console.log("\n\n\n");
  console.log(chalk.magenta.bold(`'|—————  mocaoi.js | Plugin - Vers: v1.0 —————'`));
  console.log(chalk.magenta.bold(`'|————— | developer — github: warfdev  —————'`));
  console.log(chalk.green.bold(`'|———— INFORMATION ———— |`) + chalk.white.dim(`functions list: link`));
  console.log("\n\n\n");
}

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
      this.LoadAndLogCustomFunctions();
    } else if(this.loadPlugin && !this.executeOnLog){
      this.LoadCustomFunctions();
    }
    
    // auto update
    if(this.autoUpdate){
      this.checkUpdates();
    }
    
  } LoadAndLogCustomFunctions(){
    
    const client = this.options.client;
    
    client.on("ready", () => {
      executeLog();
    });
    
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
        const { version } = require("./package.json")
        data.result = version;

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
    
    
    
  } LoadCustomFunctions(){
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
        const { version } = require("./package.json")
        data.result = version;

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
    
    
    
    
    
  } checkUpdates() {
    console.log(chalk.white.bold("[Mocaoi.js AutoUpdate] ") + chalk.yellow("Checking for updates..."));

    exec("npm show module-name version", (error, stdout, stderr) => {
      if (error) {
        console.error(chalk.red("Error checking for updates:", error.message));
        return;
      }

      const latestVersion = stdout.trim();
      const currentVersion = require("./package.json").version;

      if (latestVersion !== currentVersion) {
        console.log(chalk.green("Updating module..."));
        exec("npm install module-name", (updateError) => {
          if (updateError) {
            console.error(chalk.white.bold("[Mocaoi.js AutoUpdate] ") + chalk.red("Error updating module:", updateError.message));
          } else {
            console.log(chalk.white.bold("[Mocaoi.js AutoUpdate] ") + chalk.green("Module updated successfully!"));
          }
        });
      } else {
        console.log(chalk.white.bold("[Mocaoi.js AutoUpdate] ") + chalk.green("Module is up-to-date."));
      }
    });
  }
  
}

module.exports = { Plugin };