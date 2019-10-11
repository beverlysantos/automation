const Page = require('../lib/webdrivers'),
    Expect = require('../lib/chai-expect'),
    fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
    var ks = require('node-key-sender');

var td = '/General Sales Report.csv';
var ts = '/General Sales Report.txt';

describe('Amzentrix tests for General Sales Report', async function () {
    beforeEach(async () => {	
    	page = new Page();
        expect = new Expect();
        driver = page.driver;
        
        await page.CreateLog(ts, "General Sales Report  \n");
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
	
	it('Should search General Sales Report', async () => { 	
		try {
			try {
				await page.scrollByXpath("//*[@id='main-content']/section/div[6]/div/div/div/table/tbody/tr[1]/td[1]/div/a[1]/span");
				await page.clickXpath("//*[@id='main-content']/section/div[6]/div/div/div/table/tbody/tr[1]/td[1]/div/a[1]/span");
				await page.getClassText("page-header").then(function(text)	 {
		    		return expect.toHaveString(text, "CHALLENGER USA - GENERAL SALES REPORT")
				});
				try{
					await page.clearName("date_from");
					await page.writeByName("date_from", "03/01/2019");
					await page.clearName("date_to");
					await page.writeByName("date_to", "04/01/2019");
					passed(10,td);
	            } catch (error){
	                console.log(error);
	                failed(10,td);
	            }
				await page.clickXpath("//*[@id=\"main-content\"]/section/div[2]/div/form/div[5]/div/button");

				await page.getXpathText("//*[@id=\"main-content\"]/section/div[4]/div/div/table/tbody/tr[3]/td[4]/b").then(function(text)	 {
		    		return expect.toHaveString(text, "1,004,280")
				});
				passed(4,td);
            } catch (error){
                console.log(error);
                failed(4,td);
            }
            await fs.appendFile( page.path , 'General Sales Report SUCCESSFUL \n', function(err) {
                    
            }) 
        } catch (error) {
            await fs.appendFile( page.path , 'General Sales Report FAILED \n', function(err) {
                console.log('\t   ' + error );
            })  
        }
		
	});
	 afterEach(async () => page.quit());
});
