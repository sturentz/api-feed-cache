# api-feed-cache

From the Weather API, making this its own project.

The api-feed-cache is perfecting a backend (currently PHP script) that will save data locally from an API call. This will reduce rate limits that might be a snag point for websites with heavy visits. The script will also act as a fallback if the the API goes down, pulling the info from the previous store.

The script will act can act as a require, restful call, or cron job. This will give a variety of ways for use cases to fit the delivery pipeline. 

After the PHP script has been made, the project will be pranched into ruby, etc, to give the same funcitonality to fit your backend flavor of server needs.
