const Page = require('../lib/webdrivers'),
      Expect = require('../lib/chai-expect'),
      fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
var ks = require('node-key-sender');

var td = '/Roles.csv';
var ts = '/Roles.txt';

describe('Amzentrix tests for Roles', async function () {
	beforeEach(async () => 
	{                                                         // mgrurun kada foreachs
		page = new Page();
        expect = new Expect();

		await page.CreateLog(ts,'Roles \n');
		await page.Log(ts,' Navigate to http://www.amzentrix.uat40/login \n');
		await page.visit("http://www.amzentrix.uat40/login");
		
		await page.Log(ts,' Input Email Address field: jbeverly_qa@amzentrix.com \n');
		await page.writeByName("email", "jbeverly_qa@amzentrix.com");
		
		await page.Log(ts,' Input Password: ***** \n');
        await page.writeByName("password", "password");
		
		await page.Log(ts,' Click Submit button \n');
		await page.Login_Submit_Click();		
		
		await page.getXpathText("//*[@id='app']/div/div[1]/div/h1").then(function(text){
			return expect.toHaveString(text, "Dashboard")
		});
		await page.Log(ts,' [Successful] Validation in Header title  \n');	
		
		await page.Log(ts,' Click Navigation dropdown \n');
		await page.clickId("navbarTopDropdownMenuItems");
		
		await page.Log(ts,' Select Settings \n');
		await page.clickXpath("//*[@id='navbarTogglerDemo03']//a[5]");
		
		await page.clickId("fvpp-close");
		
		await page.Log(ts,' Scroll down to Roles  \n');	
		await ks.sendKeys(['down','down','down','down','down','down','down']);
		
		await page.Log(ts,' Click View icon in Roles \n');	
		await page.clickId("roles");
	});		
	it('Should perform Add, Edit and Delete', async () =>
	{
		try
		{
			try
			{ 			
		    	await page.getClassText("page-header").then(function(text)	 {
		    		return expect.toHaveString(text, "ROLES");
				});;	
    			await page.Log(ts,' [SUCCESSFUL] Validation for Page Header \n');

				passed_p(3,td);
			} catch (error) {
				console.log(error);
				failed_p(3,td);
			}
			
			// ADD -------------------------------------------------------------------			
			try
			{
				await page.Log(ts,' Click Add button \n');
				await page.Addbtn_Click();
				
				await page.Log(ts," Input 'test27' in Name field \n");
				await page.writeById("name", "test27");
				
				await page.Log(ts,' Click Add button \n');
				await page.clickClassName("btn btn-info addbtn");
				
				await page.Log(ts,' Click OK \n');
				await ks.sendKey("enter");
				
				await page.Log(ts," [Add Successful] data found in row 6 \n");	
				await page.getCssText("tbody tr:nth-last-child(1) td:nth-child(2)").then(function(text)
				{
					return expect.toHaveString(text,"test27")
				});
				passed_p(2,td);
			} catch (error) {
				console.log(error);
				failed_p(2,td);
			}
			// --------------------------------------------------------------------------
			
			// EDIT ---------------------------------------------------------------------
			try
			{
				await page.Log(ts,' Click Edit icon \n');
				await page.clickCss("table tbody  tr:nth-last-child(1) a");
				
				await page.Log(ts,' Clear Name field \n');
				await page.clearId("name");
				
				await page.Log(ts," Input 'test28' in Name field \n");
				await page.writeById("name", "test28");
				
				await page.Log(ts,' Click Update button \n');
				await page.clickClassName("btn btn-success editbtn");
				
				await page.Log(ts,' Click OK \n');
				await ks.sendKey("enter");
				
				await page.Log(ts, " [Edit Successful] data found in row 6 \n");
				await page.getCssText("tbody tr:nth-last-child(1) td:nth-child(2)").then(function(text){
					return expect.toHaveString(text,"test28")
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
				await page.Log(ts, " [For Deletion] data found in row 6 \n");	
				await page.getCssText("tbody tr:nth-last-child(1) td:nth-child(2)").then(function(text){
					return expect.toHaveString(text,"test28")
				});
				
				await page.Log(ts,' Click Delete icon \n');
				await page.clickCss("table tbody  tr:nth-last-child(1) a:nth-child(2)"); 
				
				await page.Log(ts,' Click Delete button \n');
				await page.clickClassName("btn btn-danger deletebtn");
				
				await page.Log(ts,' Click OK \n');
				await ks.sendKey("enter");
				
				await page.Log(ts, " [Delete Successful]");
				passed_p(0,td);
			} catch (error) {
				console.log(error);
				failed_p(0,td);
			}
			// --------------------------------------------------------------------------

			await fs.appendFile(page.path , 'Roles SUCCESSFUL \n', function(err) {}) 			
		}
		catch(error)
		{
			await fs.appendFile(page.path , 'Roles FAILED \n', function(err) {
                console.log('\t   ' + error );
            })  
		}	
	});
	afterEach(async () => page.quit());	
});