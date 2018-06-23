## Introduction

This repo aims to create a `command-line interface` using `NodeJS` & [Commander](https://www.npmjs.com/package/commander) for a simple task: predict the exchange rate in future of 2 currencies which entered from user, using `Linear Regression` algorithm.  

Based on the historical data of 12 months, this command will show you the predicted data of next month. (The data of 12 months is temporary fixed for 2016, the next month is Jan 2017)

## Preparation

1. Install `NodeJS` (Recommend version 8 or above)
2. Clone this repo
3. Go to the app's directory
4. Run `npm install`
5. Run `npm link` to symbolic link our CLI app so we can use it. 

## How to use  
    exchange predict <from_currency> <to_currency>
    
- `from_currency` is base currency, default is `USD`. Because I get currency data from a free API so the default base is always `USD`.  
- `to_currency` is destination currency that we want to predict the rate.  

For example:  
    
    exchange predict USD VND

result:

    The predicted exchange rate from USD to VND for 01/15/2017 is 22439.3578

## Accuracy

The accuracy of `Linear Regression` in this situation is about `95% - 99%`.

## Improvements

There're a few ways to increase the accuracy:

- `Using more data`: In this small program, I only use 12 data points. If we can have more data points (ex: 12000 points) then it'll improve the result very much.
- `Normalize data`: scale down the numeric value into a smaller range, usually between `0 & 1`
- Using another algorithm, such as `Gaussian Process`
- Using `Neural Network`
