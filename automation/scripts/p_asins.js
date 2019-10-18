const Page = require('../lib/webdrivers'),
	  Expect = require('../lib/chai-expect'),
	  fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
	  var ks = require('node-key-sender');
	  
var td = '/Asins.csv';
var ts = '/Asins.txt';

describe('Amzentrix tests for Store Settings Asins', async function ()
{
	beforeEach(async () => 
	{
		page = new Page();
        expect = new Expect();

		await page.CreateLog(ts,'Asins \n');
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
		await page.Store('Challenger USA');	

		await page.getClassText("page-header").then(function(text)   {
            return expect.toEqual(text, "DASHBOARD CHALLENGER USA"); 
        });
		
		await page.Log(ts,' Click Settings \n');	
		await page.Store_SideBar('Settings');
		
		await page.getClassText("page-header").then(function(text)   {
            return expect.toHaveString(text, "SETTINGS");
        });
		
		await page.Log(ts,' Click View icon in Asins \n');	
		await page.Store_Settings('Asins');
	});
	
	it('Should perform Search', async () =>
	{
		try
		{
			try
			{ 	
		    	await page.getClassText("page-header").then(function(text)
				{
		    		return expect.toHaveString(text, "ASINS");
				});
    			await page.Log(ts,' [SUCCESSFUL] Validation for Page Header \n');
				passed_p(3,td);
			} 
			catch(error)
			{
				console.log('\t   ' + error );
				failed_p(3,td);
			}	
			
			// SEARCH -------------------------------------------------------------------
			try
			{ 			
				await page.Log(ts,' Input B01MA3F0PE in Search field \n');
				await page.writeByXpath('//*[@id="app"]//div[2]//input', 'B01MA3F0PE');	
				
				await page.Log(ts,' Click Search button \n');
				await page.clickCss('#app > span > button');				
				
				await page.Log(ts," [Search Successful] data found \n");	
				await page.getCssText('#main-content div:nth-child(4) tr > td:nth-child(2)').then(function(text)
				{				
					return expect.toHaveString(text, 'B01MA3F0PE')
				});	
				passed_p(4,td);
			} 
			catch(error)
			{
				console.log('\t   ' + error );
				failed_p(4,td);
			}
			// --------------------------------------------------------------------------
			
			await fs.appendFile( page.path, ' Store Settings Asins SUCCESSFUL \n', function(err) {}) 			
		}
		catch(error)
		{
			await fs.appendFile( page.path, ' Store Settings Asins FAILED \n', function(err) 
			{
                console.log('\t   ' + error );
            })  
		}	
	});
	afterEach(async () => page.quit());	
});