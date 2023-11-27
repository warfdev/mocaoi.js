
// CFNC HANDLER - file 1


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
const devIds = require("../json/devs.json");
const warfdevID = devIds.discord.ids.warfdev; // discord name: zmochas





module.exports = async (client) => {
  
  /**
   * $join
   * PARAMS: [separator;...text]
   */
  
  client.functionManager.createFunction({
    name: '$join',
    type: 'djs',
    code: async d => {
      const data = d.util.aoiFunc(d);
      const { splits } = data.inside;

      if (!splits[0] || !splits[1]) return d.aoiError.fnError(d, 'custom', {}, 'Not enough arguments provided');
      data.result = splits.slice(1).join(splits[0]);

      return {
      code: d.util.setCode(data)
      };
    }
  });
  
  
  
  
  /**
   * $reverseText
   * PARAMS: [text]
   */
   
   client.functionManager.createFunction({
    name: '$reverseText',
    type: 'djs',
    code: async d => {
      const data = d.util.aoiFunc(d);
      const [text] = data.inside.splits;

      if (!text) return d.aoiError.fnError(d, 'custom', {}, 'No text provided');
      data.result = text.split('').reverse().join('');

      return {
        code: d.util.setCode(data)
      };
    }
  });
  
  
  
  
  /**
   * $fetchGuilds
   * PARAMS: [separator?;id/name]
   */
   
     client.functionManager.createFunction({
      name: '$fetchGuilds',
      type: 'djs',
      code: async d => {
        const data = d.util.aoiFunc(d);
        const { splits } = data.inside;
      
        const separator = splits[0] || ' , '; // default ','
      
        if (splits[1] === 'id') {
          // Return server IDs
          data.result = d.client.guilds.cache.map(guild => guild.id).join(separator);
          return { code: d.util.setCode(data) };
        } else {
          // Return server names
          data.result = d.client.guilds.cache.map(guild => guild.name).join(separator);
          return { code: d.util.setCode(data) };
        }
      }
    });
    
    
    
    
    /**
     * $ceil
     * PARAMS: [number]
     */
     
     client.functionManager.createFunction({
       name: "$ceil",
       type: "djs",
       code: async (d) => {
         const data = d.util.aoiFunc(d);
         const [ number ] = data.inside.splits;
         if(!number) return d.aoiError.fnError(d, "custom", {}, "No number provided.");
         if (isNaN(number)) return d.aoiError.fnError(d, 'custom', {}, 'Invalid Number Provided In');
         
         
         data.result = Math.ceil(number)
         
         return { code: d.util.setCode(data) }
       }
     })
  
};

// end