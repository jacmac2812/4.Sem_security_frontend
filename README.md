First thing to do is to change your url in settings.js


Make sure you have a running backend that matches the url from the first step


To deploy the project on your droplet


SSH to your droplet and add an empty folder in /var/www (mkdir "foldername")


Give permission to the folder by typing (chmod -R 777 "foldername") 


Go to the projects root folder and type (npm run build


Still at the root of the projects folder type (scp -r ./build/* root@"IP Address":/var/www/"foldername")


The project is now deployed :D


Make sure to update nginx configurations to handle multiple routes! Steps 7-9


All can be found here: docs.google.com/document/d/1SQ1PDcd-ySpH4_YAL8tXGnsT9wFdJiBkRtcGZ3Pqq90/edit 


Last step is to open backend project and change the remote server address to your own(domainname.something/tomcat/...
