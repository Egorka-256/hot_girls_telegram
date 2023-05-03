const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.TOKEN);
bot.start((ctx) => {
    const extra = Markup.keyboard([
        ["/waifu", "/cake"]
    ]).resize();
    ctx.reply("Команды: /waifu-sfw, /cake-nsfw", extra)
});
bot.command("waifu", async (ctx) => {
    try {
        const response = await fetch("https://api.waifu.pics/sfw/waifu");
        const data = await response.json();
        const imageUrl = data.url;
        ctx.replyWithPhoto({ url: imageUrl });
        console.log("waifu")
    } catch (error) {
        console.log(error);
        ctx.reply("Упс! Что-то пошло не так!");
    }
});
bot.command("cake", async (ctx) => {
    try {
        const response = await fetch("https://api.waifu.pics/nsfw/waifu");
        const data = await response.json();
        const imageUrl = data.url;
        ctx.replyWithPhoto({ url: imageUrl });
        console.log("cake!")
    } catch (error) {
        console.log(error);
        ctx.reply("Упс! Что-то пошло не так!");
    }
});


bot.launch();
console.log("сучка запущена")

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));