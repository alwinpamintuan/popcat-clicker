import puppeteer from 'puppeteer'

(async () => {

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        userDataDir: './dataCache'
    })
    
    const page = await browser.newPage()
    await page.goto('https://popcat.click/', {waitUntil: 'networkidle2'})
    const cat = await page.$('div.cat-img')

    while(true){
        await cat.click()
        // page.waitForTimeout(75)
    }
})()