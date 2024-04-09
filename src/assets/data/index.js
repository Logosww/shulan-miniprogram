const arr = require('./cityList.json');
const fs = require('fs');

let alphas = [];
let cities = [];
for(let obj of arr) {
  const { key: alpha, value } = obj;
  if(!alphas.includes(alpha)) alphas.push(alpha), cities.push({ title: alpha, list: [{ value }]});
  else {
    const index = alphas.findIndex(_alpha => _alpha === alpha);
    cities[index].list.push({ value });
  }
}
fs.writeFile('_cityList.json', JSON.stringify(cities), e => console.error(e))
