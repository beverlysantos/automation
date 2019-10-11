const Page = require('../lib/webdrivers'),
    Expect = require('../lib/chai-expect'),
    fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
    var ks = require('node-key-sender');

var td = '/Buyer Frequency.csv';
var ts = '/Buyer Frequency.txt';
    
// SALES REPORT (SINGLE VS MULTIPLE)
describe('Amzentrix tests for Report Sales Report (Buyer Frequency)', async function () {
    beforeEach(async () => {	
    	page = new Page();
        expect = new Expect();
        driver = page.driver;
        
        await page.CreateLog(ts, "Buyer Frequency  \n");
        await page.Log(ts, 'Navigate to http://www.amzentrix.uat40/login \n');
        await page.visit("http://www.amzentrix.uat40/login");

       await page.Log(ts,' Input Email Address field: jbeverly_qa@amzentrix.com \n');
        await page.writeByName("email", "jbeverly_qa@amzentrix.com");

        await page.Log(ts,' Input Password: ***** \n');
        await page.writeByName("password", "password");     

        await page.Log(ts,' Click Submit button \n');
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
        await page.getClassText("page-header").then(function(text)   {
            return expect.toEqual(text, "REPORTS CHALLENGER USA\nADD");
        });
	});

	it('Should search Sales Report (Buyer Frequency)', async () => { 
        try {
            try{
        		await page.clickXpath("//*[@id=\"main-content\"]/section/div[4]/div/div/div/table/tbody/tr[6]/td[1]/div/a[1]");
                await page.Log(ts, " Go to Sales Report (Buyer Frequency) page \n");
            	await page.getClassText("page-header").then(function(text) {
            		return expect.toEqual(text, "CHALLENGER USA - SALES REPORT (BUYER FREQUENCY)");
            	});
                 try {
                    await page.clickXpath("//*[@id=\"app\"]/div[1]/div[2]/div/div/input");
                    await page.clearName("selected_sku"); 
                    await page.writeByName("selected_sku", "S101");
                    await page.clearName("dateFrom");
                    await page.writeByName("dateFrom", "05/01/2019");
                    await page.clearName("dateTo");
                    await page.writeByName("dateTo", "05/08/2019");
                    passed(10,td);
                } catch (error) {
                    console.log(error);
                    failed(10,td);
                }
            	
        		await page.clickXpath("//*[@id=\"main-content\"]/section/div[2]/div/form/div[2]/div/button");
        		
                try{
                    await page.scrollByXpath("//*[@id=\"main-content\"]/section/div[6]/div/div/table/tbody/tr[1]/td[2]");
                    await page.getXpathText("//*[@id=\"main-content\"]/section/div[6]/div/div/table/tbody/tr[1]/td[2]").then(function(text) {
                        return expect.toEqual(text, "Challenger USA");
                    });
                    passed(6,td);
                } catch (error){
                    console.log(error);
                    failed(6,td);
                }
    		    passed(4,td);
            } catch (error){
                console.log(error);
                failed(4,td);
            }
            await fs.appendFile( page.path , 'Sales Report (Buyer Frequency) SUCCESSFUL \n', function(err) {
                
            })  
        } catch (error) {
            await fs.appendFile( page.path, 'Sales Report (Buyer Frequency) FAILED \n', function(err) {
                console.log('\t   ' + error );
            })  
        }
	});
	 afterEach(async () => page.quit());
});
