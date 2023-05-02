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
```
import { objectToFormData } from "objecttoformdataconverter";

const data = {
  name: 'biju',
  age: '20',
  address: {city:'dharan', state: 'koshi'}
}

const convertedData = objectToFormData(data)
```
The above code produces equivalent of:
```
const formdata = new FormData()
formdata.append("name", "value")
formdata.append("age", "value")
formdata.append("address.city", "value")
formdata.append("address.state", "value")
```
### Usage with Object containing array
```
import { objectToFormData } from "objecttoformdataconverter";

const data = {
  name: 'biju',
  address: [{city:'dharan'},{city:'kathmandu'}]
}

const newData = objectToFormData(data)
```
The above code produces equivalent of: 

```
const formdata = new FormData()
formdata.append("name", "value")
formdata.append("address[0].city", "value")
formdata.append("address[1].city", "value")
```
