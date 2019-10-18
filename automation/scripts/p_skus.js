const Page = require('../lib/webdrivers'),
      Expect = require('../lib/chai-expect'),
      fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
var ks = require('node-key-sender');

var td = '/Skus.csv';
var ts = '/Skus.txt';

describe('Amzentrix tests for Store Settings > Skus', async function ()
{
	beforeEach(async () => 
	{
		page = new Page();
        expect = new Expect();

		await page.CreateLog(ts,'Skus \n');
		await page.Log(ts,' Navigate to http://www.amzentrix.uat40/login \n');
		await page.visit("http://www.amzentrix.uat40/login");
		
		await page.Log(ts,' Input Email Address field: jbeverly_qa@amzentrix.com \n');
		await page.writeByName("email", "jbeverly_qa@amzentrix.com");
		
		await page.Log(ts,' Input Password: ***** \n');
        await page.writeByName("password", "password");
		
		await page.Log(ts,' Click Submit button \n');
		await page.Login_Submit_Click();		
		
		await page.getXpathText("//*[@id='app']/div/div[1]/div/h1").then(function(text)
		{		
			return expect.toHaveString(text, "Dashboard")
		});		
		await page.Log(ts,' [Successful] Validation in Header title  \n');	
		
		await page.Log(ts,' Click Challenger USA \n');	
		await page.clickId('store_1');
		
		await page.clickId("fvpp-blackout");
		
		await page.Log(ts,' Click Settings \n');	
		await page.clickLink('Settings');
		
		await page.Log(ts,' Click View icon in Skus \n');	
		await page.clickId('skus');
	});
	
	it('Should perform Add, Edit and Delete', async () =>
	{
		try
		{
			try
			{ 	
		    	await page.getClassText("page-header").then(function(text)
				{
		    		return expect.toHaveString(text, "SKUS");
				});
    			await page.Log(ts,' [SUCCESSFUL] Validation for Page Header \n');

				passed_p(3,td);
			} catch (error) {
				console.log(error);
				failed(3,td);
			}			
			try{
				try{
					await page.writeByName("sku", "K552-N");
					await page.writeByName("asin", "B01LXD7TP9");
					passed(10,td);
				} catch (error) {
					console.log(error);
					failed(10,td);
				}		
				await page.sleep(10000);
				try{
					await page.getCssText(" table > tbody > tr > td:nth-child(1)").then(function(text){
						return expect.toEqual(text, "B01LXD7TP9");
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
			
			await fs.appendFile( page.path, ' Store Settings Skus - Add and Edit SUCCESSFUL \n', function(err) {}) 			
		}
		catch(error)
		{
			await fs.appendFile( page.path, ' Store Settings Skus - Add and Edit FAILED \n', function(err) 
			{
                console.log('\t   ' + error );
            })  
		}	
	});
	afterEach(async () => page.quit());	
});