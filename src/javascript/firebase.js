export class Server {
    static addToWatched(movieId) {
       return fetch(
          'https://movieapi-f5a1d-default-rtdb.firebaseio.com/watched.json',
          {
            method: 'POST',
              body: JSON.stringify(movieId),
              headers: {
                  'Content-Type': 'aplication/json'
              }          
           }).then(response => response.json()).then(data => console.log(data))
    }
    static addToQueue(movieId) {
        return fetch(
          'https://movieapi-f5a1d-default-rtdb.firebaseio.com/queue.json',
          {
            method: 'POST',
            body: JSON.stringify(movieId),
            headers: {
              'Content-Type': 'aplication/json',
            },
          },
        )
          .then(response => response.json())
          .then(data => console.log(data));
    }
}