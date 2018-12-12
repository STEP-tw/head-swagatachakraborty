#! /bin/sh
echo '----------------------------------./head.js -n5 ./textFiles/file_of_12_lines.txt--------------------------------------'
node ./head.js -n5 ./textFiles/file_of_12_lines.txt
echo '----------------------------------./head.js -n 5 ./textFiles/file_of_12_lines.txt--------------------------------------'
node ./head.js -n 5 ./textFiles/file_of_12_lines.txt
echo '---------------------------------------./head.js -5 ./textFiles/file_of_12_lines.txt---------------------------------'
node ./head.js -5 ./textFiles/file_of_12_lines.txt
echo '----------------------------------./head.js ./textFiles/file_of_12_lines.txt ./textFiles/file_of_3_lines.txt--------------------------------------'
node ./head.js ./textFiles/file_of_12_lines.txt ./textFiles/file_of_3_lines.txt
echo '----------------------------------./head.js -n 5 ./textFiles/file_of_12_lines.txt ./textFiles/file_of_3_lines.txt--------------------------------------'
node ./head.js -n 5 ./textFiles/file_of_12_lines.txt ./textFiles/file_of_3_lines.txt
echo '----------------------------------./head.js -n5 ./textFiles/file_of_12_lines.txt ./textFiles/file_of_3_lines.txt--------------------------------------'
node ./head.js -n5 ./textFiles/file_of_12_lines.txt ./textFiles/file_of_3_lines.txt
echo '-----------------------------------./head.js -5 ./textFiles/file_of_12_lines.txt ./textFiles/file_of_3_lines.txt-------------------------------------'
node ./head.js -5 ./textFiles/file_of_12_lines.txt ./textFiles/file_of_3_lines.txt
echo '-----------------------------------./head.js -c5 ./textFiles/file_of_12_lines.txt-------------------------------------'
node ./head.js -c5 ./textFiles/file_of_12_lines.txt
echo '-----------------------------------./head.js -c 5 ./textFiles/file_of_12_lines.txt-------------------------------------'
node ./head.js -c 5 ./textFiles/file_of_12_lines.txt
echo '---------------------------------./head.js -c5./textFiles/file_of_12_lines.txt./textFiles/file_of_3_lines.txt---------------------------------------'
node ./head.js -c5 ./textFiles/file_of_12_lines.txt ./textFiles/file_of_3_lines.txt
echo '--------------------------./head.js -c 5 ./textFiles/file_of_12_lines.txt. /textFiles/file_of_3_lines.txt----------------------------------------------'
node ./head.js -c 5 ./textFiles/file_of_12_lines.txt ./textFiles/file_of_3_lines.txt