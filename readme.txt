Excel to openAI project
using NodeJS xlsx

made for aalto openAI project

required modules
-----------------
xlsx
dotenv


start by making a file named ".env", and copy the data below

APIHOSTNAME="hosthere"
APIPATH="/path/here"
APIAUTH="auth here"
APIID="id here"



USAGE
-----
use help to see command list

to use the request command you need to have:
the .env file filled
a xlsx file to open with data, see sample.xlsx in ./1_EXCEL_FILES

then type "r [filename/filepath] [filenameOut/filepathOut]"
ex. "r test.xlsx out.xlsx"




XLSX STRUCTURE
--------------

HEADER - a subject (ex. Fantasy)
VALUE - a topic (ex. name a item)
RESULT - just to inform where the result goes (not required)

sample.xlsx
Header  Result
Value
Value
