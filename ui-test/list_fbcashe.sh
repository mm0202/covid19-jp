#!/bin/bash

source ../.env # you have to set FB_ACCESS_TOKEN='{your access token}' in the .env file

LANGS="en zh-cn zh-tw ko ja-basic"

PAGES=$(cat <<EOT
cards/inspection-and-positive-situation
cards/the-day-before-ratio
cards/graph-card-of-all-patients
cards/graph-card-of-inspection-persons
cards/graph-card-of-discharge
cards/graph-card-of-dead
cards/positive-cases-attributes
EOT
)

for page in $PAGES; do
  for lang in $LANGS; do
    echo "https://covid19.wlaboratory.com//${lang}/cards/${page}"
  done
  echo "https://covid19.wlaboratory.com//cards/${page}"
done
