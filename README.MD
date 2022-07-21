Prod site: 

https://cal.irudd.se

Deploy:

Update the version in service-worker.ts and then run:

>> caprover deploy -b master -a cal -n captain-01

Service worker:

- Note the .htaccess in /public which makes sure the service-worker js is not cached.
- Without this updates "never" (slower than several hours at least) happen. 