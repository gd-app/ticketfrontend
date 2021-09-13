<h2 align="center">Ticket System Frontend </h3>


This is not a completed project.

## Outstanding work
* Enable 2 way jwt token generation & validation
* Showing booked seating in different color with click disabled
* Release seat if user cancel the final submission screen
* some style refinement




## High Level Design 
Reactjs with react-boostrap 5.1.0 
    
### Security 
* https shall be enabled to ensure channel encryption
       
## Development & Deployment
* Compile and package with npm v6.14.x.
* Package command
```sh
npm run-script build
npm pack
```
* This front end app is designed to be single domain with API (url : /api)
* For development, developer may enable crossorigin & enable exposedHeaders for request-hash, refer to https://spring.io/guides/gs/rest-service-cors/

## Reference source
* stackoverflow.com
* react-bootstrap.github.io
* https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples




   
