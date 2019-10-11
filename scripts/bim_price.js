const Page = require('../lib/webdrivers'),
      Expect = require('../lib/chai-expect'),
      fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
var ks = require('node-key-sender');

var td = '/Amazon Prices.csv';
var ts = '/Amazon Prices.txt';


describe('Amzentrix tests for Amazon Price', async function () {
    beforeEach(async () => {	
    	page = new Page();
    	expect = new Expect();
    	driver = page.driver;
    	
    	await page.CreateLog(ts,'Amazon Prices \n');
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

    	await page.Log(ts,' Go to Amazon Prices page \n');
    	await page.scrollByClass("icon_tags");
		await page.clickClassName("icon_tags");
		await page.getClassText("page-header").then(function(text)	 {
    		return expect.toHaveString(text, "AMAZON PRICES CHALLENGER USA");
		});
		
	});
	
	it('Should search amazon price using asin', async () => {
		try {
			try{ // search
				try{
		    		await page.Log(ts,' Input \'B00NLZUM36\' in ASIN \n');
					await page.writeByName("asin", "B00NLZUM36");
					passed(15,td);
				} catch (error){
					console.log(error);
					failed(15,td);
				}
				try{
					await page.clearName("date_from");
		    		await page.Log(ts,' Input \'05/01/2019\' in Date From \n');
					await page.writeByName("date_from", "05/01/2019");

					await page.clearName("date_to");
					await page.Log(ts,' Input \'05/01/2019\' in Date To \n');
					await page.writeByName("date_to", "10/10/2019");
					passed(16,td);
				} catch (error){
					console.log(error);
					failed(16,td);
				}
				
				await page.clickClassName("btn btn-primary");

				try{
		    		await page.Log(ts,' Validate Search [SUCCESSFUL]\n');
					await page.getXpathText("//*[@id=\"main-content\"]/section/div[5]/div/div/div/div/table/tbody/tr/td[1]").then(function(text)	 {
			    		return expect.toHaveString(text, "B00NLZUM36");
					});	
					passed(6,td);
				} catch (error){
					console.log(error);
					failed(6,td);
				}

				passed(4,td);
		    } catch (error) {
				console.log(error);
				failed(4,td);
			}

		/*	try{ //edit
				await ks.sendKey('down');
				await page.clickPartialLink("Edit");
				await page.writeById("best_seller_rank", "#1 in PC Gaming Keyboards");
				await page.page.clickId("update-btn");

				await page.clearName("asin");
				await page.writeByName("asin", "B00NLZUM36");

				await page.clearName("date_from");
				await page.writeByName("date_from", "05/01/2019");

				await page.clearName("date_to");
				await page.writeByName("date_to", "10/10/2019");
				await page.clickClassName("btn btn-primary");

				await page.getCssText(" table > tbody > tr > td:nth-child(4)").then(function(text)	 {
		    		return expect.toEqual(text, "#1 in PC Gaming Keyboards");
				});	
				passed(2,td);
		    } catch (error) {
				console.log(error);
				failed(2,td);
			}	*/

			await fs.appendFile(page.path, 'Amazon Prices SUCCESSFUL\n', function(err) {

			})
		}catch (error){
			await fs.appendFile(page.path, 'Amazon Prices FAILED\n', function(err) {
				console.log('\t'+error);
			})
			console.log(error)
		}	
	});
	afterEach(async () => page.quit());
});
