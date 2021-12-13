# Weather api

![alt-text](https://img.freepik.com/free-photo/pastel-background-sky-feminine-style_53876-104862.jpg?size=626&ext=jpg)

## Get temp and rain data by name and year

```diff
@@ GET /api/tempNRainDataByNameAndYear/:PVName/:year@@
```

## Get temp and rain data by name, year and month

```diff
@@ GET /api/tempNRainPrecise/:PVName/:year/:month@@
```

> Example: get temp and rain amount of BaRia in 2014 on JAN
> GET /api/tempNRainPrecise/BaRia/2014/JAN

## Those api below need to be moderator role

## Add temp data for a year

```diff
@@ POST /api/addTempData/:PVName@@
```

### Data structure:

```javascript
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
```

## Add rain amount data for a year

```diff
@@ POST /api/addRainData/:PVName@@
```

### Data structure:

```javascript
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
```

## Update temp or rain amount data for a year

```diff
@@ POST /api/updateTempData/:PVName@@

@@ POST /api/updateRainData/:PVName@@
```

### Data structure

> Similar to add but optional in amount of data u want to update. Example: update only JAN temp:

```javascript
{
"YEAR": 2020,
"JAN": 30
}
```

## Delete temp or rain amount data for a year

```diff
@@ DELETE /api/deleteTempData/:PVName/:year@@

@@ DELETE /api/deleteRainData/:PVName/:year @@
```
