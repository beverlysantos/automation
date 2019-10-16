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
	switch(mon)
	{
		case 1:
			month = 'January';
			break;
		case 2:
			month = 'February';
			break;
		case 3:
			month = 'March';
			break;
		case 4:
			month = 'April';
			break;			
		case 5:
			month = 'May';
			break;
		case 6:
			month = 'June';
			break;
		case 7:
			month = 'July';
			break;
		case 8:
			month = 'August';
			break;
		case 9:
			month = 'September';
			break;
		case 10:
			month = 'October';
			break;
		case 11:
			month = 'November';
			break;
		case 12:
			month = 'December';
			break;		
	}
	
	this.sleep = async function(ms)
	{
		await this.driver.sleep(ms);
	}
	
	this.selectStartDate = async function(tdyear)
	{
		await page.clickId('date_from');
		await page.clickXpath("//*/form/div[1]//div[2]/header/span[2]");		
		var yr = tdyear.split("/");
		
	    while(true)
		{
			let yearRange = await this.driver.findElement(By.xpath("//*/form/div[1]//div[3]/header/span[2]")).getText();		
			if(yearRange>yr[2]){ await page.clickXpath('//*/form/div[1]//div[3]/header/span[1]'); }
			else if (yearRange==yr[2]) { break; }
			else { await page.clickXpath('//*/form/div[1]//div[3]/header/span[3]'); }
		}
		await page.clickXpath('//*/form/div[1]//div[3]/span['+yr[0]+']');
		await page.clickXpath('(//*[@class="vdp-datepicker__calendar"])[1]/div/span[not(contains(@class, "cell day-header")) and not(contains(@class, "cell day blank"))]['+yr[1]+']');		
	}
	
	this.selectEndDate = async function(tdyear)
	{
		await page.clickId('date_to');
		await page.clickXpath("//*/form/div[2]//div[2]/header/span[2]");		
		var yr = tdyear.split("/");
		
	    while(true)
		{
			let yearRange = await this.driver.findElement(By.xpath("//*/form/div[2]//div[3]/header/span[2]")).getText();		
			if(yearRange>yr[2]){ await page.clickXpath('//*/form/div[2]//div[3]/header/span[1]'); }
			else if (yearRange==yr[2]) { break; }
			else { await page.clickXpath('//*/form/div[2]//div[3]/header/span[3]'); }
		}
		await page.clickXpath('//*/form/div[2]//div[3]/span['+yr[0]+']');
		await page.clickXpath('(//*[@class="vdp-datepicker__calendar"])[4]/div/span[not(contains(@class, "cell day-header")) and not(contains(@class, "cell day blank"))]['+yr[1]+']');		
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
	
	this.validateRow = async function(ts,selector,msg)
	{   
		var count = 1;
		let links = await this.driver.findElements({css:selector});
		for(let link of links)
		{
			textA = await link.getText();
			await this.driver.executeScript("arguments[0].scrollIntoView()", link);
			await this.driver.executeScript("window.scrollBy(0,-65)", link);			
			
			if(textA==msg)
			{
				await this.Log(ts, ' ' + textA + ' found in row ' + count + '\n');
				break;
			}
			else
			{
				count++;
			}
		}			
	}
	
	this.validateDeletedRow = async function(ts,selector,msg)
	{   
		var x;
		var count = 0;
		let links = await this.driver.findElements({css:selector});
		for(let link of links)
		{
			textA = await link.getText();
			await this.driver.executeScript("arguments[0].scrollIntoView()", link);
			await this.driver.executeScript("window.scrollBy(0,-65)", link);
			
			if(textA!=msg) { count++; x=false; }
			else { count++; x=true; break; }		
		}
		
		if(!x)
		{
			await this.Log(ts, ' [Passed] Data not found \n');
		}
		else
		{
			await this.Log(ts, ' [Failed] Data found in row ' + count + '\n');
			throw ' [Failed] Data found in row ' + count + '\n';
		}
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
		return await fs.writeFile(__dirname  + '/../test_logs/' + month + '_' + now.getFullYear() + '/'+ mon + '_' + day + '_' + now.getFullYear() + path, msg, function (err){})
	}
	
	this.Log = async function(path,msg)
	{
		const results = perf.stop();
		var time = results.time / 1000;
		return await fs.appendFile(__dirname  + '/../test_logs/' + month + '_' + now.getFullYear() + '/'+ mon + '_' + day + '_' + now.getFullYear() + path, time.toFixed(4) + msg, function (err){})
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
		let links = await this.driver.findElements({css:'#sidebar > ul > li > a'});
		for(let link of links)
		{
			textA = await link.getText();
			if(textA==text)
			{
				await link.click();
				break;
			}
		}
	}
	//END STORE SIDEBAR
	
	//START HOME STORES
	this.Store = async function(text)
	{	
		await this.driver.wait(until.elementLocated(By.css('#collapseStores a')));
		let links = await this.driver.findElements({css:'#collapseStores a'});
		for(let link of links)
		{
			textA = await link.getText();
			if(textA==text)
			{
				await link.click();
				await page.clickId("fvpp-blackout");
				break;
			}
		}
	}
	//END HOME STORES
	
	//START CRM Module
	this.Store_CRM = async function(text)
	{		
		let links = await this.driver.findElements({css:'#main-content tbody tr'});
		for(let link of links)
		{
			textA = await link.getText();
			if(textA==text)
			{
				await link.findElement(By.tagName("a")).click();
				break;
			}
		}
	}
	//END CRM Module
	
	//START BIM Module
	this.Store_BIM = async function(text)
	{
		let links = await this.driver.findElements({css:'#main-content tbody tr'});
		for(let link of links)
		{			
			textA = await link.getText();
			if(textA==text)
			{
				await this.driver.executeScript("arguments[0].scrollIntoView()", link);
				await this.driver.executeScript("window.scrollBy(0,-65)", link);
				await link.findElement(By.tagName("a")).click();				
				break;
			}
		}
	}
	//END BIM Module
	
	//START REPORTS BIM
	this.Store_Reports_BIM = async function(text)
	{	
		await this.driver.wait(until.elementLocated(By.id('main-content')));
		let links = await this.driver.findElements({css:'#main-content tbody tr '});
		for(let link of links)
		{
			textA = await link.findElement(By.css('td:nth-child(2)')).getText();
			await this.driver.executeScript("arguments[0].scrollIntoView()", link);
			await this.driver.executeScript("window.scrollBy(0,-65)", link);

			if(textA==text)
			{
				await link.findElement(By.css('td:nth-child(1) a:nth-child(1)')).click();		
				break;
			}
		}
	}
	//END REPORTS BIM
	
	//START SETTINGS
	this.Store_Settings = async function(text)
	{
		await this.driver.wait(until.elementLocated(By.id('main-content')));
		let links = await this.driver.findElements({css:'#main-content tbody tr '});
		for(let link of links)
		{
			textA = await link.findElement(By.css('td:nth-child(2)')).getText();
			await this.driver.executeScript("arguments[0].scrollIntoView()", link);
			await this.driver.executeScript("window.scrollBy(0,-65)", link);

			if(textA==text)
			{
				if(textA=='Uploaded Files (Business Reports) BIM'||textA=='Uploaded Files (Fulfillments) CRM'||textA=='Uploaded Files (Inventory Reports) BIM')
				{
					await link.findElement(By.css('td:nth-child(1) a:nth-child(1)')).click();						
					break;
				}
				else
				{
					await link.findElement(By.css('td:nth-child(1) a:nth-child(2)')).click();				
					break;
				}
			}
		}
	}	
	//END SETTINGS
	
	// START HOME DROPDOWN
	this.Home_DropdownMenu = async function(text)
	{
		await page.clickId("navbarTopDropdownMenuItems");
		let links = await this.driver.findElements({css:'#navbarTogglerDemo03 > ul > li > div > a'});
		for(let link of links)
		{
			textA = await link.getText();
			if(textA==text)
			{		
				await link.click();
				await page.clickId("fvpp-close");
				break;
			}
		}
	}
	// END HOME DROPDOWN
	
	// START SETTINGS CONTROL PANEL
	this.AdminSettings = async function(text)
	{
		await this.driver.wait(until.elementLocated(By.id('main-content')));
		let links = await this.driver.findElements({css:'#main-content tbody tr '});
		for(let link of links)
		{
			textA = await link.findElement(By.css('td:nth-child(2)')).getText();
			await this.driver.executeScript("arguments[0].scrollIntoView()", link);
			await this.driver.executeScript("window.scrollBy(0,-65)", link);
			if(textA==text)
			{
				if(textA=='Notifications')
				{
					await link.findElement(By.css('td:nth-child(1) a:nth-child(1)')).click();				
					break;
				}
				else
				{
					await link.findElement(By.css('td:nth-child(1) a:nth-child(2)')).click();				
					break;
				}
			}
		}
	}
	// END SETTINGS CONTROL PANEL
	
	// TEST DATA ------------------------------------------------
	
	var t_p = fs.readFileSync(__dirname + '/../tests/json/p_tcm.json');
	var t_a = fs.readFileSync(__dirname + '/../tests/json/a_tcm.json');
	//var t = fs.readFileSync(__dirname + '/../tests/json/tcm.json');
	
	var tc_p = JSON.parse(t_p);
	var tc_a = JSON.parse(t_a);
	// var tc = JSON.parse(t);
	
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
	
	// passed = function(a,b)
	// {
		// add_row(a,"PASSED");		
		// save(b);
	// }
	
	// failed = function(a,b)
	// {
		// add_row(a,"FAILED");	
		// save(b);
	// }
		
	// add_row = function(a,g)
	// {
		// worksheet.addRow({
		   // id: tc.tcm[a].id,
		   // fc: tc.tcm[a].form,
		   // type: tc.tcm[a].type,
		   // desc: tc.tcm[a].desc,
		   // tstep: tc.tcm[a].step,
		   // exp: tc.tcm[a].exp,
		   // res : g
		// }).commit();
	// };

	save = function(td)
	{
		 workbook.csv.writeFile(__dirname  + '/../test_logs/' + month + '_' + now.getFullYear() + '/'+ mon + '_' + day + '_' + now.getFullYear() + td);
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