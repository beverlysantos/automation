const Page = require('../lib/webdrivers'),
      Expect = require('../lib/chai-expect'),
      fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
var ks = require('node-key-sender');

var td = '/Task Schedules.csv';
var ts = '/Task Schedules.txt';

describe('Amzentrix tests for Task Schedules', async function ()
{
	beforeEach(async () => 
	{
		page = new Page();
        expect = new Expect();

		await page.CreateLog(ts,'Task Schedules \n');
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
		await page.Log(ts,' [SUCCESSFUL] Validation in Header title  \n');	
		
		await page.Log(ts,' Click Challenger USA \n');	
		await page.clickId('store_1');
		
		await page.clickId("fvpp-blackout");
		
		await page.Log(ts,' Click Settings \n');	
		await page.clickLink('Settings');
		
		await ks.sendKeys(['down','down','down']);
		
		await page.Log(ts,' Click View icon in Task Schedules \n');	
		await page.clickId('task-schedules');
	});
	
	it('Should perform Search', async () =>
	{
		try
		{
			try
			{ 	
		    	await page.getClassText("page-header").then(function(text)
				{
		    		return expect.toHaveString(text, "TASK SCHEDULE");
				});
    			await page.Log(ts,' [SUCCESSFUL] Validation for Page Header \n');

				passed_p(3,td);
			} catch (error) {
				console.log(error);
				failed_p(3,td);
			}			
			// Add -------------------------------------------------------------------
			try
			{ 			
				await page.Log(ts,' Click Add Schedule button \n');
				await page.clickCss('#main-content > section > div:nth-child(1) a');			
				
				await page.Log(ts,' Click Task Name dropdown \n');
				await page.clickId('task_id');
				
				await page.Log(ts,' Select Search Products in Amazon \n');
				await page.clickXpath('//*[@id="task_id"]/option[2]');
				
				await page.Log(ts,' Click Frequency dropdown \n');
				await page.clickId('frequency');
				
				await page.Log(ts,' Select everyFifteenMinutes \n');
				await page.clickXpath('//*[@id="frequency"]/option[2]');
				
				await page.Log(ts," Input 'keyboard switch tester' in Keywords field \n");
				await page.writeByCss('#app div.vs__selected-options input', 'keyboard switch tester');				
				await page.clickXpath('//*[@id="app"]/div/div/div/ul/li/a');

				await page.Log(ts,' Click Add button \n');
				await page.clickClassName('btn btn-info addbtn');

				//await page.Log(ts,' Click Ok button \n');
				//await ks.sendKey('enter');				
				
				await ks.sendKeys(['down','down','down','down','down','down','down','down','down','down','down','down','down']);
				
				await page.Log(ts," [SUCCESSFUL] Validation in Task Name \n");	
				await page.getCssText('#main-content div:nth-child(4) tr:nth-last-child(1) > td:nth-child(3)').then(function(text)
				{				
					return expect.toHaveString(text, 'Search Products in Amazon')
				});	
				
				await page.Log(ts," [SUCCESSFUL] Validation in Frequency \n");	
				await page.getCssText('#main-content div:nth-child(4) tr:nth-last-child(1) > td:nth-child(4)').then(function(text)
				{				
					return expect.toHaveString(text, 'everyFifteenMinutes')
				});
				
				passed_p(2,td);
			} catch (error) {
				console.log(error);
				failed_p(2,td);
			}
			// --------------------------------------------------------------------------
			
			// Edit -------------------------------------------------------------------
			try
			{
				await page.Log(ts,' Click Edit icon \n');
				await page.clickCss('#main-content div:nth-child(4) tr:nth-last-child(1) > td:nth-child(1) a:nth-child(1)');	
				
				await page.Log(ts,' Click Frequency dropdown \n');
				await page.clickId('frequency');
				
				await page.Log(ts,' Select hourly \n');
				await page.clickXpath('//*[@id="frequency"]/option[3]');
				
				await page.Log(ts,' Click Update button \n');
				await page.clickClassName('btn btn-success editbtn');
				
				await page.Log(ts,' Click Ok button \n');
				await ks.sendKey('enter');
				
				await ks.sendKeys(['down','down','down','down','down','down','down','down','down','down','down','down','down']);
				
				await page.Log(ts," [SUCCESSFUL] Validation in Task Name \n");	
				await page.getCssText('#main-content div:nth-child(4) tr:nth-last-child(1) > td:nth-child(3)').then(function(text)
				{				
					return expect.toHaveString(text, 'Search Products in Amazon')
				});	
				
				await page.Log(ts," [SUCCESSFUL] Validation in Frequency \n");	
				await page.getCssText('#main-content div:nth-child(4) tr:nth-last-child(1) > td:nth-child(4)').then(function(text)
				{				
					return expect.toHaveString(text, 'hourly')
				});
				
				passed_p(1,td);
			} catch (error) {
				console.log(error);
				failed_p(1,td);
			}
			// --------------------------------------------------------------------------
			
			// Delete -------------------------------------------------------------------
			try
			{
				await page.Log(ts,' Click Delete icon \n');
				await page.clickCss('#main-content div:nth-child(4) tr:nth-last-child(1) > td:nth-child(1) a:nth-child(2)');
				
				await page.Log(ts,' Click Delete button \n');
				await page.clickClassName('btn btn-danger deletebtn');
				
				await page.Log(ts,' Click Ok button \n');
				await ks.sendKey('enter');
				
				await page.Log(ts,' [Delete Successful] \n');	
				
				passed_p(0,td);
			} catch (error) {
				console.log(error);
				failed_p(0,td);
			}
			// --------------------------------------------------------------------------
			
			await fs.appendFile( page.path, ' Store Settings Task Schedules - Add, Edit and Delete SUCCESSFUL \n', function(err) {}) 			
		}
		catch(error)
		{
			await fs.appendFile( page.path, ' Store Settings Task Schedules - Add, Edit and Delete FAILED \n', function(err) 
			{
                console.log('\t   ' + error );
            })  
		}	
	});
	afterEach(async () => page.quit());	
});