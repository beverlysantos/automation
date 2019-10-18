const Page = require('../lib/webdrivers'),
      Expect = require('../lib/chai-expect'),
      fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
var ks = require('node-key-sender');

var td = '/CRM Fulfillments.csv';
var ts = '/CRM Fulfillments.txt';

describe('Amzentrix tests for CRM Fulfillments', async function () {
    beforeEach(async () => {	
    	page = new Page();
    	expect = new Expect();
    	driver = page.driver;
    	
    	await page.CreateLog(ts,'Business Report Fields (per ASIN) \n');
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

    	await page.Log(ts,' Go to CRM module \n');
    	await page.clickLink("CRM");
		await page.getClassText("page-header").then(function(text) {
    		return expect.toEqual(text, "CUSTOMER RELATIONSHIP MANAGEMENT CHALLENGER USA");
    	});

		await page.Log(ts,' Click Fulfillments \n');
    	await page.clickXpath("//*[@id=\"fulfillments-button-link\"]");
    });

    it("should test Fulfillments", async () => {
    	try{
			await page.Log(ts,' Click Search button \n');
	    	await page.clickXpath("//*[@id='app']/div/div[5]/button");

	    	try{
				await page.Log(ts,' Input \'12/01/2018\' to Purchase Date From\n');
		    	await page.clickXpath("//*[@id='app']//div[1]//section/div/div[1]/div/div[1]//div[1]/input");  //click div 1
		    	await page.clickXpath("//*[@id='app']/div/div[1]/div/section/div/div[1]/div/div[1]/div/div/div[2]/header/span[2]"); //see months
		    	await page.clickXpath("//*[@id='app']/div/div[1]/div/section/div/div[1]/div/div[1]/div/div/div[3]/header/span[2]"); //see year
		    	await page.clickXpath("//*[@id='app']//div[1]//section//div[1]//div[1]/div/div/div[4]/span[9]"); //2018
		    	await page.clickXpath("//*[@id='app']//div[1]//div[1]/div/div[1]/div/div/div[3]/span[12]"); // december
		    	await page.clickXpath("//*[@id='app']//div[1]//section//div[1]//div[1]/div/div/div[2]//span[14]"); //1

				await page.Log(ts,' Input \'12/01/2018\' to Shipment Date From\n');
		    	await page.clickXpath("//*[@id='app']//div[1]//section/div/div[1]/div/div[3]//div[1]/input");  //click div 3
		    	await page.clickXpath("//*[@id='app']/div/div[1]/div/section/div/div[1]/div/div[3]/div/div/div[2]/header/span[2]"); //see months
		    	await page.clickXpath("//*[@id='app']/div/div[1]/div/section/div/div[1]/div/div[3]/div/div/div[3]/header/span[2]"); //see year
		    	await page.clickXpath("//*[@id='app']//div[1]//section//div[1]//div[3]/div/div/div[4]/span[9]"); //2018
		    	await page.clickXpath("//*[@id='app']//div[1]//div[1]/div/div[3]/div/div/div[3]/span[12]"); // december
		    	await page.clickXpath("//*[@id='app']//div[1]//section//div[1]//div[3]/div/div/div[2]//span[14]"); //1

				await page.Log(ts,' Input \'12/01/2018\' to Estimated Arrival Date From\n');
		    	await page.clickXpath("//*[@id='app']//div[1]//section/div/div[1]/div/div[5]//div[1]/input");  //click div 5
		    	await page.clickXpath("//*[@id='app']/div/div[1]/div/section/div/div[1]/div/div[5]/div/div/div[2]/header/span[2]"); //see months
		    	await page.clickXpath("//*[@id='app']/div/div[1]/div/section/div/div[1]/div/div[5]/div/div/div[3]/header/span[2]"); //see year
		    	await page.clickXpath("//*[@id='app']//div[1]//section//div[1]//div[5]/div/div/div[4]/span[9]"); //2018
		    	await page.clickXpath("//*[@id='app']//div[1]//div[1]/div/div[5]/div/div/div[3]/span[12]"); // december
		    	await page.clickXpath("//*[@id='app']//div[1]//section//div[1]//div[5]/div/div/div[2]//span[14]"); //1

				await page.Log(ts,' Input \'12/01/2018\' to Created Date From\n');
		    	await page.clickXpath("//*[@id='app']//div[1]//section/div/div[1]/div/div[7]//div[1]/input");  //click div 7
		    	await page.clickXpath("//*[@id='app']/div/div[1]/div/section/div/div[1]/div/div[7]/div/div/div[2]/header/span[2]"); //see months
		    	await page.clickXpath("//*[@id='app']/div/div[1]/div/section/div/div[1]/div/div[7]/div/div/div[3]/header/span[2]"); //see year
		    	await page.clickXpath("//*[@id='app']//div[1]//section//div[1]//div[7]/div/div/div[4]/span[9]"); //2018
		    	await page.clickXpath("//*[@id='app']//div[1]//div[1]/div/div[7]/div/div/div[3]/span[12]"); // december
		    	await page.clickXpath("//*[@id='app']//div[1]//section//div[1]//div[7]/div/div/div[2]//span[14]"); //1

				await page.Log(ts,' Input \'12/01/2018\' to Updated Date From\n');
		    	await page.clickXpath("//*[@id='app']//div[1]//section/div/div[1]/div/div[9]//div[1]/input");  //click div 9
		    	await page.clickXpath("//*[@id='app']/div/div[1]/div/section/div/div[1]/div/div[9]/div/div/div[2]/header/span[2]"); //see months
		    	await page.clickXpath("//*[@id='app']/div/div[1]/div/section/div/div[1]/div/div[9]/div/div/div[3]/header/span[2]"); //see year
		    	await page.clickXpath("//*[@id='app']//div[1]//section//div[1]//div[9]/div/div/div[4]/span[9]"); //2018
		    	await page.clickXpath("//*[@id='app']//div[1]//div[1]/div/div[9]/div/div/div[3]/span[12]"); // december
		    	await page.clickXpath("//*[@id='app']//div[1]//section//div[1]//div[9]/div/div/div[2]//span[14]"); //1
		    	passed(7,td);
			} catch (error) {
				console.log(error);
				failed(7,td);
		    }

		    try{
		    	await page.Log(ts,' Input \'12/01/2018\' to Updated Date To\n');
		    	await page.clickXpath("//*[@id='app']//div[1]//section/div/div[1]/div/div[2]//div[1]/input");  //click div 2
		    	await page.clickXpath("//*[@id='app']/div/div[1]/div/section/div/div[1]/div/div[2]/div/div/div[2]/header/span[2]"); //see months
		    	await page.clickXpath("//*[@id='app']/div/div[1]/div/section/div/div[1]/div/div[2]/div/div/div[3]/header/span[2]"); //see year
		    	await page.clickXpath("//*[@id='app']//div[1]//section//div[1]//div[2]/div/div/div[4]/span[10]"); //2019
		    	await page.clickXpath("//*[@id='app']//div[1]//div[1]/div/div[2]/div/div/div[3]/span[9]"); // september
		    	await page.clickXpath("//*[@id='app']//div[1]//section//div[1]//div[2]/div/div/div[2]//span[8]"); //1

		    	await page.Log(ts,' Input \'12/01/2018\' to Shipment Date To\n');
		    	await page.clickXpath("//*[@id='app']//div[1]//section/div/div[1]/div/div[4]//div[1]/input");  //click div 2
		    	await page.clickXpath("//*[@id='app']/div/div[1]/div/section/div/div[1]/div/div[4]/div/div/div[2]/header/span[2]"); //see months
		    	await page.clickXpath("//*[@id='app']/div/div[1]/div/section/div/div[1]/div/div[4]/div/div/div[3]/header/span[2]"); //see year
		    	await page.clickXpath("//*[@id='app']//div[1]//section//div[1]//div[4]/div/div/div[4]/span[10]"); //2019
		    	await page.clickXpath("//*[@id='app']//div[1]//div[1]/div/div[4]/div/div/div[3]/span[9]"); // september
		    	await page.clickXpath("//*[@id='app']//div[1]//section//div[1]//div[4]/div/div/div[2]//span[8]"); //1

		    	await page.Log(ts,' Input \'12/01/2018\' to Estimated Arrival Date To\n');
		    	await page.clickXpath("//*[@id='app']//div[1]//section/div/div[1]/div/div[6]//div[1]/input");  //click div 2
		    	await page.clickXpath("//*[@id='app']/div/div[1]/div/section/div/div[1]/div/div[6]/div/div/div[2]/header/span[2]"); //see months
		    	await page.clickXpath("//*[@id='app']/div/div[1]/div/section/div/div[1]/div/div[6]/div/div/div[3]/header/span[2]"); //see year
		    	await page.clickXpath("//*[@id='app']//div[1]//section//div[1]//div[6]/div/div/div[4]/span[10]"); //2019
		    	await page.clickXpath("//*[@id='app']//div[1]//div[1]/div/div[6]/div/div/div[3]/span[9]"); // september
		    	await page.clickXpath("//*[@id='app']//div[1]//section//div[1]//div[6]/div/div/div[2]//span[8]"); //1

		    	await page.Log(ts,' Input \'12/01/2018\' to Created Date To\n');
		    	await page.clickXpath("//*[@id='app']//div[1]//section/div/div[1]/div/div[8]//div[1]/input");  //click div 2
		    	await page.clickXpath("//*[@id='app']/div/div[1]/div/section/div/div[1]/div/div[8]/div/div/div[2]/header/span[2]"); //see months
		    	await page.clickXpath("//*[@id='app']/div/div[1]/div/section/div/div[1]/div/div[8]/div/div/div[3]/header/span[2]"); //see year
		    	await page.clickXpath("//*[@id='app']//div[1]//section//div[1]//div[8]/div/div/div[4]/span[10]"); //2019
		    	await page.clickXpath("//*[@id='app']//div[1]//div[1]/div/div[8]/div/div/div[3]/span[9]"); // september
		    	await page.clickXpath("//*[@id='app']//div[1]//section//div[1]//div[8]/div/div/div[2]//span[8]"); //1

		    	await page.Log(ts,' Input \'12/01/2018\' to Updated Date To\n');
		    	await page.clickXpath("//*[@id='app']//div[1]//section/div/div[1]/div/div[10]//div[1]/input");  //click div 2
		    	await page.clickXpath("//*[@id='app']/div/div[1]/div/section/div/div[1]/div/div[10]/div/div/div[2]/header/span[2]"); //see months
		    	await page.clickXpath("//*[@id='app']/div/div[1]/div/section/div/div[1]/div/div[10]/div/div/div[3]/header/span[2]"); //see year
		    	await page.clickXpath("//*[@id='app']//div[1]//section//div[1]//div[10]/div/div/div[4]/span[10]"); //2019
		    	await page.clickXpath("//*[@id='app']//div[1]//div[1]/div/div[10]/div/div/div[3]/span[9]"); // september
		    	await page.clickXpath("//*[@id='app']//div[1]//section//div[1]//div[10]/div/div/div[2]//span[8]"); //1
		    	passed(8,td);
			} catch (error) {
				console.log(error);
				failed(8,td);
		    }

		    try{
				await page.Log(ts,' Select \'amazon.com\' \n');
		    	await page.clickXpath("//*[@id='app']//div[1]//div[2]//div[2]/select");
		    	await page.clickXpath("//*[@id='app']//div[1]//div[2]//div[2]/select/option[3]");

		    	await page.Log(ts,' Select \'Bermuda\' \n');
		    	await page.clickXpath("//*[@id='app']//div[1]//div[2]//div[3]/select");
		    	await page.clickXpath("//*[@id='app']//div[1]//div[2]//div[3]/select/option[11]");
		   		passed(10,td);
			} catch (error) {
				console.log(error);
				failed(10,td);
		    }
		    try{
		    	await page.Log(ts,' Input \'Stephen *****\' to Updated Date To\n');
		    	await page.writeByXpath("//*[@id='app']/div/div[1]/div/section/div/div[2]/div/div[1]/div[5]/input", "Stephen Mildenhall");

		    	await page.Log(ts,' Input \'Stephen *****\' to Recipient Name\n');
		    	await page.writeByXpath("//*[@id='app']/div/div[1]/div/section/div/div[2]/div/div[2]/div[4]/input", "Stephen Mildenhall");

		    	await page.Log(ts,' Input \'*******@marketplace.amazon.com\' to Buyer Email\n');
		    	await page.writeByXpath("//*[@id='app']/div/div[1]/div/section/div/div[2]/div/div[2]/div[3]/input", "d1kp6ppd1nxwzzq@marketplace.amazon.com");
	    		passed(9,td);
			} catch (error) {
				console.log(error);
				failed(9,td);
		    }				
		    try{
		    	await page.Log(ts,' Click Search button \n');
		    	await page.clickXpath("//*[@id='app']//div[1]/div/section//button[3]");
		    	passed(11,td);
			} catch (error) {
				console.log(error);
				failed(11,td);
		    }

	    	try{
		    	await page.findByXpath("//*[@id='app']//div[4]//div[2]/div/div").then(function(webElement) {
		    		console.log('Element exists');
		    	});
	    		passed(6,td);
			} catch (error) {
				console.log(error);
				failed(6,td);
	    	}

	    	
	    	await page.visit("http://www.amzentrix.uat40/fulfillments/notes/1/1872979");
	    	
		    await page.Log(ts,' Go to Notes\n');
	    	await page.getClassText("page-header").then(function(text)	 {
	    		return expect.toEqual(text, "NOTES CHALLENGER USA"); 
	    	});

	    	try{
	    		await ks.sendKey('space');
			    await page.Log(ts,' Input \'testing\' in textarea \n');
		    	await page.clickCss("section > div > ul > li:nth-child(2) > a");
		    	await page.clickXpath("//*[@id='app']//div[1]//span[6]/button");
		    	await page.writeByClass("ql-editor ql-blank", "testing");
		    	passed(10,td);
			} catch (error) {
				console.log(error);
				failed(10,td);
	    	}
	    	try{
	    		await page.Log(ts,' Select \'Follow Up\' for Category \n');
		    	await page.clickXpath("//*[@id='app']//section//div[2]/div[1]/select");
		    	await page.clickXpath("//*[@id='app']//section//div[2]/div[1]/select/option[6]"); //category follow up

			    await page.Log(ts,' Select \'Follow Up Sent\' for Status \n');
		    	await page.clickXpath("//*[@id='app']//section//div[2]/div[2]/select");
		    	await page.clickXpath("//*[@id='app']//section//div[2]/div[2]/select/option[13]"); //status follow up sent

		    	passed(9,td);
			} catch (error) {
				console.log(error);
				failed(9,td);
	    	}

	    	try{
			    await page.Log(ts,' Select Date for Alert Date \n');
		    	await page.clickXpath("//*[@id='app']//div[2]/div[3]//div[1]/input");
		    	await ks.sendKeys(['tab', 'tab', 'tab', 'tab', 'tab']);
		    	await page.clickXpath("//*[@id='app']//div[2]/div[3]//div[1]/input");
		    	await page.clickXpath("//*[@id='app']//div[2]/div[3]//div[2]/div/span[18]"); //11
		    	passed(8,td);
			} catch (error) {
				console.log(error);
				failed(8,td);
	    	}

	    	try{
			    await page.Log(ts,' Select \'Beverly Super\' as Assignee \n');
		    	await page.clickClassName("multiselect__select");
		    	await page.clickXpath("//*[@id='app']//div[3]//li[7]/span/span");
				passed(14,td);
			} catch (error) {
				console.log(error);
				failed(14,td);
	    	}
	    	try{
	    		await page.Log(ts,' Click Add button \n');
		    	await page.clickXpath("//*[@id='app']//div[4]/button/span");
		    	await page.clickXpath("//*[@id='app']//div[5]//footer/button[2]");
		    	await page.clickXpath("//*[@id='app']//div[5]//footer/button");
			    await page.Log(ts,' Successfully Added. \n');
			    passed(13,td);
			} catch (error) {
				console.log(error);
				failed(13,td);
	    	}

		    	await ks.sendKeys(['f5', 'enter']);	
			    await page.Log(ts,' Verify added note. \n');
		    	await page.getCssText(" table > tbody > tr:nth-child(1) > td:nth-child(4) > div > p").then(function(text){
		    		return expect.toEqual(text, "testing");
		    	});

		    	await page.clickCss("section > div > ul > li:nth-child(3) > a");
			    await page.Log(ts,' View Activity Logs \n');
			    await page.getXpathText("//*[@id='app']//section/div/div/div/h4[1]").then(function(text){
		    		return expect.toEqual(text, "FULFILLMENT");
		    	});

		    	await page.clickCss("section > div > ul > li:nth-child(4) > a");
			    await page.Log(ts,' View Details \n');
			    await page.getCssText(" p:nth-child(1) > span").then(function(text){
		    		return expect.toEqual(text, "1872979");
		    	});

			    await ks.sendKey('f5');	
			    await ks.sendKey('enter');	

			    /* await page.Log(ts,' Edit Notes \n');
			    await page.clickCss(" table > tbody > tr > td:nth-child(1) > button.btn.btn-success.btn-lg");
			     await page.Log(ts,' Input \'testing 2\' in textarea \n');
		    	await page.clickCss("section > div > ul > li:nth-child(2) > a");
		    	await page.clickXpath("//*[@id='app']//div[1]//span[6]/button");
		    	await page.writeByClass("ql-editor", "testing");

		    	await page.clickXpath("//*[@id='app']//div[2]//footer/button[2]");
	    		await page.clickXpath("//*[@id='app']//div[2]//footer/button");
			    await page.Log(ts,' Successfully Edit Notes. \n');

			     await page.Log(ts,' Delete Notes \n');
	    		await page.clickCss("table > tbody > tr > td:nth-child(1) > button.btn.btn-danger.btn-lg");
	    		await page.clickXpath("//*[@id='app']//div[2]//footer/button[2]");
	    		await page.clickXpath("//*[@id='app']//div[2]//footer/button");
			    await page.Log(ts,' Successfully Delete Notes. \n');
			    */


	    	/*await page.clickCss(" div.fulfillment-function-groups > button > i");
	    	try{
		    	await page.Log(ts,' Click Cancel button \n');
			    await page.clickXpath("//*[@id='app']//div[1]/div/section//button[1]");
			    await page.findByXpath("//*[@id='app']//div[4]//div[2]/div/div").then(function(webElement) {
			    	console.log('Modal Form Closed');
		    	});
			add_row(12,p);
	    		mid();
	    		save();
		    } catch (error){
		    	add_row(12,f);
	    		mid();
	    		save();
		    }
		    await page.Log(ts,' Click Search button again \n');
	    	await page.clickCss(" div.fulfillment-function-groups > button > i");
	    	try{   

	    		await page.clickXpath("//*[@id='app']/div/div[4]/div/div/div/div/div[2]/div/div/div[3]/table/thead/tr/th[1]/div");
	    		await page.clickXpath("//*[@id='app']//tr[2]/td[1]//input");

	    		await page.clickCss(" th:nth-child(1) > div > input[type=checkbox]");
	    	} catch (error){
	    		console.log(error);
	    		add_row(7,f);
	    		mid();
	    		save();
	    	}*/
	    	await fs.appendFile(page.path, 'CRM Fulfillments SUCCESSFUL\n', function(err) {

			})
		}catch (error){
			await fs.appendFile(page.path, 'CRM Fulfillments FAILED\n', function(err) {
				console.log('\t'+error);
			})
			console.log(error)
		}	

    	
// d1kp6ppd1nxwzzq@marketplace.amazon.com
// Stephen Mildenhall
    	page.quit();
    });
});