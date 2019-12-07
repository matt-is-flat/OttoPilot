FROM browserless/chrome

ENV APP_DIR=/usr/src/app
WORKDIR $APP_DIR

COPY lib ./lib

##
# Add any extra required dependencies here:
RUN npm install puppeteer-core

CMD [ "node", "./lib/index.js" ]