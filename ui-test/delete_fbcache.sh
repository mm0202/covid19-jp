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

curl -i -X POST \
  "https://graph.facebook.com/v6.0/?scrape=true&id=https%3A%2F%2Fcovid19.wlaboratory.com%2F&access_token=${FB_ACCESS_TOKEN}"

for lang in $LANGS; do
  echo "https://graph.facebook.com/v6.0/?scrape=true&id=https%3A%2F%2Fcovid19.wlaboratory.com%2F${lang}%2F&access_token=${FB_ACCESS_TOKEN}"
  for page in $PAGES; do
    curl -i -X POST \
      "https://graph.facebook.com/v6.0/?scrape=true&id=https%3A%2F%2Fcovid19.wlaboratory.com%2F${lang}%2Fcards%2F${page}%2F&access_token=${FB_ACCESS_TOKEN}"
  done
  curl -i -X POST \
    "https://graph.facebook.com/v6.0/?scrape=true&id=https%3A%2F%2Fcovid19.wlaboratory.com%2F${lang}%2F&access_token=${FB_ACCESS_TOKEN}"
done
