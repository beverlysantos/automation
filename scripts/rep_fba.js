const Page = require('../lib/webdrivers'),
	  Expect = require('../lib/chai-expect'),
	  fs  = require("fs"),
      time = require('node-get-time');
 	  mkdirp = require('mkdirp');
	  var ks = require('node-key-sender');

var td = '/FBA Status Summary.csv';
var ts = '/FBA Status Summary.txt';  
describe('Amzentrix tests for Report FBA STATUS SUMMARY', async function () {
	beforeEach(async() =>  {
		page = new Page();
		expect = new Expect();
		driver = page.driver;

			await page.CreateLog(ts, "FBA Status Summary ");
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
			await page.Log(ts, "click Reports \n");
			await page.clickLink("Reports");
			await page.scrollByXpath("//*[@id='main-content']/section/div[6]//table/tbody/tr[3]/td[1]//a[1]");
		try{
			await page.Log(ts, "click view \n");
			await page.clickXpath("//*[@id='main-content']/section/div[6]//table/tbody/tr[3]/td[1]//a[1]");

				passed_a(0,td);
		}catch(error){
				console.Log('\t  ' + error );
				failed_a(0,td);
		}
	  });
 it('should search May 01, 2019 to may 10, 2019 K552', async() => {
	try{
		await page.Log(ts, "clear date_from \n");
		await page.clearName("date_from");

		await page.Log(ts, "clear date_to \n");
		await page.clearName("date_to");

		try{
		await page.Log(ts, "write date_from \n");
		await page.writeByName("date_from", "05/01/2019");

		await page.Log(ts, "write date_to \n");
		await page.writeByName("date_to", "05/10/2019");
			
				passed_a(8,td);
		}catch(error){
				console.Log('\t  ' + error );
				failed_a(8,td);
		}
		await page.Log(ts, "write sku K552 \n");
		await page.writeByName("sku", "K552");
			
		try{
		await page.Log(ts, "click submit button \n");
		await page.clickXpath("//*[@id='main-content']/section/div[2]//form/div[3]//button");
		
				passed_a(4,td);
		}catch(error){
				console.Log('\t  ' + error );
				failed_a(4,td);
		}
		
	 	await page.Log(ts, "[SUCCESSFUL] validation \n");
	  	await page.getXpathText("(//*[@id='search_criteria']/small/em)[2]").then(function(text){
		  	return expect.toHaveString(text, "May 10, 2019");
		  	
		  	});
		  	await fs.appendFile( page.path , 'FBA Status Summary  SUCCESSFUL \n', function(err) {
        })
     } catch (error) {
        await fs.appendFile( page.path , 'FBA Status Summary FAILED  \n', function(err) {
          console.log('\t   ' + error );
       })
     }
      page.quit();
  });
});