const Page = require('../lib/webdrivers'),
    Expect = require('../lib/chai-expect'),
    fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
    var ks = require('node-key-sender');

var td = '/SKU Update.csv';
var ts = '/SKU Update.txt';

describe('Amzentrix tests for Reports SKU Update Reports', async function(){
    beforeEach(async() => {
        page = new Page();
        expect = new Expect();
        driver = page.driver;
        
        await page.CreateLog(ts, "SKU Update \n");
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

        await page.Log(ts, "click Reports \n");
        await page.clickXpath("//*[@id='sidebar']/ul/li[7]/a/span");

        await page.Log(ts, "user scroll down \n");
        await ks.sendKeys(['down', 'down', 'down', 'down', 'down', 'down']);

        try{
		await page.Log(ts, "view SKU Update Reports")
    await page.scrollByXpath("//*[@id=\"main-content\"]//div[4]//div//tr[13]/td[1]//a[1]/span");
		await page.clickXpath("//*[@id=\"main-content\"]//div[4]//div//tr[13]/td[1]//a[1]/span");
			   passed_a(0,td);

        } catch (error){
              console.log('\t   ' + error );
              failed_a(0,td);
        }
	}); 
	it('to verify S101W and B07MGZGCW3', async () => {
		try{
		
			await page.Log(ts, "write SKUTest2 \n");
			await page.writeById("sku", "SKUTest2");
			await ks.sendKey('down');
			await page.Log(ts, " SUCCESSFULL validation \n");
			await page.getXpathText("//*[@id=\"main-content\"]//table/tbody/tr[4]/td[2]").then(function(text) {
				return expect.toHaveString(text, "SKUTest2");

			});
			       passed_a(4,td);

		
		 await fs.appendFile( page.path, 'SKU Update  SUCCESSFUL \n', function(err) {
    
         })

    } catch (error) {
      await fs.appendFile( page.path, 'SKU Update FAILED  \n', function(err) {
          console.log('\t   ' + error );
        })
              failed_a(4,td);
      }
      page.quit();
   });
});