# ใช้ node image เพื่อสร้างแอป Vue
FROM node:14 AS build-stage

# ตั้ง working directory
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมดไปยัง container
COPY . .

# สร้างแอป Vue สำหรับ production
RUN npm run build

# ใช้ nginx image เพื่อ serve แอปที่สร้างเสร็จแล้ว
FROM nginx:stable-alpine AS production-stage

# คัดลอกไฟล์ build ไปที่ nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# คัดลอกไฟล์ default configuration ของ nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# expose port 80
EXPOSE 80

# เริ่ม nginx
CMD ["nginx", "-g", "daemon off;"]
