#zero downtime deployment nextjs without vercel

echo "Deploy starting..."
rm src/lib/acl.ts
git pull

npm install || exit

BUILD_DIR=temp npm run build || exit

if [ ! -d "temp" ]; then
  echo '\033[31m temp Directory not exists!\033[0m'  
  exit 1;
fi


rm -rf build

mv temp build

chmod -R u=rwx build
chmod -R go=rx build

# sudo su stackconsole
pm2 restart frontend --update-env

echo "Deploy done."

#make sure `next.config.js` it set `distDir: process.env.BUILD_DIR`
