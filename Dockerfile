# 拉去node image来打包React项目
FROM node:14 as build
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY public public/
COPY src src/
RUN npm install
RUN npm run build

# 创建并运行Nginx server，并把打包好的文件copt paste到server中
FROM nginx:alpine
# 从上一阶段copy build文件夹 到 nginx的制定html文件
COPY --from=build /app/build/ /usr/share/nginx/html 
EXPOSE 80
# 启动nginx server
CMD [ "nginx", "-g", "daemon off;" ]