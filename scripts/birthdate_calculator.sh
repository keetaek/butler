#!/bin/bash

if [ $# -ne 1 ]; then
    echo $0: USAGE: ./birthdate_calculator.sh {filename}
    exit 1
fi

filename=$1

IFS=","
echo "["
while read ID FIRST_NAME LAST_NAME AKA NEW GENDER AGE DOB
do
        # $ARR = gawk 'match($0, /([A-Z]{2})([0-9]{2})([0-9]{2})/, ARR)'
        if [[ $ID =~ ([A-Z]{2})([0-9]{2})([0-9]{2}) ]]; then
            MONTH=${BASH_REMATCH[2]}
            DATE=${BASH_REMATCH[3]}
            let YEAR=2016-$AGE-1
            # Calculating birthdate and converting to readable format
            BIRTHDATE=`date -j -f '%m-%d-%Y' "$MONTH-$DATE-$YEAR" +"%m/%d/%Y"`
        else
            echo "unable to parse string $ID"
        fi
        echo "{"
        # echo "$ID,$FIRST_NAME,$LAST_NAME,$AKA,$GENDER,$AGE,$BIRTHDATE"
        echo "    first_name: \"$FIRST_NAME\","
        echo "    last_name: \"$LAST_NAME\","
        if [ ! -z "$AKA" ]; then
          echo "    nickname: \"$AKA\","
        fi
        echo "    birthdate: \"$BIRTHDATE\","
        if [ "$GENDER" == "M" ]
        then
          echo "    gender: \"male\""
        elif [ "$GENDER" == "F" ]
        then
          echo "    gender: \"female\""
        else
          echo "    gender: \"MANUAL CHECK! $GENDER\""
        fi
        echo "},"


done < $filename
echo "]"
