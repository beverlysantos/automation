const Page = require('../lib/webdrivers'),
	  Expect = require('../lib/chai-expect'),
	  fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
	  var ks = require('node-key-sender');
	  
var td = '/TC_Uploaded Files (Business Reports).csv';
var ts = '/TS_Uploaded_Files_BR.txt';
var td_id = 'TD_064';

describe('Amzentrix tests for Store Settings > Uploaded Files (Business Reports)', async function ()
{
	beforeEach(async () => 
	{
		page = new Page();
        expect = new Expect();
		await page.CreateLog(ts,'Uploaded Files (Business Reports) \n');
		await page.Log(ts,' Navigate to http://www.amzentrix.uat40/login/login \n');
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
		await page.Log(ts,' [SUCCESSFUL] Validation in Header title  \n');	
		
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
		
		await page.Log(ts,' Click View icon in Uploaded Files (Business Reports) \n');	
		await page.Store_Settings('Uploaded Files (Business Reports) BIM');
	});
	
	it('Should perform Search', async () =>
	{
		try
		{
			try
			{ 	
		    	await page.getClassText("page-header").then(function(text)
				{
		    		return expect.toHaveString(text, "UPLOADED FILES (BUSINESS REPORTS)");
				});
    			await page.Log(ts,' [SUCCESSFUL] Validation for Page Header \n');
				passed_p(3,td);
			} 
			catch(error)
			{
				console.log('\t   ' + error );
				failed_p(3,td);
			}			
			// Search -------------------------------------------------------------------
			try
			{ 			
				await page.Log(ts,' Click Search button \n');
				await page.clickClassName('btn btn-primary');			
				
				await page.Log(ts," Input " + String(await page.getTD(td_id,3)) + " in Filename field \n");
				await page.writeByXpath('//*[@id="filename"]', page.getTD(td_id,3));			

				await page.Log(ts,' Click Search button \n');
				await page.clickClassName('btn btn-lg btn-primary searchbtn');						
				
				await page.Log(ts," [SUCCESSFUL] Validation in Filename \n");
								
				const val1 = await page.getCssText('#main-content div:nth-child(5) td:nth-child(2)');
				expect.toHaveString(val1, String(await page.getTD(td_id,3)));
				
				passed_p(4,td);
			} 
			catch(error)
			{
				console.log('\t   ' + error );
				failed_p(4,td);
			}
			// --------------------------------------------------------------------------
			await fs.appendFile( page.path, ' Store Settings Uploaded Files (Business Reports) - Search SUCCESSFUL \n', function(err) {}) 			
		}
		catch(error)
		{
			await fs.appendFile( page.path, ' Store Settings Uploaded Files (Business Reports) - Search failed_p \n', function(err) 
			{
                console.log('\t   ' + error );
            })  
		}	
	});
	afterEach(async () => page.quit());	
});
