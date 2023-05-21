# My Own Geo-based "Instagram"

These are the pictures show how the webpages look like.
You can register, log in and post what you want to post.

![alt text](https://i.imgur.com/8NhcDgs.jpg)

![alt text](https://i.imgur.com/I1iJBbN.jpg)

![alt text](https://i.imgur.com/BxTVb5G.jpg)

![alt text](https://i.imgur.com/2lTCMF2.jpg)


For the images posts, the webpage can distinguish people faces.

![alt text](https://i.imgur.com/Lx50WbW.jpg)

![alt text](https://i.imgur.com/vT49Dul.jpg)


(Frontend): a Cloud and React based Social Network

- Designed and implemented a geo-based social network web application with React JS.

- Implemented features for users to create and browse posts and support search nearby posts (Ant Design,
GeoLocation API and Google Map API.)

- Improved the authentication using token based registration/login/logout flow with React Router v4 and
server-side user authentication with JWT.


(Backend): a Geo-index and Image Recognition based Social Network

- Launched a scalable web service in Go to handle posts and deployed to Google Cloud (Google Kubernetes Engine) for better scaling.

- Used ElasticSearch (GCE) to provide geo-location based search functions such that users can search nearby posts within a distance (e.g. 200km)

- Utilized Google Dataflow to dump daily posts to a BigQuery table and perform offline analysis (keyword based spam detection)

- Used Google Cloud ML API and TensorFlow to train a face detection model and integrate with the Go service.


# Firelook
a LBS based Android App for users to post and search nearby events

1. Developed an Android App for users to post events and search nearby events based on keyword hashtags with Java, Android Studio and Google Firebase
2. Utilized Firebase realtime database and storage to store and manage user-created content including event titles, messages, locations and images
3. Integrated Google Map API for a quick display of nearby events and navigation to user selected location
4. Integrated Google AdMob for in-app advertising to improve user experience
5. Used Firebase Cloud Function (FCF) to subscribe to new post and send notification via Firebase Cloud Messaging (FCM) to app users


Preview:
Users can register an account and then login. The backend works are handled by Firebase. 
<p align="center">
  <img src="https://github.com/chen4393c/EventReporter/blob/master/screenshots/login.png" width="350" title="hover text">
</p>

Users can upload their event with an image.
<p align="center">
  <img src="https://github.com/chen4393c/EventReporter/blob/master/screenshots/upload.png" width="350" title="hover text">
</p>

Users can then review their posts.
<p align="center">
  <img src="https://github.com/chen4393c/EventReporter/blob/master/screenshots/review1.png" width="350" title="hover text">
  <img src="https://github.com/chen4393c/EventReporter/blob/master/screenshots/review2.png" width="350" alt="accessibility text">
</p>

Users can also check their locations where they uploaded the events.
<p align="center">
  <img src="https://github.com/chen4393c/EventReporter/blob/master/screenshots/map.png" width="350" title="hover text">
</p>

Adding some comments for each event is also available.
<p align="center">
  <img src="https://github.com/chen4393c/EventReporter/blob/master/screenshots/comment.png" width="350" title="hover text">
</p>

Users can receive a push notification as soon as they upload an event with a photo.
<p align="center">
  <img src="https://github.com/chen4393c/EventReporter/blob/master/screenshots/notification.png" width="350" title="hover text">
</p>
