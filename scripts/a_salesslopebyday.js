const Page = require('../lib/webdrivers'),
      Expect = require('../lib/chai-expect'),
      fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
      var ks = require('node-key-sender');

      var td = '/SalesSlopeByDay.csv';
      var ts = '/SalesSlopeByDay.txt';
      
describe('Amzentrix tests for Reports Sales Slope By Day', async function(){
    beforeEach(async() => {
        page = new Page();
        expect = new Expect();
        driver = page.driver;
        
        await page.CreateLog(ts, "Sales Slope By Day  \n");
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
        const val = await page.getClassText("page-header")
        expect.toEqual(val, "DASHBOARD CHALLENGER USA");

        await page.Log(ts, "click Reports \n");
        await page.clickXpath("//*[@id='sidebar']/ul/li[7]/a/span");

    try{
        await page.Log(ts, "click Sales Slope By Day \n");
		await page.clickXpath("//*[@id=\"main-content\"]/section/div[4]/div/div/div/table/tbody/tr[8]/td[1]/div/a[1]/span");
			passed_a(0,td);
      
	} catch(error) {
			console.log('\t   ' + error );
			failed_a(0,td);
		}
	}); 
	it('Should search May 01, 2019 to May 31, 2019', async () => { 
	try{
		await page.Log(ts, "clear date_from \n");
		await page.clearName("date_from");
		
		await page.Log(ts, "write date_from \n");
		await page.writeByName("date_from", "05/01/2019");
		
		await page.Log(ts, "clear date_to \n");
		await page.clearName("date_to");
		
		await page.Log(ts, "write date_to \n");
		await page.writeByName("date_to","05/31/2019");
		
		await page.Log(ts, "write SKU \n");
		await page.writeByName("sku", "K552");
		
		await page.Log(ts, "click button \n");
		await page.clickClassName("btn btn-primary");
		
		await page.Log(ts, "[SUCCESSFULL] validation \n");
		const val1 = await page.getXpathText("(//*[@id='search_criteria'])[1]")
		expect.toHaveString(val1,"May 01, 2019");
		
		await page.Log(ts, "[SUCCESSFULL] validation \n");
		const val2 = await page.getXpathText("(//*[@id='search_criteria'])[2]")
		expect.toHaveString(val2,"May 31, 2019");
			
		await page.Log(ts, "[SUCCESSFULL] validation \n");
		const val3 = await page.getXpathText("(//*[@id='search_criteria'])[3]")
		expect.toHaveString(val3,"K552");
		 	passed_a(4,td);
      
	} catch(error) {
			console.log('\t   ' + error );
			failed_a(4,td);
		}
	});
	it('Should search June 01, 2019 to June 30, 2019', async () => { 
	try{
		try{
			await page.Log(ts, "clear date_from \n");	
			await page.clearName("date_from");

			await page.Log(ts, "write date_from \n");
			await page.writeByName("date_from", "06/01/2019");

			await page.Log(ts, "clear date_to \n");
			await page.clearName("date_to");

			await page.Log(ts, "write date_to \n");
			await page.writeByName("date_to","06/30/2019");

			await page.Log(ts, "write K552 \n");
			await page.writeByName("sku", "K552");

			await page.Log(ts, "click button \n");
			await page.clickClassName("btn btn-primary");

			await page.Log(ts, "[SUCCESSFULL] validation \n");
			await page.getXpathText("(//*[@id='search_criteria'])[1]").then(function(text) {
				return expect.toHaveString(text,"June 01, 2019");
			}); 
			await page.Log(ts, "[SUCCESSFULL] validation \n");
			const val4 = await page.getXpathText("(//*[@id='search_criteria'])[2]")
			expect.toHaveString(val4,"June 30, 2019");
		
			await page.Log(ts, "[SUCCESSFULL] validation \n");
		 	const val5 = await page.getXpathText("(//*[@id='search_criteria'])[3]")
			expect.toHaveString(val5,"K552");
             	passed_a(4,td);
      
		} catch(error) {
			  console.log('\t   ' + error );
			  failed_a(4,td);
		}
			
        fs.appendFile(page.path, 'Sales Slope By Day  SUCCESSFUL \n', function (err) {
			})
    } catch (error) {
      	fs.appendFile(page.path, 'Sales Slope By Day FAILED  \n', function (err) {
			console.log('\t   ' + error);
		})
    	}
   	 page.quit();
   });
});