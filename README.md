# lol

## Instructions to run 
1) `git clone https://github.com/kabirvirji/lol.git`
2) `cd client && yarn install`
3) `cd ../server && npm install`
4) `cd .. && npm install`
5) `npm run dev`
> NOTE: please create a `.env` file in the root directory like so:
```
key="my-api-key"
```

## Lessons Learned
- I learned about the LOL api, and writing a server to interact with an external API

## What I would do differently
- Robust user input (checking to make sure user input is valid before requesting anything from the backend)
- Dealing with errors more efficiently
- Write more React components to keep `App.js` simple
- Abstract out functions from the server for readability
- Better UI (formatting the matches nicely like op.gg)
- Use static data
- Manage package managers better (not use both npm and yarn)
- Write tests

## If this was a production application, how would you handle the situation where your application goes over the rate limiting threshold on Riot Games' API?

I actually used the API wrapper `LeagueJS`, so I didn't need to manually handle rate limiting. If I did have to manually handle rate limiting, I would need some sort of load balancer (or something similar) between my client and server. The purpose would be to filter out any unnecessary requests. For example, if the request is taking a while and the user clicks the button multiple times, we wouldn't need to send that request multiple times. This would help us to stay within the rate limit.

## If you could architect a solution that would work on production at scale, how would you design that system?

The first thing I would do is change my current design. Instead of having the frontend and backend hosted in the same place, I would separate them. This allows for multiple advantages, and makes sense since the frontend and backend are not logically related. The first is that you could write the client and server in different languages. Second, you can deploy them on different platforms. Third, this creates the opportunity for a "microservices" type approach. You could modify one part of the backend without interrupting another. This also allows us to have replicas of our servers, incase of server failure.

Another thing I would do is decrease latency using a cache. I noticed I was making nested API calls, when one call I needed to make depended on the information from the previous call. I could cache recurring items such as `accountId` so I wouldn't need to query for them if the user makes another request. I would implement the caching on the server.

One last thing worth mentioning is writing unit tests. Both for the backend and frontend. Ideally, we would write our tests first :)

> Justifying the service worker 

The service worker wasn't needed for this specific application, since it was a small test app (also the service worker is only enabled after running `npm build`). However, if this were a large scale production application, the service worker would be ideal since it improves the latency using caching. Additionally, it helps if you have a wide array of users with varying network connections. Having the service worker as a "middle man" helps with a lot of things out of box such as app stability. 

