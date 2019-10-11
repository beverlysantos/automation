const Page = require('../lib/webdrivers'),
      Expect = require('../lib/chai-expect'),
      fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
var ks = require('node-key-sender');

var td = '/Inventory Forecast.csv';
var ts = '/Inventory Forecast.txt';


describe('Amzentrix tests for BIM Inventory Forecast', async function () {
    beforeEach(async () => {	
    	page = new Page();
    	expect = new Expect();
    	driver = page.driver;
    	
    	await page.CreateLog(ts,'Inventory Forecast \n');
    	await page.visit("http://www.amzentrix.uat40/login");

    	await page.Log(ts,' Input Email Address field: jbeverly_qa@amzentrix.com \n');
    	await page.writeByName("email", "jbeverly_qa@amzentrix.com");

    	await page.Log(ts,' Input Password: ***** \n');
    	await page.writeByName("password", "password");    	

    	await page.Log(ts,' Click Submit button \n');
    	await page.clickClassName("btn btn-primary btn-round btn-lg btn-block");

    	await page.Log(ts,' Click Challenger USA store \n');
    	await page.clickId("store_1");
		await page.clickId("fvpp-blackout");
    	await page.getClassText("page-header").then(function(text)	 {
    		return expect.toEqual(text, "DASHBOARD CHALLENGER USA"); 
    	});

    	await page.Log(ts,' Go to BIM module \n');
    	await page.clickLink("BIM");
		await page.getClassText("page-header").then(function(text)	 {
    		return expect.toEqual(text, "BUSINESS INTELLIGENCE MODULE CHALLENGER USA");
		});		

		await page.clickXpath("//*[@id=\"business-analytics-button-link\"]/span");
		await page.getClassText("page-header").then(function(text)	 {
    		return expect.toHaveString(text, "INVENTORY FORECAST CHALLENGER USA");
		});
	});
	
	
	it('Should search inventory forecast', async () => {
		try {
			await page.Log(ts,' Set \'2019-03-12\' as Reference Date\n');
			await page.clearName("referenceDate");
			try{
	    		await page.writeByName("referenceDate", "2019-03-12");	
	    	passed(16,td);
	   		} catch (error) {
				console.log(error);
				failed(16,td);
			}
			await page.Log(ts,' Select \'Top 10 \' as SKU Option\n');
			try{
				await page.clickName("skuOptions");
	    		await page.writeByName("skuOptions", "t");
	    		passed(15,td);
	    	} catch (error) {
				console.log(error);
				failed(15,td);
			}
	    	
	    	try{
		        await page.Log(ts, "Select Sales Channel \n");
		    	await page.clickName("salesChannels");
		        await page.clickXpath("//*[@id='forecast-search']/div[1]//div[2]/div[2]//option[3]");
		        passed(9,td);
		    } catch (error) {
				console.log(error);
				failed(9,td);
			}
			
			try{
				await page.clickXpath("//*[@id=\"btn-inv-search\"]");
				 passed(17,td);
		    } catch (error) {
				console.log(error);
				failed(17,td);
			}

			try{
				await page.Log(ts, "SUCCESSFULLY Searched Mar 12, 2019 Forecast \n");
				await page.getXpathText("//*[@id=\"forecast-result\"]/h3").then(function(text)	 {
		    		return expect.toHaveString(text, "AMAZON.COM");
				});
				await page.getXpathText("//*[@id=\"forecast-result\"]/h4").then(function(text)	 {
		    		return expect.toHaveString(text, "Mar 12, 2019");
				});
				await page.getXpathText("//*[@id=\"forecast-result\"]/div[2]/table/thead/tr[1]/th[1]").then(function(text)	 {
		    		return expect.toHaveString(text, "SKU");
				});
				 passed(6,td);
		    } catch (error) {
				console.log(error);
				failed(6,td);
			}
			await fs.appendFile(page.path, 'Inventory Forecast SUCCESSFUL\n', function(err) {

			})
		}catch (error){
			await fs.appendFile(page.path, 'Inventory Forecast FAILED\n', function(err) {
				console.log('\t'+error);
			})
			console.log(error)
		}	
	});

	
    afterEach(async () => page.quit());
});