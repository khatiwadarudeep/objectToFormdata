# Introduction
An efficient npm package that simplifies the process of converting JavaScript objects to FormData, while also providing robust TypeScript support. This package is designed to help developers easily integrate FormData into their web applications without having to write complex and error-prone code.

# Installation

With npm: 
```
$ npm install objecttoformdataconverter 
```
With yarn: 
```
$ yarn add objecttoformdataconverter 
```
With pnpm: 
```
$ pnpm install objecttoformdataconverter
```
# Usage
### Usage with Objects containing nested object

Lets assume we have our data as 
```
const data = {
  name: 'biju',
  age: '20',
  address: {city:'dharan', state: 'koshi'}
}
```
We can simply convert the provided data by doing
```
import { objectToFormData } from "objecttoformdataconverter";
const convertedData = objectToFormData(data)
```
The above code produces equivalent of:
```
const convertedData = new FormData()
convertedData.append("name", "value")
convertedData.append("age", "value")
convertedData.append("address.city", "value")
convertedData.append("address.state", "value")
```
### Usage with Object containing array
Lets assume we have our data as
```
const data = {
  name: 'biju',
  address: [{city:'dharan'},{city:'kathmandu'}]
}
```
We can simply convert the provided data by doing
```
import { objectToFormData } from "objecttoformdataconverter";
const newData = objectToFormData(data)
```
The above code produces equivalent of: 

```
const newData = new FormData()
newData.append("name", "value")
newData.append("address[0].city", "value")
newData.append("address[1].city", "value")
```



