const Page = require('../lib/webdrivers'),
      Expect = require('../lib/chai-expect'),
      fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
var ks = require('node-key-sender');

var td = '/Currencies.csv';
var ts = '/Currencies.txt';

describe('Amzentrix tests for Currencies', async function () {
    beforeEach(async () => {	
    	page = new Page();
    	expect = new Expect();
    	driver = page.driver;
    	
    	await page.CreateLog(ts,'Currencies \n');
    	await page.visit("http://www.amzentrix.uat40/login");

    	await page.Log(ts,' Input Email Address field: jbeverly_qa@amzentrix.com \n');
    	await page.writeByName("email", "jbeverly_qa@amzentrix.com");

    	await page.Log(ts,' Input Password: ***** \n');
    	await page.writeByName("password", "password");    	

    	await page.Log(ts,' Click Submit button \n');
    	await page.clickClassName("btn btn-primary btn-round btn-lg btn-block");

    	await page.Log(ts,' Click Navigation dropdown \n');
    	await page.clickId("navbarTopDropdownMenuItems");

    	await page.Log(ts,' Select Settings \n');
    	await page.clickLink("Settings");
    	await page.clickId("fvpp-blackout");
    	await page.Log(ts,' Select Currencies \n');
    	await page.clickId("currencies");

    	
    });
     it("should add, edit, delete", async () => {
     	try{
	     	//tcm 44
	    	try {
		    	await page.getClassText("page-header").then(function(text)	 {
		    		return expect.toHaveString(text, "CURRENCIES");
				});;	
				await page.Log(ts,' [SUCCESSFUL] Validation for Page Header \n');

				passed(0,td);
			} catch (error) {
				console.log(error);
				failed(0,td);
			}
			//tcm 57
	    	try {
	    		await page.Log(ts,' Click Add Button \n');
				await page.clickXpath("//*[@id='main-content']//div[1]/div/a");

	    			await page.Log(ts,' Input data in name field \n');
				await page.writeByXpath("//*[@id='name']", "zombie_1.1");

	    			await page.Log(ts,' Input data in code field \n');
				await page.writeByXpath("//*[@id='code']", "zo");

				await page.clickClassName("btn btn-info addbtn");
				await ks.sendKey('enter');
				await page.Log(ts,' [Add Successful] \n');

				passed(1,td);
			} catch (error) {
				console.log(error);
				failed(1,td);
			}
			//tcm100
				try{
	    			await page.Log(ts,' Search for specific data \n');
					await page.clearXpath("//*[@id='app']/div/div[1]//input");
					await page.writeByXpath("//*[@id='app']/div/div[1]//input", "zombie_1.1");
					await ks.sendKey('down');
					await page.getCssText("table tbody tr:nth-last-child(1) td:nth-child(2)").then(function(text){
						return expect.toEqual(text, "Zombie_1.1");
					});
				
					await page.Log(ts,' [Search Successful] \n');

					passed(4,td);
				} catch (error) {
					console.log(error);
					failed(4,td);
						
				}		
			//tcm 45
			try{
	    		await page.Log(ts,' Click Edit Button \n');
				await page.clickCss("table tbody tr:nth-last-child(1) a");

	    			await page.Log(ts,' Input data in name field \n');
				await page.clearXpath("(//*[@id='name'])[1]");
				await page.clearXpath("//*[@id='code']");
				await page.clearName("code");

	    			await page.Log(ts,' Input data in code field \n');
				await page.writeByXpath("//*[@id='name']", "zombie_1.2");
				await page.writeByXpath("//*[@id='code']", "bb");

				await page.clickClassName("btn btn-success editbtn");
				await ks.sendKey('enter');
				await page.Log(ts,' [Edit Successful] \n');
									
				passed(2,td);
			} catch (error) {
				console.log(error);
				failed(2,td);
			}
			//tcm 30
			try{
				await page.clearXpath("//*[@id='app']/div/div[1]//input");
				await page.writeByXpath("//*[@id='app']/div/div[1]//input", "zombie_1.2");
				await ks.sendKey('down');
				await page.getCssText("table tbody tr:nth-last-child(1) td:nth-child(2)").then(function(text){
					return expect.toEqual(text, "Zombie_1.2");
				});
					
				await page.Log(ts,' Click delete button \n');
				await page.clickCss("table tbody tr:nth-last-child(1) a:nth-child(2)");
				await page.clickXpath("//*[@class='btn btn-danger deletebtn']");

				await page.Log(ts,' Confirm for deletion. \n');
				await ks.sendKey('enter');
				await page.Log(ts,' [Delete Successful] \n');

	    		
				passed(3,td);
			} catch (error) {
				console.log(error);
				failed(3,td);
			}
			await fs.appendFile(page.path, 'Admin Settings - Currencies SUCCESSFUL\n', function(err) {

			})
		}catch (error){
			await fs.appendFile(page.path, 'Admin Settings - Currencies FAILED\n', function(err) {
				console.log('\t'+error);
			})
			console.log(error)
		}	
		page.quit();
     });
});