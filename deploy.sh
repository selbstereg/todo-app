#/bin/bash

set -e

echo "Run this via \"npm run deploy\". Otherwise ng won't be found."

ng build --prod --source-map --output-path docs --base-href /todo-app/
cp docs/index.html docs/404.html
git add docs
git commit -a -m 'Deployment commit'
git push
