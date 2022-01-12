const { Client, Intents, DiscordAPIError, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require('fs');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === '오옹!') {
        msg.reply('나이스!');
    }
   if (msg.content === '나는!') {
        msg.reply('장풍을 했다!!');
    }
   if (msg.content === '아로로님 한판해요') {
      msg.reply('나가!!');
    }
        
    
    if(msg.author.bot) return;
    if(msg.author.id === client.user.id) return;

    const id = msg.author.id;
    const name = msg.author.username;

    const filePath = `./data/${id}.json`;

    !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null;

    const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const today = new Date();
    const date = "" + today.getFullYear() + today.getMonth() + today.getDate();

    const howMuch = 500;

    if(msg.content === "아로야 uc코인 줘"){
        let saveUser = {};
        if(user.id) {
            if(user.date === date ) {
                msg.reply(`오늘은 이미 받았어요. 내일 다시 오세요!`);
                saveUser = user;
            }
               else {
                   msg.reply(`${howMuch}원이 지급되었어요!\n${name}의 현재 코인은 ${user.money} -> ${user.money + howMuch}이에요!`); 
                   saveUser = {
                       id, 
                       name,
                       date,
                       money : user.money + howMuch,
                   }
               }
            }

            else {
                msg.reply(`${name}!! 시작하는걸 환영해요! ${howMuch}원이 지급되었어요!`);
                saveUser = {id, name, date, money : howMuch};
        }

        fs.writeFileSync(filePath, JSON.stringify(saveUser));
    }

    if(msg.content === "아로야 내 uc"){
        user.id ? msg.reply(`${name}님의 현재 uc코인은 ${user.money}입니다!`) : msg.reply(`uc 코인이 하나도 없습니다! 아로야 uc코인 줘 를 입력해서 uc코인을 얻으세요!`)
    }

    if(msg.content === "가위" || msg.content === "바위" || msg.content === "보") {
     const human = msg.content;
     const list = ["가위", "바위", "보"];
     const random = Math.floor(Math.random() * 3);

     const bot = list[random];

     let winner = "";

     if(human === bot) {
         winner = "비김";    
     }
     else {
         human === "가위" ? (winner = bot === "바위" ? "봇" : "인간") : "";
         human === "바위" ? (winner = bot === "보" ? "봇" : "인간") : "";
         human === "보" ? (winner = bot === "가위" ? "봇" : "인간") : "";
        }

     const result =
`
사람 : ${human} vs 봇 : ${bot}
${winner === "비김" ? "비겼어요!" : winner + "이 이겼어요!"}
`


     msg.reply(result);
    }


});

client.login('OTMwNDI5MTU0MTExOTQ2NzUz.Yd1vrA.vhiLBIbX_rQHlsuF5Wo0La-yT6A');