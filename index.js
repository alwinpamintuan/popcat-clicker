const puppeteer = require('puppeteer');
const args = require('minimist')(process.argv.slice(2));

(async () => {
    const browser = await puppeteer.launch({
        headless: args['headful']? false : true
    })
    
    const page = await browser.newPage()
    await page.setExtraHTTPHeaders({
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8", 
        "Accept-Encoding": "gzip, deflate, br", 
        "Accept-Language": "en-US,en;q=0.5", 
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0",
    })

    await page.goto('https://popcat.click/', {waitUntil: 'networkidle2'}),
    await page.waitForSelector('div.cat-img')

    const cat = await page.$('div.cat-img')
    await page.screenshot({path: 'verify-ready.png'})

    if(args['update']){
        setInterval(async () => {
            await page.screenshot({path: `./screenshots/update.png`})
        }, parseInt(args['update']))
    }

    await click(cat);
    setInterval(async () => await click(cat), 30000);
})()

async function click(cat){
    for(let i=0; i<800; i++) await cat.click()
}