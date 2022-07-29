![image](https://user-images.githubusercontent.com/445243/181450254-b1dd9362-2d7c-47a5-9801-290333bc1359.png)

- Simple calorie and activity tracker for myself.
- Intended use is as a PWA mimicing an app on iOS.
- Data is stored in indexedDb in the browser.

Prod site: 

https://cal.irudd.se

Deploy:

Update the version in service-worker.ts and then run:

>> caprover deploy -b master -a cal -n captain-01

Service worker:

- Note the .htaccess in /public which makes sure the service-worker js is not cached.
- Without this updates "never" (slower than several hours at least) happen. 

Production like local testing
>> npm run build

>> npm install -g serve

>> serve -s build
