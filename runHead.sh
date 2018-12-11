#! /bin/sh
echo '----------------------------------./head.js -n5 file_of_12_lines.txt--------------------------------------'
node ./head.js -n5 file_of_12_lines.txt
echo '----------------------------------./head.js -n 5 file_of_12_lines.txt--------------------------------------'
node ./head.js -n 5 file_of_12_lines.txt
echo '---------------------------------------./head.js -5 file_of_12_lines.txt---------------------------------'
node ./head.js -5 file_of_12_lines.txt
echo '----------------------------------./head.js file_of_12_lines.txt file_of_3_lines.txt--------------------------------------'
node ./head.js file_of_12_lines.txt file_of_3_lines.txt
echo '----------------------------------./head.js -n 5 file_of_12_lines.txt file_of_3_lines.txt--------------------------------------'
node ./head.js -n 5 file_of_12_lines.txt file_of_3_lines.txt
echo '----------------------------------./head.js -n5 file_of_12_lines.txt file_of_3_lines.txt--------------------------------------'
node ./head.js -n5 file_of_12_lines.txt file_of_3_lines.txt
echo '-----------------------------------./head.js -5 file_of_12_lines.txt file_of_3_lines.txt-------------------------------------'
node ./head.js -5 file_of_12_lines.txt file_of_3_lines.txt
echo '-----------------------------------./head.js -c5 file_of_12_lines.txt-------------------------------------'
node ./head.js -c5 file_of_12_lines.txt
echo '-----------------------------------./head.js -c 5 file_of_12_lines.txt-------------------------------------'
node ./head.js -c 5 file_of_12_lines.txt
echo '---------------------------------./head.js -c5 file_of_12_lines.txt file_of_3_lines.txt---------------------------------------'
node ./head.js -c5 file_of_12_lines.txt file_of_3_lines.txt
echo '--------------------------./head.js -c 5 file_of_12_lines.txt file_of_3_lines.txt----------------------------------------------'
node ./head.js -c 5 file_of_12_lines.txt file_of_3_lines.txt