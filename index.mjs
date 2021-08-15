import puppeteer from 'puppeteer'

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
        userDataDir: './data_cache'
    })
    
    const page = await browser.newPage()
    await page.goto('https://popcat.click/')
    await page.waitForSelector('div.cat-img')

    const cat = await page.$('div.cat-img')
    await page.hover('div.cat-img')

    while(true) await cat.click()
})()