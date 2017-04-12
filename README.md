# TechRadar

![Screenshot](https://github.com/developersworkspace/TechRadar/blob/master/screenshots/one.png?raw=true)

## What is 'TechRadar' about?

TechRadar is a way to visualize trends in different aspects of technology. These aspects, 'Techniques', 'Tools', 'Platforms' and 'Languages and Frameworks', are displayed on a radar chart (as seen above) where their distance from the origin dictates their popularity.

## Installation

### Running on your local machine

#### Prerequisites

* Local MongoDB instance
* Host entry of '127.0.0.1 mongo'

Clone this repository

`git clone https://github.com/developersworkspace/TechRadar.git`

Change to directory

`cd TechRadar`

Install node packages on all projects

`cd api & npm install & cd ..`
`cd web & npm install & cd ..`
`cd admin & npm install & cd ..`
`cd demo-app & npm install & cd ..`
`cd tests & npm install & cd ..`

Change directory to the project you would like to run and the following command

`npm start`

### One-line Install

#### Prerequisites

* Docker

Use the following command to run TechRadar in production.

`curl -s https://raw.githubusercontent.com/developersworkspace/TechRadar/master/install.sh | bash -s "yourdomain.com"`

Browse `http://yourdomain.com` for the web project.
Browse `http://admin.yourdomain.com` for the admin project.
Browse `http://yourdomain.com/api` for the api project.

The MIT License (MIT)
=====================

Copyright © `2017` `Barend Erasmus`

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.