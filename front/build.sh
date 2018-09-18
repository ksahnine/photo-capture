docker run -u $(id -u) -it \
-p 4200:4200 \
-w /app \
-v `pwd`:/app:rw \
trion/ng-cli:1.7.3 bash -c "npm install && ng serve -H 0.0.0.0"

