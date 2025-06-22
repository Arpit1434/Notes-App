# [Notes App](https://notes-app-arpit.vercel.app/) ![](public/logo192.png)
You can create your notes and save it to your account. You can create, update, and delete your notes.

This application was made in __React__ as frontend and deployed on __Vercel__. The backend uses __Express__ and is deployed on __Digital Ocean__. For the database, I have used MongoDB and deployed it on __MongoDB Atlas__.

The endpoints on the backend are as follows:
#### 1. api/auth

- __/createuser__\
method: POST\
headers: Content-Type: appplication/json\
body: name, email, password\
response: JWT

- __/login__\
method: POST\
headers: Content-Type: appplication/json\
body: email, password\
response: JWT

- __/getuser__\
method: POST\
headers: authtoken\
response: user

#### 2. api/notes

- __/fetchallnotes__\
method: GET\
headers: authtoken\
response: notes

- __/addnote__\
method: POST\
headers: Content-Type: appplication/json, authtoken\
body: title, description, tag\
response: note

- __/updatenote/:id__\
method: PUT\
headers: Content-Type: appplication/json, authtoken\
body: title, description, tag\
response: note

- __/deletenote/:id__\
method: DELETE\
headers: Content-Type: appplication/json, authtoken
