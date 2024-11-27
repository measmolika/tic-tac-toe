Real-time multiplayer Tic-Tac-Toe built with WebSockets for instant communication between players.
Redis Pub/Sub was used to synchronize game state across multiple clients.

### pre-requisites
```
node
redis
```
make sure redis is running 
or run redis using docker:
```docker run --name redis-server -p 6379:6379 -d redis```
