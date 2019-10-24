@echo off
set projectLocation=C:\Jenkins\jobs\automation\workspace\tcm bat
cd %projectLocation%

if not exist "C:\Jenkins\jobs\automation\workspace\test_logs\%month%_%date:~-4,4%\%mo%_%date:~-7,2%_%date:~-4,4%\Log" mkdir C:\Jenkins\jobs\automation\workspace\test_logs\%month%_%date:~-4,4%\%mo%_%date:~-7,2%_%date:~-4,4%\Log;
if not exist "C:\Jenkins\jobs\automation\workspace\test_logs\%month%_%date:~-4,4%\%mo%_%date:~-7,2%_%date:~-4,4%\Excel" mkdir C:\Jenkins\jobs\automation\workspace\test_logs\%month%_%date:~-4,4%\%mo%_%date:~-7,2%_%date:~-4,4%\Excel;
set projectLocation=C:\Jenkins\jobs\automation\workspace\
cd %projectLocation%


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

echo --------------------------------------->> test_logs\%month%_%date:~-4,4%\%mo%_%date:~-7,2%_%date:~-4,4%\runtest-%date:~-10,2%_%date:~-7,2%_%date:~-4,4%.txt
echo This script has been executed at %date:~-10,2%/%date:~-7,2%/%date:~-4,4% %time:~0,2%:%time:~3,2%:%time:~6,2%.>>  test_logs\%month%_%date:~-4,4%\%mo%_%date:~-7,2%_%date:~-4,4%\runtest-%date:~-10,2%_%date:~-7,2%_%date:~-4,4%.txt && goto :run
:run
npm run as_dd >> test_logs\%month%_%date:~-4,4%\%mo%_%date:~-7,2%_%date:~-4,4%\runtest-%date:~-10,2%_%date:~-7,2%_%date:~-4,4%.txt && exit

echo.
echo 