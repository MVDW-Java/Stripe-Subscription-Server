# Stripe Subscription Server
> [!WARNING]
> This is currently in early development, things WILL not work.

The Stripe Subscription server is a micro service that manages customer payments and subscriptions.
Its easy to implement into an exsisting codebase with a well defined REST API. Its a quick way to handle all payment stuff on your application without the customer having to check out on a different page.

## How to implement it?
Right now while the micro service is in early development we don't have a stable or functioning API, please wait a bit for 1.0 to drop :)

## Roadmap
### 1.0 release
- [ ] Data reader for interperting payment requirements
- [ ] Suggesting payment methods for each country (only card and iDeal at this time)
- [ ] Managing and caching customer payments and subscription
- [ ] A stable and well documented API 
- [ ] Subscribing to a subscription and checking if its active

### 2.0 release
- [ ] More payment options than card or iDeal
- [ ] Adding support for 1 time payments

Any more ideas? please make a suggestion on the issues tab
