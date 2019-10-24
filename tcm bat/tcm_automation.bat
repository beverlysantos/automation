
@echo off
set projectLocation=C:\Jenkins\jobs\automation\workspace\tcm bat
cd %projectLocation%

::npm install node-get-time --save   
::npm install mkdirp
::npm install --save-dev node-key-sender
::npm install exceljs
::npm install execution-time
:: -  run those first



set mo=%date:~-10,2%

if %mo%==01 (
	set month=January
) else if %mo%==02 (
	set month=February
) else if %mo%==03 (
	set month=March
) else if %mo%==04 (
	set month=April
) else if %mo%==05 (
	set month=May
) else if %mo%==06 (
	set month=June
) else if %mo%==07 (
	set month=July
) else if %mo%==08 (
	set month=August
) else if %mo%==09 (
	set month=September
) else if %mo%==10 (
	set month=October
) else if %mo%==11 (
	set month=November
) else if %mo%==12 (
	set month=December
)

if not exist "C:\Jenkins\jobs\automation\workspace\test_logs\%month%_%date:~-4,4%\%mo%_%date:~-7,2%_%date:~-4,4%\Log" mkdir C:\Jenkins\jobs\automation\workspace\test_logs\%month%_%date:~-4,4%\%mo%_%date:~-7,2%_%date:~-4,4%\Log;
if not exist "C:\Jenkins\jobs\automation\workspace\test_logs\%month%_%date:~-4,4%\%mo%_%date:~-7,2%_%date:~-4,4%\Excel" mkdir C:\Jenkins\jobs\automation\workspace\test_logs\%month%_%date:~-4,4%\%mo%_%date:~-7,2%_%date:~-4,4%\Excel;



::echo. >> C:\Jenkins\jobs\automation\workspace\test_logs\%month%_%date:~-4,4%\%mo%_%date:~-7,2%_%date:~-4,4%\result_summary-%date:~-10,2%_%date:~-7,2%_%date:~-4,4%.txt

echo     		Test Summary as of %date:~-10,2%/%date:~-7,2%/%date:~-4,4% %time:~0,2%:%time:~3,2%:%time:~6,2%>> C:\Jenkins\jobs\automation\workspace\test_logs\%month%_%date:~-4,4%\%mo%_%date:~-7,2%_%date:~-4,4%\result_summary-%date:~-10,2%_%date:~-7,2%_%date:~-4,4%.txt

echo. >> C:\Jenkins\jobs\automation\workspace\test_logs\%month%_%date:~-4,4%\%mo%_%date:~-7,2%_%date:~-4,4%\result_summary-%date:~-10,2%_%date:~-7,2%_%date:~-4,4%.txt
echo     ADMIN SETTINGS >> C:\Jenkins\jobs\automation\workspace\test_logs\%month%_%date:~-4,4%\%mo%_%date:~-7,2%_%date:~-4,4%\result_summary-%date:~-10,2%_%date:~-7,2%_%date:~-4,4%.txt
start /wait as_brf 
start /wait as_brf_date 
start /wait as_cur 
start /wait as_dd 
start /wait as_fba 
start /wait as_fbm 
start /wait as_fc 
::start /wait as_mws 
start /wait as_n 
start /wait as_notec 
start /wait as_notes 
start /wait as_reg 
start /wait as_rol 
start /wait as_sc 
start /wait as_sf 
start /wait as_ship 
start /wait as_ss 
start /wait as_states
start /wait as_task 
start /wait as_use 

echo. >> C:\Jenkins\jobs\automation\workspace\test_logs\%month%_%date:~-4,4%\%mo%_%date:~-7,2%_%date:~-4,4%\result_summary-%date:~-10,2%_%date:~-7,2%_%date:~-4,4%.txt
echo     CRM MODULE >> C:\Jenkins\jobs\automation\workspace\test_logs\%month%_%date:~-4,4%\%mo%_%date:~-7,2%_%date:~-4,4%\result_summary-%date:~-10,2%_%date:~-7,2%_%date:~-4,4%.txt
start /wait crm_ful 
start /wait crm_notes 
start /wait crm_feed 

echo. >> C:\Jenkins\jobs\automation\workspace\test_logs\%month%_%date:~-4,4%\%mo%_%date:~-7,2%_%date:~-4,4%\result_summary-%date:~-10,2%_%date:~-7,2%_%date:~-4,4%.txt
echo     BIM MODULE >> C:\Jenkins\jobs\automation\workspace\test_logs\%month%_%date:~-4,4%\%mo%_%date:~-7,2%_%date:~-4,4%\result_summary-%date:~-10,2%_%date:~-7,2%_%date:~-4,4%.txt
start /wait bim_if 
start /wait bim_is 
start /wait bim_lr 
start /wait bim_ti 
start /wait bim_pr 

echo. >> C:\Jenkins\jobs\automation\workspace\test_logs\%month%_%date:~-4,4%\%mo%_%date:~-7,2%_%date:~-4,4%\result_summary-%date:~-10,2%_%date:~-7,2%_%date:~-4,4%.txt
echo     REPORTS MODULE >> C:\Jenkins\jobs\automation\workspace\test_logs\%month%_%date:~-4,4%\%mo%_%date:~-7,2%_%date:~-4,4%\result_summary-%date:~-10,2%_%date:~-7,2%_%date:~-4,4%.txt
start /wait rep_br 
start /wait rep_ir 
start /wait rep_sm 
start /wait rep_bf 
start /wait rep_sc
start /wait rep_ssd 
start /wait rep_ssh 
start /wait rep_top 
start /wait rep_sh 
start /wait rep_trend 
start /wait rep_usku 
start /wait rep_rir 
start /wait rep_si 
start /wait rep_gs
start /wait rep_psku 
start /wait rep_fba 
start /wait rep_nsr 

echo. >> C:\Jenkins\jobs\automation\workspace\test_logs\%month%_%date:~-4,4%\%mo%_%date:~-7,2%_%date:~-4,4%\result_summary-%date:~-10,2%_%date:~-7,2%_%date:~-4,4%.txt
echo     SETTINGS MODULE >> C:\Jenkins\jobs\automation\workspace\test_logs\%month%_%date:~-4,4%\%mo%_%date:~-7,2%_%date:~-4,4%\result_summary-%date:~-10,2%_%date:~-7,2%_%date:~-4,4%.txt
start /wait set_asin 
start /wait set_fbt 
start /wait set_prodkey 
start /wait set_skugrp 
start /wait set_skus 
start /wait set_tsched 
start /wait set_upbr 
start /wait set_upf 
start /wait set_upi 





echo 	Test Automation ends at %time:~0,2%:%time:~3,2%:%time:~6,2%>>C:\Jenkins\jobs\automation\workspace\test_logs\%month%_%date:~-4,4%\%mo%_%date:~-7,2%_%date:~-4,4%\result_summary-%date:~-10,2%_%date:~-7,2%_%date:~-4,4%.txt
echo. >> C:\Jenkins\jobs\automation\workspace\test_logs\%month%_%date:~-4,4%\%mo%_%date:~-7,2%_%date:~-4,4%\result_summary-%date:~-10,2%_%date:~-7,2%_%date:~-4,4%.txt
echo. >> C:\Jenkins\jobs\automation\workspace\test_logs\%month%_%date:~-4,4%\%mo%_%date:~-7,2%_%date:~-4,4%\result_summary-%date:~-10,2%_%date:~-7,2%_%date:~-4,4%.txt

echo.
echo  test done...
timeout 5
exit