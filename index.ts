import puppeteer from 'puppeteer';

export class Crawler{
    async scrapePca(url: string) {
        // make db connection and import Client and Pca models
        const database = require('./db');
        const Customer = require('./customer');
        const Pca = require('./pca');

        try {
            const result = await database.sync();
            console.log(result);
        } catch (error) {
            console.log(error);
        }

        // Launch the browser and open a new blank page
        const browser = await puppeteer.launch({ignoreHTTPSErrors: true, headless: false});
        const page = await browser.newPage();

        // Navigate the page to a URL
        await page.goto(url);

        // Set screen size and set time to wait the page load completelly
        await page.setViewport({width: 1920, height: 1080});
        await page.waitForTimeout(1000);

        // Type into search box and send form
        await page.type('#input-pesquisa-orgao', 'cliente de testes');
        await page.click('button#btn-pesquisa-orgao');

        // Wait for customer search result
        const searchResultSelector = '#result-pesquisa a';
        await page.waitForSelector(searchResultSelector);
        await page.waitForTimeout(1000);

        // Save or retrieve customer in database
        const customerData = await page.$$eval('#result-pesquisa > table > tbody > tr', rows => {
            return Array.from(rows, row => {
                const columns = row.querySelectorAll('td');
                return Array.from(columns, column => column.innerText);
            });
        });

        const [customer, created] = await Customer.findOrCreate({
            where: { cnpj: customerData[0][0] },
            defaults: {
                cnpj: customerData[0][0],
                corporate_name: customerData[0][1]
            }
        });
        if (created) {
            console.log(customer.corporate_name); // This will certainly be 'Technical Lead JavaScript'
        }

        // Click on the customer link
        await page.click(searchResultSelector);

        // wait for pca rows
        const pcaResultSelector = '#result-pesquisa > table > tbody';
        await page.waitForSelector(pcaResultSelector);

        const result = await page.$$eval('#result-pesquisa > table > tbody > tr', rows => {
            return Array.from(rows, row => {
                const columns = row.querySelectorAll('td');
                return Array.from(columns, column => column.innerText);
            });
        });

        // Save PCAs
        result.map(async (row) => {
            await Pca.findOrCreate({
                where: {
                    id_customer: customer.id,
                    year: row[0],
                    status: row[1],
                    identification: row[2],
                    budget_value: row[3],
                    items: row[4]
                },
                defaults: {
                    id_customer: customer.id,
                    year: row[0],
                    status: row[1],
                    identification: row[2],
                    budget_value: row[3],
                    items: row[4]
                }
            });
        })

        await page.waitForTimeout(5000);
        await browser.close();
    }
}

async function main() {
    const scraper = new Crawler();
    await scraper.scrapePca('https://www.bpsaude.com.br/Transparencia/');
}

main();