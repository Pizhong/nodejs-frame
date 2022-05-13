#!/bin/bash
cd /data/code/measure-webapi/
git checkout .
git pull

cnpm install
npm run stop
npm run start
