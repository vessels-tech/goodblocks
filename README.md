



## remember to logout and login to firebase!


```bash
firebase logout
firebase login #login as lewis.daly@enabled.com.au for now
```


## deploying:

```bash
cd gb-web
npm run build
cd ..
firebase deploy --only hosting
```
