ng build --prod --output-path docs --base-href /todo-app/
cp docs/index.html docs/404.html
git add docs
git commit -a -m 'Deployment commit'
git push
