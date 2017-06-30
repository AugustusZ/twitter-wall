# App Design Document

## Objective 

Build a **Twitter Wall** web app in one week.

## Requirements 

- Using Angular 2
- Displaying (directly) the lasted tweets (with images) containing certain hashtags (i.e. #Esri #EsriUC) when it is opened
- Beautifully designed 
- Showing information (e.g. popular topics)
- Using GitHub to show progress (no dumping)

## Procedure

| # | Task | Date |
|---:|---|:---|
| 1 | Study Twitter APIs | 6/27 |
| 2 | Study competitions | 6/27, 6/28 |
| 3 | Design functionalities | 6/28 |
| 4 | Design wireframe / mockup | 6/28 |
| 5 | Learn Node.js, TypeScript, and Angular 2 | 6/28, 6/29 |
| 6 | Setup GitHub and environment | 6/30 |
| 7 | Implement app and compose document  | 6/30, 7/1, 7/2 |
| 8 | Test and debug  | 7/2, 7/3 |
| 9 | Deploy app on Google Cloud Platform  | 7/3 |
| 10 | Refactor and test | 7/3, 7/4 |
| 11 | Submit app and document  | 7/4 |

## Functionalities

### Timeline
- Clickable user
	- Profile image: `profile_image_url`, `profile_image_url_https`
	- Name: `user.name`
	- ID: `user.screen_name`
	- Verified: `user.verified`
- Tweet text: `text`
- Time: `created_at`, `timestamp_ms`
- Media

### Information 

- Hashtags (1+)
- Star Twitter (1) (based on tagged tweet count)
	- Clickable user
		- Profile image: `profile_image_url`, `profile_image_url_https`
		- Name: `user.name`
		- ID: `user.screen_name`
		- Verified: `user.verified`
- Topics 
	- Text
	- Count
	- Plot	
- Most Popular Media (based on RT and RE count)
	- Photo
	- Video

### (Future Features)
- Hotspot Map
- Responsiveness
- **Information** Consistency (See **Note**)

### Note
1. **Information** might not be the same if the app is open at different times because tweets are not stored according to current design.

## Wireframe

Dimension: 1024x768
![wireframe](wireframe.png)
[View it on Wireframe.cc](https://wireframe.cc/OPrqLi)
