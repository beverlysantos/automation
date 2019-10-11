const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs  = require("fs");
const perf = require('execution-time')();
var Excel = require('exceljs');
let o = new chrome.Options();
	o.addArguments('--start-fullscreen');
	o.addArguments('--disable-infobars');
	o.addArguments('--enable-automation');

var Page = function()
{	
	this.driver = new Builder()
		.forBrowser('chrome')
		.setChromeOptions(o)
		.build();
		
	var now = new Date();
	var mon = (now.getMonth()+1);
	if (mon < 10) { var mon = ('0' + (now.getMonth()+1)); }
	
	var day = now.getDate();
	if (day < 10) { var day = ('0' + now.getDate()); }
	
	var month;
	if (mon == 1) {
		var month = 'January';
	} else if (mon == 2) {
		var  month = 'February';
	} else if (mon == 3) {
		var  month = 'March';
	} else if (mon == 4) {
		var  month = 'April';
	} else if (mon == 5) {
		var  month = 'May';
	} else if (mon == 6) {
		var  month = 'June';
	} else if (mon == 7) {
		var  month = 'July';
	} else if (mon == 8) {
		var  month = 'August';
	} else if (mon == 9) {
		var  month = 'September';
	} else if (mon == 10) {
		var  month = 'October';
	} else if (mon == 11) {
		var  month = 'November';
	} else if (mon == 12) {
		var  month = 'December';
	}	

	this.sleep = async function(ms)
	{
		await this.driver.sleep(ms);
	}

	this.scrollById = async function(id)
	{
		element = await this.driver.findElement(By.id(id));
		await this.driver.executeScript("arguments[0].scrollIntoView()", element);
		await this.driver.executeScript("window.scrollBy(0,-65)", element);
	}
	this.scrollByXpath = async function(xpath)
	{
		element = await this.driver.findElement(By.xpath(xpath));
		await this.driver.executeScript("arguments[0].scrollIntoView()", element);
		await this.driver.executeScript("window.scrollBy(0,-65)", element);
	}
	this.scrollByLink = async function(text)
	{
		element = await this.driver.findElement(By.linkText(text));
		await this.driver.executeScript("arguments[0].scrollIntoView()", element);
		await this.driver.executeScript("window.scrollBy(0,-65)", element);
	}
	this.scrollByCss = async function(selector)
	{
		element = await this.driver.findElement(By.css(selector));
		await this.driver.executeScript("arguments[0].scrollIntoView()", element);
		await this.driver.executeScript("window.scrollBy(0,-65)", element);
	}
	this.scrollByClass = async function(className)
	{
		element = await this.driver.findElement(By.className(className));
		await this.driver.executeScript("arguments[0].scrollIntoView()", element);
		await this.driver.executeScript("window.scrollBy(0,-65)", element);
	}
	this.scrollByName = async function(name)
	{
		element = await this.driver.findElement(By.name(name));
		await this.driver.executeScript("arguments[0].scrollIntoView()", element);
		await this.driver.executeScript("window.scrollBy(0,-65)", element);
	}
	

	this.validateTable = async function(xpath)
	{   
		var count = 1;
		
		const tableRow = await this.driver.findElements(By.xpath(xpath))	
		tableRow.forEach(async profile => 
		{		
			const textA = await profile.getAttribute("innerText");
			console.log(textA);		
		}); 			
	}

	//visit the page
	this.visit = async function(url) {
		return await this.driver.get(url);
	}
	
	this.sendKeys = async function() {
		return await this.driver.sendKeys(Key)
	}
	//close current window
	this.close = async function() {
		return await this.driver.close();
	}

	//quit current session
	this.quit = async function() {
		return await this.driver.quit();
	}

	//Get current url
	this.getUrl = async function() {
		return await this.driver.getCurrentUrl();
	}

	//Get title of current page
	this.getTitle = async function() {
		return await this.driver.getTitle();
	}

	//wait and find element by name
	this.findByName = async function(name) {
		await this.driver.wait(until.elementLocated(By.name(name)));
		return await this.driver.findElement(By.name(name));
	}

	//find element name and click
	this.clickName = async function(name) {
		let el = await this.findByName(name);
		return await el.click();
	}

	//find element name and get text
	this.getNameText = async function(name) {
		let el = await this.findByName(name);
		return await el.getText();
	}

	//find element name and clear values
	this.clearName = async function(name) {
		let el = await this.findByName(name);
		return await el.clear();
	}

	//input value in element by name
	this.writeByName = async function(name, txt, val = null) {
		if(val) {
			let el = await this.findByName(name);
			return await el.sendKeys(txt, Key.val);
		}
		else {
			let el = await this.findByName(name);
			return await el.sendKeys(txt);	
		}
	}

	//wait and find element by id
	this.findById = async function(id) {
		await this.driver.wait(until.elementLocated(By.id(id)));
		return await this.driver.findElement(By.id(id));
	}

	//find element id and click
	this.clickId = async function(id) {
		let el = await this.findById(id);
		return await el.click();
	}

	//find element id and get text
	this.getIdText = async function(id) {
		let el = await this.findById(id);
		return await el.getText();
	}

	//find element name and clear values
	this.clearId = async function(id) {
		let el = await this.findById(id);
		return await el.clear();
	}

	//input value in element by name
	this.writeById = async function(id, txt, val = null) {
		if(val) {
			let el = await this.findById(id);
			return await el.sendKeys(txt, Key.val);
		}
		else {
			let el = await this.findById(id);
			return await el.sendKeys(txt);	
		}
	}

	//wait and find element by link text
	this.findByLink = async function(text) {
		await this.driver.wait(until.elementLocated(By.linkText(text)));
		return await this.driver.findElement(By.linkText(text));
	}

	//wait and find element by link text
	this.clickLink = async function(text) {
		let el = await this.findByLink(text);
		return await el.click();
	}

	//wait and find element by class name
	this.findByClass = async function(className) {
		await this.driver.wait(until.elementLocated(By.className(className)));
		return await this.driver.findElement(By.className(className));
	}

	//find element id and get text
	this.getClassText = async function(className) {
		let el = await this.findByClass(className);
		return await el.getText();
	}

	//find element name and clear values
	this.clearClass = async function(className) {
		let el = await this.findByClass(className);
		return await el.clear();
	}

	//input value in element by name
	this.writeByClass = async function(className, txt, val = null) {
		if(val) {
			let el = await this.findByClass(className);
			return await el.sendKeys(txt, Key.val);
		}
		else {
			let el = await this.findByClass(className);
			return await el.sendKeys(txt);	
		}
	}

	//find element class name and click
	this.clickClassName = async function(className) {
		let el = await this.findByClass(className);
		return await el.click();
	}

	//wait and find element by css
	this.findByCss = async function(selector) {
		await this.driver.wait(until.elementLocated(By.css(selector)));
		return await this.driver.findElement(By.css(selector));
	}

	//find element css selector and click
	this.clickCss = async function(selector) {
		let el = await this.findByCss(selector);
		return await el.click();
	}

	//find element css selector and get text
	this.getCssText = async function(selector) {
		let el = await this.findByCss(selector);
		return await el.getText();
	}

	//find element selector and clear values
	this.clearCss = async function(selector) {
		let el = await this.findByCss(selector);
		return await el.clear();
	}

	//input value in element by name
	this.writeByCss = async function(selector, txt, val = null) {
		if(val) {
			let el = await this.findByCss(selector);
			return await el.sendKeys(txt, Key.val);
		}
		else {
			let el = await this.findByCss(selector);
			return await el.sendKeys(txt);	
		}
	}

	//wait and find element by link text substring
	this.findByPartialLink = async function(text) {
		await this.driver.wait(until.elementLocated(By.partialLinkText(text)));
		return this.driver.findElement(By.partialLinkText(text));
	}
	
	// this.waitLoader = async function(xpath)
	// {
		// await this.driver.wait(until.(By.xpath(xpath)));
		
	// }

	//find link visible substring and click
	this.clickPartialLink = async function(text) {
		let el = await this.findByPartialLink(text);
		return await el.click();
	}

	//wait and find element by xpath
	this.findByXpath = async function(xpath) {
		await this.driver.wait(until.elementLocated(By.xpath(xpath)));
		return await this.driver.findElement(By.xpath(xpath));
	}

	//find element xpath and click
	this.clickXpath = async function(xpath) {
		let el = await this.findByXpath(xpath);
		return await el.click();
	}

	//find element xpath and get text
	this.getXpathText = async function(xpath) {
		let el = await this.findByXpath(xpath);
		return await el.getText();
	}

	//find element xpath and clear values
	this.clearXpath = async function(xpath) {
		let el = await this.findByXpath(xpath);
		return await el.clear();
	}

	//input value in element by xpath
	this.writeByXpath = async function(xpath, txt, val = null) {
		if(val) {
			let el = await this.findByXpath(xpath);
			return await el.sendKeys(txt, Key.val);
		}
		else {
			let el = await this.findByXpath(xpath);
			return await el.sendKeys(txt);	
		}
	}
	
	this.CreateLog = async function(path, msg)
	{
		perf.start();
		return await fs.writeFile(__dirname  + '/../test_logs/' + month + '_' + now.getFullYear() + '/'+ mon + '_' + day + '_' + now.getFullYear() +'/Log'+ path, msg, function (err){})
	}
	
	this.Log = async function(path,msg)
	{
		const results = perf.stop();
		var time = results.time / 1000;
		return await fs.appendFile(__dirname  + '/../test_logs/' + month + '_' + now.getFullYear() + '/'+ mon + '_' + day + '_' + now.getFullYear() +'/Log' + path, time.toFixed(4) + '\t' + msg, function (err){})
	}
	
	// Add button in Admin Settings > View
	this.Addbtn_Click = async function(){
		await page.clickXpath("//*[@id='main-content']//div[1]//h3//a");
	}	
	
	//START Login Amz
	this.Login_Submit_Click = async function(){
		await page.clickClassName("btn btn-primary btn-round btn-lg btn-block");
	}	
	//END Login Amz
	
	//START STORE SIDEBAR
	this.Store_SideBar = async function(text)
	{
		switch(text)
		{
			case "Home":
				await page.clickLink("Home");
				break;
			case "Dashboard":
				await page.clickLink("Dashboard");
				break;
			case "CRM":
				await page.clickLink("CRM");
				break;
			case "BIM":
				await page.clickLink("BIM");
				break;
			case "SAM":
				await page.clickLink("SAM");
				break;
			case "Upload Data":
				await page.clickLink("Upload Data");
				break;
			case "Reports":
				await page.clickLink("Reports");
				break;
			case "Settings":
				await page.clickLink("Settings");
				break;
		}
	}
	//END STORE SIDEBAR
	
	//START HOME STORES
	this.Store = async function(text)
	{
		switch(text)
		{
			case "TendGeto":
				await page.clickId("store_11");
				await page.clickId("fvpp-blackout");
				break;
			case "Challenger USA":
				await page.clickId("store_1");
				await page.clickId("fvpp-blackout");
				break;
			case "Challenger Europe":
				await page.clickId("store_2");
				await page.clickId("fvpp-blackout");
				break;
			case "ISellAll":
				await page.clickId("store_3");
				await page.clickId("fvpp-blackout");
				break;
			case "Mogeeks USA":
				await page.clickId("store_4");
				await page.clickId("fvpp-blackout");
				break;
			case "Mogeeks Canada":
				await page.clickId("store_5");
				await page.clickId("fvpp-blackout");
				break;
			case "Mogeeks Europe":
				await page.clickId("store_6");
				await page.clickId("fvpp-blackout");
				break;
			case "BrushSonic USA":
				await page.clickId("store_7");
				await page.clickId("fvpp-blackout");
				break;
			case "Mogeeks MakerSpot":
				await page.clickId("store_8");
				await page.clickId("fvpp-blackout");
				break;
		}
	}
	//END HOME STORES
	
	//START CRM Module
	this.Store_CRM = async function(text)
	{
		switch(text)
		{
			case "Notes":
				await page.clickId("notes-button-link");
				break;
			case "Fulfillments":
				await page.clickId("fulfillments-button-link");
				break;
			case "Send Feedback":
				await page.clickId("send-feedback-button-link");
				break;
		}
	}
	//END CRM Module
	
	//START BIM Module
	this.Store_BIM = async function(text)
	{
		switch(text)
		{
			case "Inventory Forecast":
				await page.scrollByCss("tbody tr:nth-child(1) a");
				await page.clickCss("tbody tr:nth-child(1) a");
				break;
			case "Inbound Shipment":
				await page.scrollByCss("tbody tr:nth-child(2) a");
				await page.clickCss("tbody tr:nth-child(2) a");
				break;
			case "Sales Campaign":
				await page.scrollByCss("tbody tr:nth-child(3) a");
				await page.clickCss("tbody tr:nth-child(3) a");
				break;
			case "PPC Manager":
				await page.scrollByCss("tbody tr:nth-child(4) a");
				await page.clickCss("tbody tr:nth-child(4) a");
				break;
			case "Deal Manager":
				await page.scrollByCss("tbody tr:nth-child(5) a");
				await page.clickCss("tbody tr:nth-child(5) a");
				break;
			case "Event Manager":
				await page.scrollByCss("tbody tr:nth-child(6) a");
				await page.clickCss("tbody tr:nth-child(6) a");
				break;
			case "Search in Amazon":
				await page.scrollByCss("tbody tr:nth-child(7) a");
				await page.clickCss("tbody tr:nth-child(7) a");
				break;	
			case "Brand Analytics":
				await page.scrollByCss("tbody tr:nth-child(8) a");
				await page.clickCss("tbody tr:nth-child(8) a");
				break;
			case "Business Task Inputs":
				await page.scrollByCss("tbody tr:nth-child(9) a");
				await page.clickCss("tbody tr:nth-child(9) a");
				break;	
			case "Business Analytics":
				await page.scrollByCss("tbody tr:nth-child(10) a");
				await page.clickCss("tbody tr:nth-child(10) a");
				break;	
			case "List Recommendations History":
				await page.scrollByCss("tbody tr:nth-child(11) a");
				await page.clickCss("tbody tr:nth-child(11) a");
				break;
			case "Amazon Prices":
				await page.scrollByCss("tbody tr:nth-child(12) a");
				await page.clickCss("tbody tr:nth-child(12) a");
				break;		
		}
	}
	//END BIM Module
	
	//START REPORTS BIM
	this.Store_Reports_BIM = async function(text)
	{
		switch(text)
		{
			case "Business Reports (Per Asin) v2":
				await page.scrollByCss("table tr:nth-child(1) a");
				await page.clickCss("table tr:nth-child(1) a");
				break;
			case "Business Reports (Per Date)":
				await page.scrollByCss("table tr:nth-child(2) a");
				await page.clickCss("table tr:nth-child(2) a");
				break;
			case "Business Reports (Per Asin)":
				await page.scrollByCss("table tr:nth-child(3) a");
				await page.clickCss("table tr:nth-child(3) a");
				break;
			case "Inventory Report v2":
				await page.scrollByCss("table tr:nth-child(4) a");
				await page.clickCss("table tr:nth-child(4) a");
				break;
			case "Sales Report (Single vs Multiple Orders)":
				await page.scrollByCss("table tr:nth-child(5) a");
				await page.clickCss("table tr:nth-child(5) a");
				break;
			case "Sales Report (Buyer Frequency)":
				await page.scrollByCss("table tr:nth-child(6) a");
				await page.clickCss("table tr:nth-child(6) a");
				break;	
			case "Sales Report (SKU Combinations)":
				await page.scrollByCss("table tr:nth-child(7) a");
				await page.clickCss("table tr:nth-child(7) a");
				break;
			case "Sales Slope By Day":
				await page.scrollByCss("table tr:nth-child(8) a");
				await page.clickCss("table tr:nth-child(8) a");
				break;
			case "Sales Slope By Hour":
				await page.scrollByCss("table tr:nth-child(9) a");
				await page.clickCss("table tr:nth-child(9) a");
				break;		
			case "Top SKU":
				await page.scrollByCss("table tr:nth-child(10) a");
				await page.clickCss("table tr:nth-child(10) a");
				break;
			case "Sku History Report":
				await page.scrollByCss("table tr:nth-child(11) a");
				await page.clickCss("table tr:nth-child(11) a");
				break;
			case "Sku Trend Monitoring":
				await page.scrollByCss("table tr:nth-child(12) a");
				await page.clickCss("table tr:nth-child(12) a");
				break;
			case "SKU Update Report":
				await page.scrollByCss("table tr:nth-child(13) a");
				await page.clickCss("table tr:nth-child(13) a");
				break;
			case "Restock Inventory Report":
				await page.scrollByCss("table tr:nth-child(14) a");
				await page.clickCss("table tr:nth-child(14) a");
				break;
			case "Sales Information":
				await page.scrollByCss("table tr:nth-child(15) a");
				await page.clickCss("table tr:nth-child(15) a");
				break;
		}
	}
	//END REPORTS BIM
	
	//START SETTINGS
	this.Store_Settings = async function(text)
	{
		switch(text)
		{
			case "Asins":
				await page.scrollById("asins");
				await page.clickId("asins");
				break;
			case "Feedback Templates":
				await page.scrollById("feedback-templates");
				await page.clickId("feedback-templates");
				break;
			case "Product Keywords":
				await page.scrollById("product-keywords");
				await page.clickId("product-keywords");
				break;
			case "Sku Group Maintenance Settings":
				await page.scrollById("sku-group-maintenance-settings");
				await page.clickId("sku-group-maintenance-settings");
				break;
			case "Skus":
				await page.scrollById("skus");
				await page.clickId("skus");
				break;
			case "Task Schedules":
				await page.scrollById("task-schedules");
				await page.clickId("task-schedules");
				break;
			case "Uploaded Files (Business Reports)":
				await page.scrollById("business-report-files");
				await page.clickId("business-report-files");
				break;
			case "Uploaded Files (Fulfillments)":
				await page.scrollById("fulfillment-uploaded-files");
				await page.clickId("fulfillment-uploaded-files");
				break;
			case "Uploaded Files (Inventory Reports)":
				await page.scrollById("inventory-report-files");
				await page.clickId("inventory-report-files");
				break;
		}
	}	
	//END SETTINGS	
	
	// TEST DATA ------------------------------------------------
	
	var t_p = fs.readFileSync(__dirname + '/../scripts/json/p_tcm.json');
	var t_a = fs.readFileSync(__dirname + '/../scripts/json/a_tcm.json');
	var t = fs.readFileSync(__dirname + '/../scripts/json/tcm.json');
	
	var tc_p = JSON.parse(t_p);
	var tc_a = JSON.parse(t_a);
	var tc = JSON.parse(t);
	
	var workbook = new Excel.Workbook();
	var sheet = workbook.addWorksheet('My Sheet');
	var worksheet = workbook.getWorksheet('My Sheet');
	
	this.path = __dirname  + '/../test_logs/' + month + '_' + now.getFullYear() + '/'+ mon + '_' + day + '_' + now.getFullYear() + '/result_summary-'+ mon + "_"+ day + "_" + now.getFullYear() + '.txt';	
			
	passed_p = function(a,b)
	{
		add_row_p(a,"PASSED");		
		save(b);
	}
	
	failed_p = function(a,b)
	{
		add_row_p(a,"FAILED");		
		save(b);
	}
	
	add_row_p = function(a,g)
	{
		worksheet.addRow({
		   id: tc_p.tcm[a].id,
		   fc: tc_p.tcm[a].form,
		   type: tc_p.tcm[a].type,
		   desc: tc_p.tcm[a].desc,
		   tstep: tc_p.tcm[a].step,
		   exp: tc_p.tcm[a].exp,
		   res : g
		}).commit();
	};
	
	passed_a = function(a,b)
	{
		add_row_a(a,"PASSED");		
		save(b);
	}
	
	failed_a = function(a,b)
	{
		add_row_a(a,"FAILED");		
		save(b);
	}
	
	add_row_a = function(a,g)
	{
		worksheet.addRow({
		   id: tc_a.tcm[a].id,
		   fc: tc_a.tcm[a].form,
		   type: tc_a.tcm[a].type,
		   desc: tc_a.tcm[a].desc,
		   tstep: tc_a.tcm[a].step,
		   exp: tc_a.tcm[a].exp,
		   res : g
		}).commit();
	};
	
	passed = function(a,b)
	{
		add_row(a,"PASSED");		
		save(b);
	}
	
	failed = function(a,b)
	{
		add_row(a,"FAILED");	
		save(b);
	}
		
	add_row = function(a,g)
	{
		worksheet.addRow({
		   id: tc.tcm[a].id,
		   fc: tc.tcm[a].form,
		   type: tc.tcm[a].type,
		   desc: tc.tcm[a].desc,
		   tstep: tc.tcm[a].step,
		   exp: tc.tcm[a].exp,
		   res : g
		}).commit();
	};

	save = function(td)
	{
		 workbook.csv.writeFile(__dirname  + '/../test_logs/' + month + '_' + now.getFullYear() + '/'+ mon + '_' + day + '_' + now.getFullYear() + '/Excel/' + td);
	};

	worksheet.columns = [
		  { header: 'TEST CASE ID', key: 'id',   width: 15 },
		  { header: 'FORM CONTROL', key: 'fc',   width: 15 },
		  { header: 'TYPE',         key: 'type', width: 15 },
		  { header: 'DESCRIPTION',  key: 'desc', width: 45 },
		  { header: 'TEST STEPS',   key: 'tstep',width: 35 },
		  { header: 'EXPECTATION',  key: 'exp',  width: 40 },
		  { header: 'ACTUAL RESULT',key: 'res',  width: 15 }
	];
	// ------------------------------------------------
}

module.exports = Page;