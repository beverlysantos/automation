const Page = require('../lib/webdrivers'),
	  Expect = require('../lib/chai-expect'),
	  fs  = require("fs"),
	  time = require('node-get-time');
	  mkdirp = require('mkdirp');

var Excel = require('exceljs');
var ks = require('node-key-sender');
var driver;
var now = new Date();
var mon = (now.getMonth()+1);
if (mon < 10) {
	var mon = ('0' + (now.getMonth()+1));
}
var day = now.getDate();
if (day < 10) {
	var day = ('0' + now.getDate());
}

var path;
var pathex;
var screenshotPath;
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

var path =  __dirname  + '/../test_logs/' + month + '_' + now.getFullYear() + '/'+ mon + '_' + day + '_' + now.getFullYear() + '/result_summary-'+ mon + "_"+ day + "_" + now.getFullYear() +'.txt'; 
var pathex =  __dirname  + '/../test_logs/' + month + '_' + now.getFullYear() + '/'+ mon + '_' + day + '_' + now.getFullYear() + '/Excel/';

var p = 'PASSED';
var f = 'FAILED';

var t = fs.readFileSync(__dirname + '/json/tcm.json');
var tc = JSON.parse(t);

var workbook = new Excel.Workbook();
var sheet = workbook.addWorksheet('My Sheet');
var worksheet = workbook.getWorksheet('My Sheet');

var row = worksheet.getRow(1);
row.height=25;	

	function mid (){
		sheet.eachRow({ includeEmpty: true }, function(Row, rowNum) { //设置对齐方式等
    		Row.eachCell({ includeEmpty: true }, function(Cell, cellNum) {
    			if(rowNum == 1)
    				Cell.alignment = {vertical: 'middle', horizontal: 'center', wrapText: true},
    				Cell.border = {top: {style:'thin', color: {argb:'00000000'}},  left: {style:'thin', color: {argb:'00000000'}},
  									bottom: {style:'thin', color: {argb:'00000000'}},
  									right: {style:'thin', color: {argb:'00000000'}}}
    			else
    				Cell.alignment = {vertical: 'middle', horizontal: 'center', wrapText: true},
    				Cell.border = {top: {style:'thin', color: {argb:'00000000'}},  left: {style:'thin', color: {argb:'00000000'}},
  									bottom: {style:'thin', color: {argb:'00000000'}},
  									right: {style:'thin', color: {argb:'00000000'}}}
    		})
    	});
	}

	function add_row(a,b,c,d,e,f,g) {
		worksheet.addRow({
		   id: tc.tcm[a].id,
		   fc: tc.tcm[b].form,
		   type: tc.tcm[c].type,
		   desc: tc.tcm[d].desc,
		   tstep: tc.tcm[e].step,
		   exp: tc.tcm[f].exp,
		   res : g
		}).commit();
	};

	function save (){
		 workbook.xlsx.writeFile(pathex + '/Dashboard Management.xlsx');
	};

    ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1'].map(key2 => {
        sheet.getCell(key2).font = {
            color: { argb: '00ffffff' }
        };
        sheet.getCell(key2).fill = {
            type: 'pattern',
            pattern:'solid',
            bgColor:{argb:'00000000'} //blck
        };
    });
	worksheet.columns = [
	  { header: 'TEST CASE ID', key: 'id', width: 15 },
	  { header: 'FORM CONTROL', key: 'fc', width: 15 },
	  { header: 'TYPE', key: 'type', width: 15 },
	  { header: 'DESCRIPTION', key: 'desc', width: 45 },
	  { header: 'TEST STEPS', key: 'tstep', width: 35 },
	  { header: 'EXPECTATION', key: 'exp', width: 40 },
	  { header: 'ACTUAL RESULT', key: 'res', width: 15 }
	];
	mid();
	save();

describe('Amzentrix tests for Admin Settings - 1', async function () {
    beforeEach(async () => {	
    	page = new Page();
    	expect = new Expect();
    	driver = page.driver;
    	
    	await page.visit("http://www.amzentrix.uat40/login");
    	await page.writeByName("email", "jbeverly_qa@amzentrix.com");
    	await page.writeByName("password", "password");    	
    	await page.clickClassName("btn btn-primary btn-round btn-lg btn-block");
    	await page.clickId("navbarTopDropdownMenuItems");
    	await page.clickLink("Settings");
    	await page.clickId("fvpp-blackout");
    	await page.clickId("manage-dashboard");

    	
    });
	it("should verify if on and off are working", async () => {
		await page.getClassText("page-header").then(function(text)	 {
    		return expect.toHaveString(text, "DASHBOARD");
		});;	

		await page.clickXpath("//*[@id='app']/div/div[2]//tr[1]/td[2]/label/div");
		await page.clickLink("Home");
		await page.clickId("store_1");
    	await page.getClassText("page-header").then(function(text)	 {
    		return expect.toEqual(text, "DASHBOARD CHALLENGER USA"); 
    	});

    	try{
            await page.clickXpath("//*[@id='app']//div[2]//div[2]//div[2]//a[1]");
    			console.log('Can view CRM Dashboard');
	        
        } catch (error) {
            console.log('No CRM Dashboard');
            console.log(error);
        }
    	await page.visit("http://www.amzentrix.uat40/manage-dashboard");
    	await page.clickXpath("//*[@id='app']/div/div[2]//tr[1]/td[2]/label/div");
		await page.clickLink("Home");
		await page.clickId("store_1");
    	await page.getClassText("page-header").then(function(text)	 {
    		return expect.toEqual(text, "DASHBOARD CHALLENGER USA"); 
    	});

    	try{
            await page.clickXpath("//*[@id='app']//div[2]//div[2]//div[2]//a[1]");
    			console.log('Can view CRM Dashboard');
	        	add_row(5,5,5,5,5,5,f);
	    		mid();
				save();
        } catch (error) {
           console.log('No CRM Dashboard');
            add_row(5,5,5,5,5,5,p);
    		mid();
			save();
            console.log(error);
        }
    });
});