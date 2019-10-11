const Page = require('../lib/webdrivers'),
    Expect = require('../lib/chai-expect'),
    fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
    var ks = require('node-key-sender');

var td = '/Inventory Report.csv';
var ts = '/Inventory Report.txt';


describe('Amzentrix tests for Inventory Reports', async function () {
	beforeEach(async () => {
		page = new Page();
        expect = new Expect();
        driver = page.driver;
        
        await page.CreateLog(ts, "Inventory Reports  \n");
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
		await page.getClassText("page-header").then(function(text)	 {
    		return expect.toEqual(text, "REPORTS CHALLENGER USA\nADD");
		});
	});

	it('Should search Iventory Report', async () => { 	
		try{
			try {
				await page.clickXpath("//*[@id=\"main-content\"]/section/div[4]/div/div/div/table/tbody/tr[4]/td[1]/div/a[1]/span");
				await page.getXpathText("//*[@id=\"app\"]/div/div/div[1]/div/h1/small").then(function(text)	 {
		    		return expect.toEqual(text, "Inventory Reports");
				});
				
				 try{
	                await page.Log(ts,' Input Date From\n');
	                await page.clickXpath("//*[@id=\"date_from\"]");
					await page.clickXpath("//*[@id='inventory-search']//div[2]//div[1]/div/div[2]/header/span[1]");
					await page.clickXpath("//*[@id='inventory-search']//div[2]//div[1]/div/div[2]/div/span[17]");
	                passed(7,td);
	            } catch (error) {
	                console.log(error);
	                failed(7,td);
	            }

	            try{
	                await page.Log(ts,' Input Date To\n');
	               await page.clickXpath("//*[@id=\"date_to\"]");
					await page.clickXpath("//*[@id='inventory-search']//div[2]//div[2]/div/div[2]/header/span[1]");
					await page.clickXpath("//*[@id='inventory-search']//div[2]//div[2]/div/div[2]/header/span[1]");
					await page.clickXpath("//*[@id='inventory-search']//div[2]//div[2]/div/div[2]/div/span[17]");
	                passed(8,td);
	            } catch (error) {
	                console.log(error);
	                failed(8,td);
	            }
				
				await page.clickXpath("//*[@id=\"inventory-search\"]/div/div/div/div[2]/form/div[5]/button[1]");
				
				try{
	                await page.Log(ts,' Validate searched date [SUCCESSFUL] \n');
	               await page.getXpathText("//*[@id=\"inventory-data\"]/div/div/div/div[1]/b").then(function(text)	 {
			    		return expect.toEqual(text, "Inventory Data");
					});
	                passed(6,td);
	            } catch (error) {
	                console.log(error);
	                failed(6,td);
	            }
				passed(4,td);
	        } catch (error) {
	    		console.log(error);
	            failed(4,td);
	    	}
				await fs.appendFile( page.path , 'Inventory Reports SUCCESSFUL \n', function(err) {
	                
	            })  
	        } catch (error) {
	            await fs.appendFile( page.path , 'Inventory Reports FAILED \n', function(err) {
	                console.log('\t   ' + error );
	            })  
	        }

	});
	afterEach(async () => page.quit());
});