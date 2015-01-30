# Carcassonne Counter

Carcassonne Counter is a Sinatra app using JavaScript that lets you keep tally of points in a game. Selecting the colors or your players generates counters for each player. Mobile-responsive and persisted.

## Roadmap

1. `/games` view to see all games in order of timestamp, including button
2. clean up schema and player counter so it isn't hardcoded
3. solve concurrency problem that is masked with setInterval ???
4. database cleanup in form of cronjob (new game created with each page load could be expensive)

### Longterm

1. optional OAuth to see your games
2. marketing to Carcassonne gamers :)
3. Abstraction into more than one type of game tally-ing functionality