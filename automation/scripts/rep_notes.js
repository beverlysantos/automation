const Page = require('../lib/webdrivers'),
	  Expect = require('../lib/chai-expect'),
	  fs  = require("fs"),
      time = require('node-get-time');
 	  mkdirp = require('mkdirp');
	  var ks = require('node-key-sender');

var td = '/Note Status Summary.csv';
var ts = '/Note Status Summary.txt'; 

describe('Amzentrix tests for Report Note Status Summary', async function () {
	beforeEach(async() =>  {
		page = new Page();
		expect = new Expect();
		driver = page.driver;

			await page.CreateLog(ts, "Note Status Summary Report ");
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
			await page.scrollByXpath("//*[@id='main-content']/section/div[6]//table/tbody/tr[4]/td[1]//a[1]");
		try{
			await page.Log(ts, "click view \n");
			await page.clickXpath("//*[@id='main-content']/section/div[6]//table/tbody/tr[4]/td[1]//a[1]");

				passed_a(0,td);
		}catch(error){
				console.Log('\t  ' + error );
				failed_a(0,td);
		}
	  });
 it('should search May 01, 2019 to may 10, 2019 ', async() => {
	try{
		await page.Log(ts, "clear date_from \n");
		await page.clearName("date_from");

		await page.Log(ts, "clear date_to \n");
		await page.clearName("date_to");

		try{
		await page.Log(ts, "write date_from \n");
		await page.writeByName("date_from", "01/01/2017");

		await page.Log(ts, "write date_to \n");
		await page.writeByName("date_to", "05/10/2019");
			
				passed_a(8,td);
		}catch(error){
				console.log('\t  ' + error );
				failed_a(8,td);
		}
		try{
		await page.Log(ts, "select status \n");
		// await page.clickName("note_status");
		await page.writeByName("note_status", "f");
				passed_a(9,td);
		}catch(error){
				console.log('\t  ' + error );
				failed_a(9,td);
		}
		try{
			await page.Log(ts, "click submit button \n");
			await ks.sendKeys(['tab', 'enter']);
			await page.Log(ts, "[SUCCESSFUL] validation \n");
	  		await page.getXpathText("(//*[@id='search_criteria']/small/em)[3]").then(function(text){
			  	return expect.toHaveString(text, "Follow Up");
			});
			passed_a(4,td);
		}catch(error){
			console.log('\t  ' + error );
			failed_a(4,td);
		}
		
		await fs.appendFile( page.path , 'Note Status Summary  SUCCESSFUL \n', function(err) {
        })
     } catch (error) {
        await fs.appendFile( page.path , 'Note Status Summary FAILED  \n', function(err) {
          console.log('\t   ' + error );
       })
     }
     page.quit();
  });
});