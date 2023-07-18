# based image yang akan digunakan
FROM node:18.16.0

# path di container dimana berisi codingan kita (path bebas sesuai kesepakatan bersama)
WORKDIR /server/orchestrator/

# untuk set ENV dalam aplikasi kita
ENV PORT=4000

# copy deps yang ada di apps ke WORKDIR
COPY package.json package-lock.json /server/orchestrator/

# Install npm & Mengapus cache
RUN npm install

# 2 install setup for development
RUN npm install -g nodemon

# copy semua file & folder ke WORKDIR
COPY . .

# execute apps: production
CMD ["nodemon", "app"]