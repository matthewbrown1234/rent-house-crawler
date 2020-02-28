require('dotenv').config();
const schedule = require("node-schedule");
const jobRunner = require("./services/job_runner")
const AppDAO = require("./services/dao");
const CacheRepository = require("./services/cache_repository");

const INJECTED_SCRIPT = require(process.env.INJECTED_SCRIPT);
const PAGE_TO_CRAWL = process.env.PAGE_TO_CRAWL;
const TOKEN = process.env.TOKEN;
const TELEGRAM_CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;
const CRON_JOB_SCHEDULE = process.env.CRON_JOB_SCHEDULE;


const appDao = new AppDAO("./database.sqlite3");
const cacheRepository = new CacheRepository(appDao)

const main = async () => {
  await cacheRepository.createTable();
  const job = schedule.scheduleJob(CRON_JOB_SCHEDULE, function(){
    jobRunner(cacheRepository, INJECTED_SCRIPT, PAGE_TO_CRAWL, TOKEN, TELEGRAM_CHANNEL_ID);
  });
};

main();



 
