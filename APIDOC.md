# Gate Keeper Documentation

## Endpoints: 

List of available endpoints:

- `GET /splitgate`
- `GET /videos`
- `POST /videos`
- `DELETE /videos`
- `PATCH /videos/:id`
- `GET /videos/:id`


&nbsp;
# 1. GET /splitgate

Request
- Headers:
```json
{
    "steamid": "string"
}
```

_Response (200 - Ok)_
```json
{
    "user": {
        "username": "string",
        "avatarUrl": "string",        
        "id": "string",
        "allTimeData": {
            "stats": {
            "points": "integer as string",
            "kills": "integer as string",
            "assists": "integer as string",
            "deaths": "integer as string",
            "suicides": "integer as string",
            "teabags": "integer as string",
            "meleeKills": "integer as string",
            "portalKills": "integer as string",
            "killsThruPortal": "integer as string",
            "damageDealt": "integer as string",
            "matchesPlayed": "integer as string",
            "wins": "integer as string",
            "losses": "integer as string",
            "wlPercentage": "string",
            "timePlayed": "string",
            "headshotsLanded": "integer as string",
            "collaterals": "integer as string",
            "headshotKills": "integer as string",
            "headshotAccuracy": "string",
            "shotsFired": "integer as string",
            "shotsLanded": "integer as string",
            "shotsAccuracy": "string",
            "kd": "string",
            "kad": "string",
            "killsPerMinute": "string",
            "killsPerMatch": "string",
            "medalDoubleKills": "integer as string",
            "medalTripleKills": "integer as string",
            "medalQuadKills": "integer as string",
            "medalQuintKills": "integer as string",
            "medalSexKills": "integer as string",
            "medalKillstreak1": "integer as string",
            "medalKillstreak2": "integer as string",
            "medalKillstreak3": "integer as string",
            "medalKillstreak4": "integer as string",
            "medalKillstreak5": "integer as string",
            "medalKillstreak6": "integer as string",
            "rankLevel": "integer as string",
            "rankXp": "integer as string",
            "progressionLevel": "integer as string",
            "teabagsDenied": "integer as string",
            "revengeKills": "integer as string",
            "portalsSpawned": "integer as string",
            "ownPortalsEntered": "integer as string",
            "oddballsPickedUp": "integer as string",
            "oddballKills": "integer as string",
            "oddballCarrierKills": "integer as string",
            "kingSlayers": "integer as string",
            "killsOnHill": "integer as string",
            "killsAsVIP": "integer as string",
            "hillsNeutralized": "integer as string",
            "hillsCaptured": "integer as string",
            "highestConsecutiveKills": "integer as string",
            "flagsReturned": "integer as string",
            "flagKills": "integer as string",
            "flagCarrierKills": "integer as string",
            "firstBloods": "integer as string",
            "enemyPortalsEntered": "integer as string",
            "enemyPortalsDestroyed": "integer as string",
            "enemyKillsOnHill": "integer as string",
            "distancePortaled": "integer as string",
            "allyPortalsEntered": "integer as string"
            }
        }
    }
}
```

_Response (401 - Unauthorized)_
```json
{
    "message": "Unauthorized"
}
```

_Response (404 - Not Found)_
```json
{
    "message": "Account Not Found"
}
```

# 2. GET /videos
_Response (200 - Ok)_
```json
[
    {   
        "id": "integer",
        "videoUrl": "string",
        "videoTitle": "string",
        "videoImg": "string"
    },
    ...
]
```

# 3. POST /videos
Request
- Body
```json
{ 
    "videoUrl": "string", 
    "videoTitle": "string", 
    "videoImg": "string"
}
```

_Response (201 - Created)_
```json
{
    "message": "Successfully added new video"
}
```

_Response (400 - Bad Request)_
```json
{
    "message": "Video url, Video title, and Video Image is required"
}
```

# 4. DELETE /videos
Request
- Url Query
```json
{
    "title": "string"
}
```

_Response (200 - Ok)_
```json
{
    "message": "Successfully delete <title> from videos"
}
```

_Response (404 - Not Found)_
```json
{
    "message": "Video Not Found"
}
```

# 5. PATCH /videos/:id
Request
- params
```json
{
    "id": "integer"
}
```
- body
```json
{
    "videoTitle": "string"
}
```

_Response (200 - Ok)_
```json
{
    "message": "Video title successfully updated!"
}
```

_Response (404 - Not Found)_
```json
{
    "message": "Video Not Found"
}
```

# 6. GET /videos/:id
Request
- params
```json
{
    "id": "integer"
}
```

_Response (200 - Ok)_
```json
{   
    "id": "integer",
    "videoUrl": "string",
    "videoTitle": "string",
    "videoImg": "string"
}
```

_Response (404 - Not Found)_
```json
{
    "message": "Video Not Found"
}
```

# Global Error
_Response (500 - Internal Server Error)_

```json
{
    "message": "Internal Server Error",
}
```