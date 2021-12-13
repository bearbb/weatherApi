# Weather api

## Get temp and rain data by name and year

GET /api/tempNRainDataByNameAndYear/:PVName/:year

## Get temp and rain data by name, year and month

GET /api/tempNRainPrecise/:PVName/:year/:month
Example: get temp and rain amount of BaRia in 2014 on JAN
GET /api/tempNRainPrecise/BaRia/2014/JAN

## Those api below need to be moderator role

## Add temp data for a year

POST /api/addTempData/:PVName

### Data structure:

{
"YEAR": number,
"JAN": number,
"FEB": number,
"MAR": number,
"APR": number,
"MAY": number,
"JUN": number,
"JUL": number,
"AUG": number,
"SEP": number,
"OCT": number,
"NOV": number,
"DEC": number,
"ANN": number
}

## Add rain amount data for a year

POST /api/addRainData/:PVName

### Data structure:

{
"YEAR": number,
"JAN": number,
"FEB": number,
"MAR": number,
"APR": number,
"MAY": number,
"JUN": number,
"JUL": number,
"AUG": number,
"SEP": number,
"OCT": number,
"NOV": number,
"DEC": number,
"ANN": number
}

## Update temp or rain amount data for a year

POST /api/updateTempData/:PVName

POST /api/updateRainData/:PVName

### Data structure

Similar to add but optional in amount of data u want to update. Example: update only JAN temp:
{
"YEAR": 2020,
"JAN": 30
}

## Delete temp or rain amount data for a year

DELETE /api/deleteTempData/:PVName/:year

DELETE /api/deleteRainData/:PVName/:year
