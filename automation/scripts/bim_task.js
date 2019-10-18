const Page = require('../lib/webdrivers'),
      Expect = require('../lib/chai-expect'),
      fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
var ks = require('node-key-sender');

var td = '/Business Task Input.csv';
var ts = '/Business Task Input.txt';

describe('Amzentrix tests for Business Task Input', async function () {
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

    	await page.Log(ts,' Go to Business Task Input page \n');
    	await page.scrollByClass("fa fa-pie-chart");
		await page.clickClassName("fa fa-pie-chart");
		await page.getClassText("page-header").then(function(text)	 {
    		return expect.toHaveString(text, "BUSINESS TASK INPUTS CHALLENGER USA");
		});
		
	});
	
	it('Should search Business Task Input', async () => {
		try{
			try {

				try{
		    		await page.writeByName("taskSearch", "redragon k552");
					await page.clickClassName("fa fa-search");
					passed(10,td);
				} catch (error){
					console.log(error);
					failed(10,td);
				}
				

				try{
		    		await page.Log(ts,' Validate Search [SUCCESSFUL]\n');
					await page.getXpathText("//*[@id=\"calendar-result\"]/div/div/div/a[1]/div/span").then(function(text)	 {
			    		return expect.toHaveString(text, "New Titles, Variations Updates");
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
			await fs.appendFile(page.path, 'Business Task Input SUCCESSFUL\n', function(err) {

			})
		}catch (error){
			await fs.appendFile(page.path, 'Business Task Input FAILED\n', function(err) {
				console.log('\t'+error);
			})
			console.log(error)
		}	
	});
	afterEach(async () => page.quit());
});
