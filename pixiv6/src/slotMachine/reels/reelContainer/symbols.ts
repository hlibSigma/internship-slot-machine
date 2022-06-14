import { TSymbols } from "app/service/typing";

export const symbols:TSymbols[] = [
{
id: 1,
isScatter: true,
isWild: false,
name: "Scatter",
pays: []
},
{
"id": 2,
"isScatter": false,
"isWild": true,
"name": "Wild",
"pays": [
0,
0,
0,
0,
0
]
},
{
"id": 3,
"isScatter": false,
"isWild": false,
"name": "low1",
"pays": [
0,
0,
0.2,
0.4,
0.6
]
},
{
"id": 4,
"isScatter": false,
"isWild": false,
"name": "low2",
"pays": [
0,
0,
0.4,
0.6,
0.9
]
},
{
"id": 5,
"isScatter": false,
"isWild": false,
"name": "low3",
"pays": [
0,
0,
0.6,
0.8,
1.2
]
},
{
"id": 6,
"isScatter": false,
"isWild": false,
"name": "high1",
"pays": [
0,
0,
2,
4,
6
]
},
{
"id": 7,
"isScatter": false,
"isWild": false,
"name": "high2",
"pays": [
0,
0,
5,
6,
9
]
},
{
"id": 8,
"isScatter": false,
"isWild": false,
"name": "high3",
"pays": [
0,
0,
6,
8,
10
]
}
]