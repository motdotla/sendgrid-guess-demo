# sendgrid-guess-demo

![](http://media.giphy.com/media/LTs4561v2flni/giphy.gif)

Demo of using SendGrid's Parse API with Pusher to change the background color. Copycatted from [Kunal](https://github.com/kunal732)'s excellent <http://hook.meteor.com>.

## Guide

[Create a SendGrid account](http://sendgrid.com).

```
cp .env.example .env
```

Edit .env with your credentials.

Visit <https://sendgrid.com/developer/reply> and set the following.

* Hostname: mot.webhook.email
* Url: https://mot.ngrok.com/inbound

Save it.

```
npm install
node app.js
ngrok -subdomain mot 3000
```

(don't have ngrok, [install it](https://ngrok.com))

Send an email to [hi@mot.webhook.email](mailto:hi@mot.webhook.email). Set the subject to a color - like 'red', or 'blue'.

Watch the background change colors.


## Approach

* Cmd + F1
* I'm with a cool API company called SendGrid.
* We make it easy to send and receive email from your applications.
* Rather than talk about it let me show you.
* **show sending** It's as easy as building a url and pasting it in your browser.
* We have libraries too.
* You can use this for signup emails, password resets, notifications, whatever you can imagine.
* But that's not all. We do receiving email too.
* Demo the receiving.
* Announce prize.
