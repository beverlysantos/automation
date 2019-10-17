const Page = require('../lib/webdrivers'),
    Expect = require('../lib/chai-expect'),
    fs  = require("fs"),
      time = require('node-get-time');
      mkdirp = require('mkdirp');
    var ks = require('node-key-sender');

var td = '/CRM Notes.csv';
var ts = '/CRM Notes.txt';


describe('Amzentrix tests for CRM Notes', async function () {
    beforeEach (async () =>  {
        page = new Page();
        expect = new Expect();
        driver = page.driver;

        await page.CreateLog(ts, "CRM NOTES \n");
        await page.Log(ts, 'Navigate to http://www.amzentrix.uat40/login \n');
        await page.visit("http://www.amzentrix.uat40/login");

        await page.Log(ts, 'input Email Adress: aybalane@gmail.com \n');
        await page.writeByName("email", "aybalane@gmail.com");

        await page.Log(ts, 'input password: password \n');  
        await page.writeByName("password", "password");     

        await page.Log(ts, 'click submit button \n');
        await page.clickClassName("btn btn-primary btn-round btn-lg btn-block");

        await page.Log(ts, "click Challenger USA \n");
        await page.clickId("store_1");
        await page.clickId("fvpp-blackout");
        
        await page.Log(ts, " SUCCESSFULL validation \n");
        await page.getClassText("page-header").then(function(text)   {
            return expect.toEqual(text, "DASHBOARD CHALLENGER USA");
        });
 
        await page.Log(ts, "click CRM \n");  
        await page.clickXpath("//*[@id='sidebar']/ul/li[3]/a");

        await page.Log(ts, "click notes \n");
        await page.clickXpath("//*[@id='notes-button-link']");

        await page.Log(ts, " SUCCESSFULL validation \n")
        await page.getClassText("page-header").then(function(text) {
            return expect.toEqual(text, "NOTES CHALLENGER USA\nADD NOTE\nSEARCH");
        // await page.Log(ts, " SUCCESSFULL validation ")
        // await page.getClassText("page-header").then(function(text) {
        //     return expect.toEqual(text, "CUSTOMER RELATIONSHIP MANAGEMENT CHALLENGER USA\nADD");

        });

    });

  it('Should add edit and delete', async () => {  
      try{
         //ADD 
         try{
         await page.Log(ts, "click add notes \n");
         await page.clickXpath("//*[@id='main-content']/section/div[1]/div/h3//a[1]");

         try{
         await page.Log(ts, "write amazon_order_id \n");
         await page.writeByXpath("//*[@id='amazon_order_id']", "114-5771329-5809805");
                passed_a(6,td);

         } catch (error){
            console.log('\t   ' + error );

                  failed_a(6,td);    

         }
         try{
         await page.Log(ts, "click categgory \n");
         await page.clickId("note_category_id");

         await page.writeById("note_category_id", "r");
         await page.writeById("note_category_id", "r");
         

         await page.Log(ts, "enter");
         await ks.sendKey("enter");
                passed_a(9,td);

        } catch (error){
            console.log('\t   ' + error );
            failed_a(9,td);


        }
         await page.Log(ts, "click source \n")
         await page.clickXpath("//*[@id='cke_33'] ");

         await page.Log(ts, "write sample_description \n");
         await page.writeByXpath("//*[@id='cke_1_contents']/textarea", "sample_description1");

        try{
          await page.clickXpath("//*[@id='add-note-form']/div[4]/label");
          await ks.sendKey('down');
         await page.Log(ts, "write 05/01/2019 \n");
         await page.writeByXpath("//*[@id='alert_date']", "05/01/2019");
                passed_a(8,td);

        } catch (error){
            console.log('\t   ' + error );

                  failed_a(8,td);        
        }
        try{
          await ks.sendKeys(['tab', 'tab']);
         await page.Log(ts, "select status type\n");
         await page.clickId("note_status_id");

         await page.writeById("note_status_id", "a");

         // await page.Log(ts, "enter");
         // await ks.sendKey("enter");
         await ks.sendKeys(['tab', 'tab', 'tab', 'tab']);
               passed_a(9,td);

        } catch (error){
            console.log('\t   ' + error );

                  failed_a(9,td);  
        }
        try{
         await page.Log(ts, "click checkbox button \n");
         await page.clickXpath("(//*[@id='assigned_to'])[7]"); 
              passed_a(10,td);

        } catch (error){
            console.log('\t   ' + error );

                  failed_a(10,td);
         }
         await page.Log(ts, "key press tab \n");
         await ks.sendKeys(['tab', 'tab', 'tab', 'tab', 'tab', 'tab', 'tab', 'tab', 'tab', 'tab']);

         await page.Log(ts, "key press tab \n");
         await ks.sendKeys(['tab', 'tab', 'tab', 'tab', 'tab', 'tab', 'tab', 'tab', 'tab', 'tab']);

         await page.Log(ts, "key press tab \n");
         await ks.sendKeys(['tab', 'tab', 'tab', 'tab', 'tab', 'tab', 'tab', 'tab', 'tab', 'tab']);

         await page.Log(ts, "key press tab \n");
         await ks.sendKeys(['tab', 'tab', 'tab', 'tab']);
          await ks.sendKeys(['tab', 'tab', 'tab', 'tab']);

         await page.Log(ts, "click add button \n"); 
         await page.clickXpath("//*[@id='add-note-btn']");

         await page.Log(ts, 'click enter \n'); 
         await ks.sendKey("enter");

                 passed_a(1,td);

        } catch (error){
            console.log('\t   ' + error );

                  failed_a(1,td);       
        }         
         
         await page.Log(ts, "click search button \n");
         await page.clickXpath("//*[@id='main-content']/section/div[1]/div/h3/div/div/a[2]");

        try{
         await page.Log(ts, "search amazon_order_id \n");
         await page.writeByXpath("//*[@id='amazon_order_id']", "114-5771329-5809805");
                passed_a(6,td);

        } catch (error){
            console.log('\t   ' + error );

                  failed_a(6,td);           

        }
        try{
         await page.Log(ts, "click search button submit \n");
         await page.clickXpath("//*[@id='notes']//form/div/div[2]/div[4]//button");
                passed_a(4,td);

        } catch (error){
            console.log('\t   ' + error );

               failed_a(4,td);     
        }
         await page.Log(ts, "SUCCESSFUL validation \n");
         await page.getXpathText("(//*[@id='tableRows']/td[1])[1]").then(function(text) {
            return expect.toHaveString(text, "114-5771329-5809805");

        });                                        
        try{
          //VIEW
          await page.Log(ts, "view fba notes \n");
          await page.clickCss("#tableRows > td:nth-child(6) > div > a.btn.btn-primary");

             passed_a(0,td);
        } catch (error){
              failed_a(0,td);
        }
        try{
          //EDIT
          await page.Log(ts,"click edit button \n");
          await page.clickXpath("//*[@id='main-content']/section/div/div[4]//div[2]//a[1]");

          await page.Log(ts, "click source \n")
          await page.clickXpath("//*[@id='cke_33'] ");

          await page.Log(ts, "clear sample_description \n");
          await page.clearXpath("//*[@id='cke_1_contents']/textarea");

          await page.Log(ts, "write sample_description \n");
          await page.writeByXpath("//*[@id='cke_1_contents']/textarea", "done");
          await ks.sendKeys(['tab', 'tab', 'tab']);
          await page.Log(ts, "click update button \n");
          await page.clickXpath("//*[@id='main-content']/section/div[4]//form/div[6]/div/button");

          await page.Log(ts, 'click enter \n'); 
          await ks.sendKey("enter"); 

              passed_a(2,td);
        } catch (error){
            console.log('\t   ' + error );
              failed_a(6,td);

           await page.Log(ts, "click search button \n");
           await page.clickXpath("//*[@id='main-content']/section/div[1]/div/h3//a[2]");

           await page.Log(ts, "search amazon_order_id \n");
           await page.writeByXpath("//*[@id='amazon_order_id']", "114-5771329-5809805");
        }

        try{
         await page.Log(ts, "click search button \n");
         await page.clickXpath("//*[@id='main-content']/section/div[1]/div/h3/div/div/a[2]");

         await page.Log(ts, "search amazon_order_id \n");
         await page.writeByXpath("//*[@id='amazon_order_id']", "114-5771329-5809805");

         await page.Log(ts, "click search button submit \n");
         await page.clickXpath("//*[@id='notes']//form/div/div[2]/div[4]//button");

                passed_a(4,td);
        } catch (error){
            console.log('\t   ' + error );

                  failed_a(4,td);          

        await page.Log(ts, "SUCCESSFUL validation \n");
        await page.getXpathText("(//*[@id='tableRows']/td[1])[1]").then(function(text) {
           return expect.toHaveString(text, "114-5771329-5809805");

        }); 
      }
        try{
            //DELETE
          await page.Log(ts, "click delete button \n");
          await page.clickCss("#tableRows > td:nth-child(6) > div > a.btn.btn-danger");

          await page.Log(ts, "user scroll drown \n"); 
          await ks.sendKeys(['down', 'down', 'down', 'down', 'down', 'down', 'down', 'down']);

          await page.Log(ts, "click delete \n");
          await page.clickXpath("//*[@id='main-content']/section/div[4]//form/div[7]//button");

          await page.Log(ts, 'click enter \n'); 
          await ks.sendKey("enter"); 
              passed_a(3,td);

        } catch (error){
            console.log('\t   ' + error );
              
             failed_a(3,td);
        }

          await fs.appendFile( page.path, 'CRM Notes SUCCESSFUL \n', function(err) {
    
        })

      } catch (error) {
          await fs.appendFile( page.path, 'CRM Notes FAILED  \n', function(err) {
             console.log('\t   ' + error );
        })
      }
      page.quit();
   });
}); //Arian
