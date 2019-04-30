

const Commando = require('discord.js-commando');
const talkedRecently = new Set();

const roblox = require('noblox.js')
const Discord = require('discord.js')
const client = new Discord.Client();
var token = "NTcyMTQ1MzYyNTg0ODYyODEz.XMdMow.dMFFzpIYJxRH84wFvaVFtAOPbrY";

client.login(token)

var cookie = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_D786B57104BD533AB891C3CC5C0444BB47F23B9869B12F717E9B7D4E7463D8B4B2F74469828B8E02B3432B079E959D6417CBF217367258A3BC0AC3CF2E35AB599E1F1658583FB9DBA2767F86D422EF8460B034A54FAD2940D09DCE43E1520EFD6F9533C75E9849D2080338814C464FE5DDA91272ACAFC7A5540277A762242AF7BA29577D59155F9359C12CA959329C78D81DB57CE05A6CF19FA539EFADDA9369FF6C06EAA72C5650E67DC298135F5F5F59207952F36AFA44561018C31C9D705F7190491993B214634733724941F611F475335DB87E14885C493E521A9097D0640EF50C14D7C806A4ECFBEA3D0FFFA0165E791A150003FD7D5DB236D42324944B7AE9F987754FCC1F5F195F95388C3E192361932D9DBF85192E5BA5D9E998112CCAB0D7112EB8A4BD396DFA6A18C76569A4F6A311";

var prefix = '#';
var groupId = 4878430;
var maximumRank = 255;

function login() {
    return roblox.cookieLogin(cookie);
}

login() // Log into ROBLOX
    .then(function() { // After the function has been executed
        console.log('Logged in.') // Log to the console that we've logged in
    })
    .catch(function(error) { // This is a catch in the case that there's an error. Not using this will result in an unhandled rejection error.
        console.log(`Login error: ${error}`) // Log the error to console if there is one.
    });
 
function isCommand(command, message){
    var command = command.toLowerCase();
    var content = message.content.toLowerCase();
    return content.startsWith(prefix + command);
}
 
client.on('message', (message) => {
    if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
   
    if(isCommand('rank', message)){
    
       if(!message.member.roles.some(r=>["BotAdmin","Developers","Chairman"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
        return message.reply("You do not have permission to use this command. Very sad. ");
        var username = args[1]
        var rankIdentifier = Number(args[2]) ? Number(args[2]) : args[2];
        if (!rankIdentifier) return message.channel.send("Please enter a rank");
        if (username){
          //embed start
          message.channel.send({embed: {
            color: 14177041,
            description: `Checking ROBLOX for ${username}`
          }});
          //end

            //message.channel.send(`Checking ROBLOX for ${username}`)
            roblox.getIdFromUsername(username)
            .then(function(id){
                roblox.getRankInGroup(groupId, id)
                .then(function(rank){
                    if(maximumRank <= rank){
                      message.channel.send({embed: {
                        color: 14177041,
                        description: `${id} is rank ${rank} and not promotable. :exclamation: `
                      }});
                        //message.channel.send(`${id} is rank ${rank} and not promotable.`)
                    } else {
                      message.channel.send({embed: {
                        color: 14177041,
                        description: `${id} is rank ${rank} and promotable. :white_check_mark: `
                      }});
                     
                        //message.channel.send(`${id} is rank ${rank} and promotable.`)
                        roblox.setRank(groupId, id, rankIdentifier)
                        .then(function(newRole){
                          message.channel.send({embed: {
                            color: 3447003,
                            description: `Changed rank to ${newRole.Name}`
                          }});
                            //message.channel.send(`Changed rank to ${newRole.Name}`)
                        }).catch(function(err){
                            console.error(err)
                            message.channel.send({embed: {
                              color: 3447003,
                              description: `:exclamation:  I'm not even ranked or I have a invalid cookie <@459017979103936523> revive me. :exclamation: `
                            }});
                            //message.channel.send("I'm not even ranked or I have a invalid cookie <@459017979103936523> revive me.")
                        });
                    }
                }).catch(function(err){
                    message.channel.send("This mans is not even in the group.")
                });
            }).catch(function(err){
                message.channel.send(`Sorry, but ${username} doesn't exist on ROBLOX.`)
           });
       } else {
           message.channel.send("Please enter a username.")
       }
       return;
   }
})




  client.on("ready", () => {
    client.user.setActivity("builderman", { type: "STREAMING", url: "https://www.roblox.com/users/84803860/profile" })
  })
  
 
   
  client.on('message', function(message){
    if(message.content == '#help')
  {
    message.channel.send({embed: {
        color: 3447003,
        
        
        title: "Here are the commands.",
        
        description: "Discord -> roblox",
        fields: [{
            name: "#rank (plr) (role #)",
            value: "Ranks the player in the group"
          },
          
          
        ],
       
       
        timestamp: new Date(),
        footer: {
          
          text: "Buildermane"
        }
      }
    });
  }
  
  });
