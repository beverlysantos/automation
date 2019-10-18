const Page = require('../lib/webdrivers'),
	  Expect = require('../lib/chai-expect'),
	  fs  = require("fs"),
      time = require('node-get-time');
 	  mkdirp = require('mkdirp');
	  var ks = require('node-key-sender');

var td = '/SKU History.csv';
var ts = '/SKU History.txt';  
describe('Amzentrix tests for Report SKU HISTORY REPORT', async function () {
	beforeEach(async() =>  {
		page = new Page();
		expect = new Expect();
		driver = page.driver;

			await page.CreateLog(ts, "SKU History Report ");
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
			await page.clickLink("Reports");
			await ks.sendKeys(['down', 'down', 'down', 'down']);

		try{
			await page.Log(ts, "click SKU Trend Monitoring \n");
			await page.clickXpath("//*[@id='main-content']/section/div[4]/div/div/div/table/tbody/tr[11]/td[1]/div/a[1]/span");
		   
		   	  passed_a(0,td);
          }catch(error) {
              console.log('\t   ' + error );
              failed_a(0,td);
        }
	 }); 
	it('Should search May 01, 2019 to May 31, 2019', async () => {
	 try{
	  	try{
		  	await page.Log(ts, "write date_from \n");
			await page.writeByName("date_from", "05/01/2019");

			await page.Log(ts, "write date_to \n");
			await page.writeByName("date_to","05/31/2019");

			await page.Log(ts, "write SKU \n");
			await page.writeByName("sku", "K552");

			await page.Log(ts, "write asin \n");
			await page.writeByName("asin", "B016MAK38U");

          	  passed_a(4,td);
        }catch(error) {
              console.log('\t   ' + error );
              failed_a(4,td);
          }
 			await fs.appendFile( page.path , 'SKU HISTORY  SUCCESSFUL \n', function(err) {
        })
     } catch (error) {
        await fs.appendFile( page.path , 'SKU HISTORY FAILED  \n', function(err) {
          console.log('\t   ' + error );
       })
     }
      page.quit();
  });
});