//사내용
var mcsConfig = {
    "logLevel": mcs.LOG_LEVEL.ERROR,
    "logHTTP": true,
    "oAuthTokenEndPoint": "https://idcs-4f17d54755df4b698b84d30191a87d33.identity.oraclecloud.com/oauth2/v1/token",
    "disableAnalyticsLocation": false,
    "mobileBackend": {
        "name": "mDAI",
        "baseUrl": "https://81BBCFEF17F642AB93973D87DA8C3C58.mobile.ocp.oraclecloud.com:443",
        "authentication": {
            "type": mcs.AUTHENTICATION_TYPES.oauth,
            "basic": {
                "mobileBackendId": "a50cdddb-974d-4845-840d-471a05acc7c6",
                "anonymousKey": "ODFCQkNGRUYxN0Y2NDJBQjkzOTczRDg3REE4QzNDNThfTW9iaWxlQW5vbnltb3VzX0FQUElEOjQ3MDlkYWY3LWEzNTEtNGIyMi04YmYwLTAwZmZlYmZiNDVlNQ=="
            },
            "oauth": {
                "clientId": "14b67f0d329b44449c387f83253c6d57",
                "clientSecret": "f63e5a1f-e79e-472b-935c-b7eb88f17803"
            },
            "facebook":{
                "appId": "YOUR_FACEBOOK_APP_ID",
                "mobileBackendId": "YOUR_BACKEND_ID",
                "anonymousKey": "ANONYMOUS_KEY",
                "scopes": "public_profile,user_friends,email,user_location,user_birthday"
            },
            "token":{
                "mobileBackendId": "a50cdddb-974d-4845-840d-471a05acc7c6",
                "anonymousKey": "ODFCQkNGRUYxN0Y2NDJBQjkzOTczRDg3REE4QzNDNThfTW9iaWxlQW5vbnltb3VzX0FQUElEOjQ3MDlkYWY3LWEzNTEtNGIyMi04YmYwLTAwZmZlYmZiNDVlNQ==",
                "clientId": "14b67f0d329b44449c387f83253c6d57",
                "clientSecret": "f63e5a1f-e79e-472b-935c-b7eb88f17803"
            }
        }
    }
 
};
