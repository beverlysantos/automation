const Page = require('../lib/webdrivers'),
      Expect = require('../lib/chai-expect'),
      fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
var ks = require('node-key-sender');

var td = '/Fulfillment Center.csv';
var ts = '/Fulfillment Center.txt';

  //fulfillmentcenter
    describe('Amzentrix tests for Admin Settings - Fulfillment Center', async function () {
    beforeEach (async () =>  {
        page = new Page();
        expect = new Expect();
        driver = page.driver;

        await page.CreateLog(ts, "fulfillmentcenter \n");
        await page.Log(ts, 'Navigate to http://www.amzentrix.uat40/login \n');
        await page.visit("http://www.amzentrix.uat40/login");

        await page.Log(ts, 'input Email Adress: aybalane@gmail.com \n');
        await page.writeByName("email", "aybalane@gmail.com");

        await page.Log(ts, 'input password: password \n');
        await page.writeByName("password", "password");   

        await page.Log(ts, 'click submit button \n');
        await page.clickClassName("btn btn-primary btn-round btn-lg btn-block");
        
        await page.Log(ts, 'click navbarTopDropdownMenuItems \n');
        await page.clickXpath("//*[@id='navbarTopDropdownMenuItems']");

        await page.Log(ts, 'click navbarTogglerDemo03 \n');
        await page.clickXpath("//*[@id='navbarTogglerDemo03']/ul/li/div/a[5]");
        await page.clickId("fvpp-blackout");

        await ks.sendKeys(['down','down','down','down','down','down']);

        await page.Log(ts, 'click view fulfillment center \n');
        await page.clickId("fulfillment-centers");

        await page.Log(ts, 'SUCCESSFUL to validate \n');
        await page.getClassText("page-header").then(function(text) {
          return expect.toHaveString(text, "FULFILLMENT CENTERS SETTINGS\nADD");
        });
  });
    it("should add edit and delete", async() => {
      try{
        //add
        try {
          
          await page.getClassText("page-header").then(function(text)   {
            return expect.toHaveString(text, "FULFILLMENT CENTERS SETTINGS\n");
        });;  
          await page.Log(ts,' [SUCCESSFUL] Validation for Page Header \n');

          passed_a(0,td);

        } catch (error){
              console.log('\t   ' + error );
              failed_a(0,td);
      }
      try{
        await page.Log(ts, 'click add button \n');
        await page.clickXpath("//*[@id='main-content']/section/div[1]/div/h3//a");
        
        await page.Log(ts, 'write FC_SAMPLE \n');
        await page.writeByXpath("//*[@id='name']", "FC_SAMPLE");
        
        await page.Log(ts, 'click state \n');
        await page.clickXpath("//*[@id='state_id']");
        
        await page.Log(ts, 'click state_id options \n');
        await page.clickXpath("//*[@id='state_id']/option[5]");

        await page.Log(ts, 'click ship_country_id \n');
        await page.clickXpath("//*[@id='ship_country_id']");

        await page.Log(ts, 'click ship_country_id options \n');
        await page.clickXpath("//*[@id='ship_country_id']/option[3]");

        await page.Log(ts, 'click add button \n');
        await page.clickXpath("//*[@id='main-content']/section/div[4]//div/form/div[4]//button/span");
        
        await page.Log(ts, 'click enter \n');
        await ks.sendKey("enter");

        await page.Log(ts, 'FC_SAMPLE \n');
        await page.writeByXpath("//*[@id='search']", "FC_SAMPLE");

        await page.Log(ts, 'click search button \n');
        await page.clickXpath("//*[@id='main-content']/section/div[1]/div/ol/form/button");
  //for(var x=20; x<=1000; x++){
      //try{

        await page.Log(ts, 'SUCCESSFUL to validate \n');
        await page.getXpathText("//*[@id='main-content']/section/div[4]/div/div/div/div/table/tbody/tr/td[2]").then(function(text) {
          return expect.toHaveString(text, "FC_SAMPLE");
        });
            //console.log("found on row "+ x + ".");

        //var y=x+100;
          passed_a(1,td);

        } catch (error){
              console.log('\t   ' + error );
              failed_a(1,td);
      }
      try{
        // //edit
        await page.Log(ts, 'click edit button \n');
        await page.clickCss("table tbody tr:nth-last-child(1) a");

        await page.Log(ts, 'click state_id \n');
        await page.clickXpath("//*[@id='state_id']");

        await page.Log(ts, 'click state_id option \n');
        await page.clickXpath("//*[@id='state_id']/option[6]");

        await page.Log(ts, 'click ship_country_id \n');
        await page.clickXpath("//*[@id='ship_country_id']");

        await page.Log(ts, 'click ship_country_id option \n');
        await page.clickXpath("//*[@id='ship_country_id']/option[4]");

        await page.Log(ts, 'click update button \n');
        await page.clickXpath("//*[@id='main-content']/section/div[4]//div/form/div[4]//button");
        
        await page.Log(ts, 'click enter \n');
        await ks.sendKey("enter");

            passed_a(2,td);

        } catch (error){
              console.log('\t   ' + error );
              failed_a(2,td);
      }
        await page.Log(ts, 'search FC_SAMPLE \n');
        await page.writeByXpath("//*[@id='search']", "FC_SAMPLE");

        await page.Log(ts, 'click search button \n');
        await page.clickXpath("//*[@id='main-content']/section/div[1]/div/ol/form/button");
        
            
        //await ks.sendKey(['down']);
        //await page.clickLink("15"); 
        //delete
        try{
        await page.Log(ts, 'click delete button \n');
        await page.clickCss("table tbody tr:nth-last-child(1) a:nth-child(2)");
        
        await page.Log(ts, 'click delete button \n');
        await page.clickXpath("//*[@id='main-content']/section/div[4]//div/form/div[4]//button");
       
        await page.Log(ts, 'click enter \n');
        await ks.sendKey("enter");
         //x=1000;
          passed_a(3,td);

        } catch (error){
              console.log('\t   ' + error );
              failed_a(3,td);
        } 
         await fs.appendFile(page.path, ' Admin Settings - Fulfillment Center SUCCESSFUL \n', function(err) {
  
       })

     // } catch{

      //}
    //}
    } catch (error) {
      await fs.appendFile(page.path, ' Admin Settings - Fulfillment Center FAILED  \n', function(err) {
          console.log('\t   ' + error );
        })
      //console.log(error)
      }
      page.quit();
    });
  });
