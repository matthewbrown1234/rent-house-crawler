const puppeteer = require('puppeteer');
const TelegramBot = require('node-telegram-bot-api');

module.exports = {
    post: (token, telegramChannelId, textToSend) => {
        const bot = new TelegramBot(token, {polling: false});
        bot.sendMessage(telegramChannelId, textToSend);
    },
    crawl: async (urlToCrawl, evaluationScript) => {
        console.log(`visiting page ${urlToCrawl}`);
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(urlToCrawl);
    
        const dataReturned = await page.evaluate(evaluationScript);
    
        await browser.close();
        return dataReturned;
    }
}