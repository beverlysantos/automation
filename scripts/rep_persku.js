const Page = require('../lib/webdrivers'),
	  Expect = require('../lib/chai-expect'),
	  fs  = require("fs"),
      time = require('node-get-time');
 	  mkdirp = require('mkdirp');
	  var ks = require('node-key-sender');

var td = '/Per SKU Sales Report.csv';
var ts = '/Per SKU Sales Report.txt';  
describe('Amzentrix tests for Report PER SKU SALES REPORT', async function () {
	beforeEach(async() =>  {
		page = new Page();
		expect = new Expect();
		driver = page.driver;

			await page.CreateLog(ts, "Per SKU Sales Report ");
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
			await page.scrollByXpath("//*[@id='main-content']/section/div[6]//table/tbody/tr[2]/td[1]/div/a[1]");

		try{
			await page.Log(ts, " view per sku sales report page \n");
			await page.clickXpath("//*[@id='main-content']/section/div[6]//table/tbody/tr[2]/td[1]/div/a[1]");
			 passed_a(0,td);
          }catch(error) {
              console.log('\t   ' + error );
              failed_a(0,td);
          }
      });
	it('should verify May 1, 2019 K552', async() => {
	   try{
		  try{
		  	try{
		  	await page.clearId("date_from");
			await page.Log(ts, "write date_from 05/01/2019 \n");
			await page.writeById("date_from", "05/01/2019");

			await page.clearId("date_to");
			await page.Log(ts, "write date_from 05/01/2019 \n");
			await page.writeById("date_to", "05/01/2019");


				passed_a(8,td);
          }catch(error) {
              	console.log('\t   ' + error );
              	failed_a(8,td);
          }
          try{
			await page.Log(ts, "write sku \n");
			await page.writeByName("sku", "K552");
				passed_a(6,td);
          }catch(error) {
              	console.log('\t   ' + error );
              	failed_a(6,td);
			}
			await page.Log(ts, "click submit button \n");
			await page.clickXpath("//*[@id='main-content']/section/div[2]//form/div[5]//button");

			try{
			await page.Log(ts, "[SUCCESSFUL] validation \n");
			await page.getXpathText("//*[@id='main-content']/section/div[4]//table/tbody/tr[1]/td[4]").then(function(text) { 
				return expect.toHaveString(text, "K552");
			});
					passed_a(11,td);
	          	}catch(error) {
	              	console.log('\t   ' + error );
	              	failed_a(11,td);
			} 
				passed_a(4,td);
          }catch(error) {
              	console.log('\t   ' + error );
              	failed_a(4,td);
		} 
		await fs.appendFile( page.path , 'Per SKU Sales Report  SUCCESSFUL \n', function(err) {
        })
     } catch (error) {
        await fs.appendFile( page.path , 'Per SKU Sales Report FAILED  \n', function(err) {
          console.log('\t   ' + error );
       })
     }
      page.quit();
  });
});