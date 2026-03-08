@echo off
cd /d "C:\Users\jerem\Documents\cutscene.me\jchackett.me"

echo Starting Eleventy...

call npm install
call npx @11ty/eleventy --serve

pause