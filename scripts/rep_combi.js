const Page = require('../lib/webdrivers'),
    Expect = require('../lib/chai-expect'),
    fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
    var ks = require('node-key-sender');

var td = '/SKU Combination.csv';
var ts = '/SKU Combination.txt';
    
// SALES REPORT (SINGLE VS MULTIPLE)
describe('Amzentrix tests for SKU Combination', async function () {
    beforeEach(async () => {	
    	page = new Page();
        expect = new Expect();
        driver = page.driver;
        
        await page.CreateLog(ts, "SKU Combination  \n");
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
        		await page.Store_Reports_BIM("Sales Report (SKU Combinations)");
                await page.Log(ts, " Go to Sales Report (Buyer Frequency) page \n");
            	await page.getClassText("page-header").then(function(text) {
            		return expect.toEqual(text, "CHALLENGER USA - SALES REPORT (SKU COMBINATIONS)");
            	});

                try{
                    await page.clearName("date_from");
                    await page.writeByName("date_from", "03/01/2019");
                    await page.clearName("date_to");
                    await page.writeByName("date_to", "04/01/2019");
                    await page.writeByName("sku", "S101");
                    await ks.sendKeys(['tab', 'enter']);
                    passed(10,td);
                } catch (error){
                    console.log(error);
                    failed(10,td);
                }

                try{
                    await page.getCssText("table:nth-child(1) > thead > tr:nth-child(1) > th").then(function(text) {
                        return expect.toEqual(text, "MARCH");
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
            await fs.appendFile( page.path , 'Sales Report (SKU Combination) SUCCESSFUL \n', function(err) {
                
            })  
        } catch (error) {
            await fs.appendFile( page.path, 'Sales Report (SKU Combination) FAILED \n', function(err) {
                console.log('\t   ' + error );
            })  
        }
    });
     afterEach(async () => page.quit());
});
