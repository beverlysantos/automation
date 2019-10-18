const Page = require('../lib/webdrivers'),
    Expect = require('../lib/chai-expect'),
    fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
    var ks = require('node-key-sender');

var td = '/Business Report per ASIN.csv';
var ts = '/Business Report per ASIN.txt';

describe('Amzentrix tests for Report Business Report per ASIN', async function () {
    beforeEach(async () => {	
    	page = new Page();
        expect = new Expect();
        driver = page.driver;
        
        await page.CreateLog(ts, "Business Report per ASIN  \n");
        await page.Log(ts, 'Navigate to http://www.amzentrix.uat40/login \n');
        await page.visit("http://www.amzentrix.uat40/login");

        await page.Log(ts, 'input Email Adress: aybalane@gmail.com \n');
        await page.writeByName("email", "aybalane@gmail.com");

        await page.Log(ts, 'input password: password \n');  
        await page.writeByName("password", "password");     

        await page.Log(ts, 'click submit button \n');
        await page.clickClassName("btn btn-primary btn-round btn-lg btn-block");

        await page.Log(ts, "click Challenger USA \n");
        await page.clickId("store_1");
        await page.clickId("fvpp-blackout");
        
        await page.Log(ts, " SUCCESSFULL validation \n");
        await page.getClassText("page-header").then(function(text)   {
            return expect.toEqual(text, "DASHBOARD CHALLENGER USA");
        });

        await page.Log(ts, " Go to Reports Module \n");
		await page.clickXpath("//*[@id=\"sidebar\"]/ul/li[7]/a/span");
		await page.getClassText("page-header").then(function(text)	 {
    		return expect.toEqual(text, "REPORTS CHALLENGER USA\nADD");
		});
	});

	it('Should search Business Report', async () => { 
        try{
            try {
        		await page.clickXpath("//*[@id=\"main-content\"]/section/div[4]/div/div/div/table/tbody/tr[1]/td[1]/div/a[1]/span");
            	await page.getXpathText("//*[@id=\"app\"]/div/div/div[1]/div/h1/small").then(function(text) {
            		return expect.toEqual(text, "Business Reports Per Asin");
            	});

                try{
                    await page.Log(ts,' Input Date From\n');
                    await page.clickXpath("//*[@id=\"date_from\"]");
                    await page.clickXpath("//*[@id='searchForm']//div[2]//div[1]/div[1]//div[2]/header/span[1]");
                    await page.clickXpath("//*[@id='searchForm']//div[2]//div[1]/div[1]//div[2]//span[17]");
                    passed(7,td);
                } catch (error) {
                    console.log(error);
                    failed(7,td);
                }

                try{
                    await page.Log(ts,' Input Date To\n');
                    await page.clickXpath("//*[@id=\"date_to\"]");
                    await page.clickXpath("//*[@id='searchForm']//div[2]//div[1]/div[2]//div[2]/header/span[1]");
                    await page.clickXpath("//*[@id='searchForm']//div[2]//div[1]/div[2]//div[2]/header/span[1]");
                    await page.clickXpath("//*[@id='searchForm']//div[2]//div[1]/div[2]//div[2]//span[20]");
                    passed(8,td);
                } catch (error) {
                    console.log(error);
                    failed(8,td);
                }

                 try{
                    await page.Log(ts,' Select \'amazon.com\' \n');
                    await page.clickId("sales_channel");
                    await page.clickXpath("//*[@id='sales_channel']/option[3]");

                    passed(10,td);
                } catch (error) {
                    console.log(error);
                    failed(10,td);
                }
                await page.writeById("child_asin", "B00NLZUM36")
            	await page.clickXpath("//*[@id=\"searchForm\"]/div/div/div/div[2]/form/div[3]/div/button[1]/span");
        		
                 try{
                    await page.Log(ts,' Validate searched date [SUCCESSFUL] \n');
                   await page.findByXpath('//*[@id=\"line-chart\"]').then(function(webElement) {
                        console.log('Element exists');
                    }, function(err) {
                        if (err.state && err.state === 'no such element') {
                            console.log('Element not found');
                        }
                    });

                    passed(6,td);
                } catch (error) {
                    console.log(error);
                    failed(6,td);
                }
        		passed(4,td);
            } catch (error) {
                console.log(error);
                failed(4,td);
            }

           await fs.appendFile(page.path, 'Business Reports Per Asin SUCCESSFUL\n', function(err) {

            })
        }catch (error){
            await fs.appendFile(page.path, 'Business Reports Per Asin FAILED\n', function(err) {
                console.log('\t'+error);
            })
            console.log(error)
        }   
	});
	 afterEach(async () => page.quit());
});
