# Node mailer api
<style>.red{color:red;}</style>
# The porpose of using it

This API enables customers to send messages via email directly from the website they are using, without having to switch to the email application. This streamlines the communication process and enhances the user experience.

# How to use it

using it is very simple actully but you should do some important things in you websit to make sure that the user enter the rigth data


- First: What should user enter?<span id="user"></span>
    1. the application must contain an text filed to enter username (<span class="red">*</span>required)
    2. also user must enter his/her email address (<span class="red">*</span>required)
    3. user should also enter his/her phone number (not required)
    4. finally the message which the user entered (<span class="red">*</span>required)
        - Notice message is in html form so you can process it to make it as you want

- Second: What kind of request you should send?
    
    server reseive **POST** request

- Thired: What should API reseive?

    API must reseive a json body like the following: 
    ```json
    {
    "to":"reseiverAddress@example.com",
    "subject":"Hello World!",
    "body":
        {   
            "username":"Service requester Name",
            "email":"ServiceRequesterMail@example.com",
            "phone":"01659678687",
            "message":"<h1>this is a test</h1>"
        }
    }
    ```
    * to must contain the website's owner email
    * subject the owner must specify it or let the user specifiy it 

        * Notice in gmail if the subject doesn't change it combine them to gether 
    * body contains what user fell previously <a href = "#user">click to show</a>

- Fourth: What the server will response with?

if the server sent the message successfully it will response with a json like the following 
```json
{ "msg": "mail sent" }
```
with status **200** _OK_
if the server didn't send the message it will response with a json like the following 
```json
{ "msg": "mail not sent"}
```
with status **200** _OK_

if some thing not expectly happend it will send `msg` with the error happend