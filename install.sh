# -- BUILD AND INSTALL Tech Radar --

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

# Clone 'WorldOfRations' repository
git clone https://github.com/developersworkspace/TechRadar.git

# Change directory to 'web'
cd ./TechRadar/web

# Install node packages for 'web'
npm install

# Build 'web'
npm run build

# Change to root of repository
cd ./../

# Build and run docker compose as deamon
docker-compose up -d
