FROM node:14.15.0

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY ./package.json /app

#RUN npm install
RUN npm install -g @angular/cli
RUN npm install

# add app
COPY . /app

# start app
CMD ng serve --host=0.0.0.0 --port 4200

EXPOSE 4200