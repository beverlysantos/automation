const Page = require('../lib/webdrivers'),
      Expect = require('../lib/chai-expect'),
      fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
var ks = require('node-key-sender');

var td = '/Inbound Shipment.csv';
var ts = '/Inbound Shipment.txt';


describe('Amzentrix tests for BIM Inbound Shipment', async function () {
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
		await page.clickClassName("fa fa-cogs");
		await page.getClassText("page-header").then(function(text)	 {
				return expect.toEqual(text, "INBOUND SHIPMENT MANAGER CHALLENGER USA");
		});
	});
	
	it('Should add new shipment', async () => {
		try{
			try{
			    await page.Log(ts, "Input Date \n");
				await page.writeByName("date", "2019-10-05");
				await page.clickName("company_shipment_id");
				await page.writeByName("company_shipment_id", "sample7");
				
				passed(18,td);
		    } catch (error) {
				console.log(error);
				failed(18,td);
			}

			try{ //add
			    await page.Log(ts, "Select Origin Warehouse \n");
				await page.clickName("origin");
				await page.clickXpath("//*[@id='forecast-search']/div[1]/div/div[3]/div[1]/div/select/option[3]");

			    await page.Log(ts, "Select Destination Warehouse \n");
				await page.clickName("destination_warehouse");
				await page.clickXpath("//*[@id='forecast-search']/div[1]/div/div[3]/div[2]/div/select/option[2]");

				await page.writeByName("eta_destination", "2019-10-15");

				await page.clickName("amazon_shipment_id");
				await page.Log(ts, "Select Sales Channel \n");
				await page.clickName("sales_channel");
				await page.clickXpath("//*[@id='forecast-search']/div[1]/div/div[5]/div[1]/div/select/option[3]");

				 await page.Log(ts, "Select Status \n");
				await page.writeByName("status", "i");

			    await page.Log(ts, "Select SKU \n");
			    await page.clickXpath("//*[@id='forecast-search']/div[1]/div/div[7]/div/div/div[1]/select");
			    await page.clickXpath("//*[@id=\"forecast-search\"]/div[1]/div/div[7]/div/div/div[1]/select/option[7]");
				

			    await page.Log(ts, "Input quantity \n");
				await page.writeByName("quantity", "25");

			    
				passed(9,td);
		    } catch (error) {
				console.log(error);
				failed(9,td);
			}	
			try{
			    await page.Log(ts, "Click Save Button \n");
			    await page.scrollByXpath("//*[@id=\"forecast-search\"]/div[2]/div/button");
				await page.clickXpath("//*[@id=\"forecast-search\"]/div[2]/div/button");
				passed(1,td);
		    } catch (error) {
				console.log(error);
				failed(1,td);
			}

			try{ // search
			    await page.Log(ts, "Click View Shipment and search for \'samplelang6\' \n");
				await page.clickCss("#main-content > section > div.ng-scope > div:nth-child(1) > div > div > div > button:nth-child(2)");
				await page.writeByXpath("//*[@id='forecast-search']/div[1]//div[3]/div[1]//input", "sample7");
				await ks.sendKeys(['tab', 'tab', 'tab', 'tab', 'enter']);

				await page.getCssText(" tbody > tr > td:nth-child(2)").then(function(text){
					return expect.toHaveString(text, "sample7");
				});
				// await page.clickClassName("btn btn-primary searchbtn ng-scope");
				

				await page.clickCss("tbody > tr > td:nth-child(9) > a.btn.btn-warning.btn-md");
				await ks.sendKeys(['tab', 'tab', 'tab', 'enter']);
				
				passed(4,td);
		    } catch (error) {
				console.log(error);
				failed(4,td);
			}

			try{ //edit
			    await page.Log(ts, "Click Edit Shipment \n");
				await page.clickCss("tbody > tr > td:nth-child(9) > a.btn.btn-info.btn-md");

			    await page.Log(ts, "Change date. \n");
				await ks.sendKeys(['tab', 'tab', 'tab', 'tab', 'tab', 'tab', 'tab', 'tab', 'tab', 'tab']);
				await ks.sendKeys(['tab', 'tab', 'tab', 'tab', 'tab', 'tab', 'tab', 'tab', 'tab', 'tab']);
				await ks.sendKeys(['tab', 'tab', 'tab', 'tab', 'tab', 'tab', 'tab', 'tab', 'tab', 'tab']);
				await page.clickCss("#inbound_form_modal > div > div > div.modal-body.incoming_inv > div.col-lg-12 > div:nth-child(1) > div:nth-child(1) > div > datepicker > div > div._720kb-datepicker-calendar-body > a:nth-child(15)");
				await ks.sendKeys(['tab', 'tab', 'tab', 'tab']);
				await page.clickCss("#inbound_form_modal > div > div > div.modal-body.incoming_inv > div.col-lg-12 > div:nth-child(3) > div:nth-child(1) > div > datepicker > div > div._720kb-datepicker-calendar-body > a:nth-child(27)");
				await ks.sendKeys(['tab', 'tab', 'tab', 'tab', 'tab', '5', '0', 'tab', 'tab', 'tab', 'enter']);
				await ks.sendCombination(['shift', 'tab']);
				await ks.sendKey('enter');
			    
			   
				//await page.clickXpath("//*[@id='result_modal']//div[3]//button");
				passed(2,td);
		    } catch (error) {
				console.log(error);
				failed(2,td);
			}

			try{ //delete
			    await page.Log(ts, "Delete samplelang shipment  \n");
			    await page.clickCss("tbody > tr > td:nth-child(9) > a.btn.btn-danger.btn-md");
			    ks.sendKey('enter');

				passed(3,td);
		    } catch (error) {
				console.log(error);
				failed(3,td);
			}
		await fs.appendFile(page.path, 'Inbound Shipment SUCCESSFUL\n', function(err) {

			})
		}catch (error){
			await fs.appendFile(page.path, 'Inbound Shipment FAILED\n', function(err) {
				console.log('\t'+error);
			})
			console.log(error)
		}	
		page.quit();
	});
});