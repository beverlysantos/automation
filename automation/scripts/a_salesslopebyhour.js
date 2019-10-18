const Page = require('../lib/webdrivers'),
    Expect = require('../lib/chai-expect'),
    fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
    var ks = require('node-key-sender');

var td = '/Sales Slope By Hour.csv';
var ts = '/Sales Slope By Hour.txt';

describe('Amzentrix tests for Reports Sales Slope By Hour', async function(){
    beforeEach(async() => {
        page = new Page();
        expect = new Expect();
        driver = page.driver;
        
        await page.CreateLog(ts, "Sales Slope by Hour  \n");
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
		try{
          await page.scrollByXpath("//*[@id=\"main-content\"]/section/div[4]/div/div/div/table/tbody/tr[9]/td[1]/div/a[1]/span");
          await page.Log(ts, "click Sales Slope By Hour \n");
          await page.clickXpath("//*[@id=\"main-content\"]/section/div[4]/div/div/div/table/tbody/tr[9]/td[1]/div/a[1]/span");	
          	  passed_a(0,td);

           } catch (error){
            console.log('\t   ' + error );
              failed_a(0,td);
          }
		

	}); 

	it('Should search May 01, 2019 to May 31, 2019', async () => {
      try{
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
        		await page.getXpathText("(//*[@id='search_criteria'])[1]").then(function(text) {
        			return expect.toHaveString(text,"May 01, 2019");
        		});
        		await page.Log(ts, "[SUCCESSFULL] validation \n");
        		await page.getXpathText("(//*[@id='search_criteria'])[2]").then(function(text) {
        			return expect.toHaveString(text,"May 31, 2019");
        			});
        		await page.Log(ts, "[SUCCESSFULL] validation \n");
        		await page.getXpathText("(//*[@id='search_criteria'])[3]").then(function(text) {
        			return expect.toHaveString(text,"K552");

        		});
        		 passed_a(4,td);

           } catch (error){
            console.log('\t   ' + error );
              failed_a(4,td);
      		}
	
			 await fs.appendFile( page.path , 'Sales Slope By Hour  SUCCESSFUL \n', function(err) {
    
         })

     } catch (error) {
        await fs.appendFile( page.path , 'Sales Slope By Hour FAILED  \n', function(err) {
            console.log('\t   ' + error );
        })
    }
    page.quit();
  });
});