const Page = require('../lib/webdrivers'),
      Expect = require('../lib/chai-expect'),
      fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
var ks = require('node-key-sender');

var td = '/List Recommendation.csv';
var ts = '/List Recommendation.txt';

describe('Amzentrix tests for List Recommendations', async function () {
    beforeEach(async () => {	
    	page = new Page();
    	expect = new Expect();
    	driver = page.driver;
    	
    	await page.CreateLog(ts,'Inbound Shipment \n');
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

    	await page.scrollByClass("icon_table");
		await page.clickClassName("icon_table");
    	await page.Log(ts,' Go to List Recommendations page \n');
		await page.getClassText("page-header").then(function(text)	 {
    		return expect.toHaveString(text, "LIST RECOMMENDATIONS CHALLENGER USA\nSEARCH");
		});
		
	});
	
	it('Should search list recommendatiom', async () => {
		try {
			try{
				await page.clickClassName("icon_search");
				await page.clickXpath("//*[@id=\"main-content\"]/section/div[1]/div/h3/div/div/a");

				try{
						await page.clearName("dateFrom");
			    		await page.Log(ts,' Input \'2017/03/19\' in Date From \n');
						await page.writeByName("dateFrom", "2017/03/19");

						await page.clearName("dateTo");
						await page.Log(ts,' Input \'2019/03/19\' in Date To \n');
						await page.writeByName("dateTo", "2019/03/19");
						passed(16,td);
					} catch (error){
						console.log(error);
						failed(16,td);
					}

		    	
				await page.clickId("btnSearch");

				try{
			    		await page.Log(ts,' Validate Search [SUCCESSFUL]\n');
						await page.getXpathText("//*[@id=\"recommendationLists\"]/thead/tr/th[1]").then(function(text)	 {
				    		return expect.toHaveString(text, "Asin");
						});
						await page.getXpathText("//*[@id=\"main-content\"]/section/div[3]/div/div[1]/div/p").then(function(text)	 {
				    		return expect.toHaveString(text, "Inventory result(s)");
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
		await fs.appendFile(page.path, 'List Recommendations SUCCESSFUL\n', function(err) {

			})
		}catch (error){
			await fs.appendFile(page.path, 'List Recommendations FAILED\n', function(err) {
				console.log('\t'+error);
			})
			console.log(error)
		}	
	});
	afterEach(async () => page.quit());
});
