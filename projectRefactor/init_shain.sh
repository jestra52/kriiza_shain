#!/bin/bash

git checkout dev
git pull origin dev

pm2 restart 0
pm2 restart 1
