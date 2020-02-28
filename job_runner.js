const crawlAndPost = require("./crawl_and_post");

module.exports = async (cacheRepository, INJECTED_SCRIPT, PAGE_TO_CRAWL, TOKEN, TELEGRAM_CHANNEL_ID) => {
    const crawledData = await crawlAndPost.crawl(PAGE_TO_CRAWL, INJECTED_SCRIPT);
    const savedCrawledData = await cacheRepository.fetchLastCache();
    
    if(JSON.stringify(crawledData) !== JSON.stringify(JSON.parse((savedCrawledData || "{}").returned_cached || "{}"))){
      console.log('new info posted!')
      await cacheRepository.add(JSON.stringify(crawledData))
      crawlAndPost.post(TOKEN, TELEGRAM_CHANNEL_ID, `${JSON.stringify(crawledData, null, 4)}`)
    }
    else{
      console.log('no new info')
    }
}