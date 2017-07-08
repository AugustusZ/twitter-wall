# Twitter Wall
This is a Twitter Wall web app allowing a user to display interested tweets and view information of them with given hashtags.

-

Please see:

- [App Design Document](docs/App_Design_Document.md) for more details.
- [Demo video](https://youtu.be/70-6qmkKELM) on youtube.

## Usage

This repo contains both client and server.


### Server 

- Root path `./backend/`
- Before launch it, save your own Twitter developer credential in `env` so that the server can use it when connects Twitter Streaming API. Here is the template you can fill in by replacing `[x]`):

		export TWITTER_CONSUMER_KEY=[x]
		export TWITTER_CONSUMER_SECRET=[x]
		export TWITTER_ACCESS_TOKEN_KEY=[x]
		export TWITTER_ACCESS_TOKEN_SECRET=[x]
		
	After that, save these four lines to `twitter_env.sh` and run 
	
		$ source twitter_env.sh
		
- Launch with 

		$ node server.js
		
	on port `4444`

### Client

- Root path: `./`
- Launch with 

		$ nom start

	on port `3000`


## License

MIT
