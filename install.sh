# -- BUILD AND INSTALL Tech Radar --

# Declare varibles
domain=$1

# Update machine package indexes
sudo apt-get update

# Download and run script to install node 7
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -

# Install node 7
apt-get install -y nodejs

# Install 'typescript' node package
npm install -g typescript

# Install 'gulp' node package
npm install -g gulp

# Install 'angular-cli' node package
npm install -g @angular/cli

# Clone 'TechRadar' repository
git clone https://github.com/developersworkspace/TechRadar.git

# Replace domain
sed -i -- "s/yourdomain.com/$domain/g" ./TechRadar/web/src/environments/environment.prod.ts
sed -i -- "s/yourdomain.com/$domain/g" ./TechRadar/admin/src/environments/environment.prod.ts
sed -i -- "s/yourdomain.com/$domain/g" ./TechRadar/api/src/config.prod.ts
sed -i -- "s/yourdomain.com/$domain/g" ./TechRadar/nginx.conf

# Change directory to 'web'
cd ./TechRadar/web

# Install node packages for 'web'
npm install

# Build 'web'
npm run build

# Change directory to 'api'
cd ./../api

# Install node packages for 'api'
npm install

# Build 'api'
npm run build

# Change directory to 'admin'
cd ./../admin

# Install node packages for 'admin'
npm install

# Build 'admin'
npm run build

# Change to root of repository
cd ./../

# Build docker images
docker-compose build --no-cache

# Run docker compose as deamon
docker-compose up -d

# -- INSTALL NGINX --

# Update machine package indexes
sudo apt-get update

# Install NGINX
sudo apt-get install -y nginx

# Add rule to firewall
sudo ufw allow 'Nginx HTTP'

# Download nginx.conf to NGINX directory
curl -o /etc/nginx/nginx.conf https://raw.githubusercontent.com/developersworkspace/TechRadar/master/nginx.conf

# Restart NGINX
systemctl restart nginx

# Open 8181 port
sudo ufw allow 8181/tcp
