# DraftShark
Assist users in prepping for their fantasy sports drafts.  Users can use this application to rank players, keep running notes on players throughout their draft prep, and ultimately use this tool during their drafts to make decisions based on their research.

## Project Structure

### Server
    * GraphQL, NodeJS, and TypeScript
    * Found in the server folder

### Client
    * Angular 8
    * Found in the client folder

## Contributing

Clone the source locally:
```
$ git clone https://github.com/Jmurp11/ff-draft-prep.git
```

Create your feature branch:
```
$ git checkout -b feature/my-new-feature
```
Commit your changes:
```
$ git commit -m 'Add some feature'
```
   *  At this point, the unit tests and the linter will automatically run.  If either fail, your commit
      will be rejected.  Make the necessary changes and try again.
Push to the branch:
```
$ git push origin feature/my-new-feature
```
Submit a pull request

## Testing

### Server Tests
The server's unit tests are written using [Jest](https://jestjs.io/).  Make sure you are in the server folder and run:

```
$ npm test
```

### Client Tests
The client's unit tests are also written using [Jest](https://jestjs.io/).  In the client folder, run:
```
$ npm test
```

End to end tests using Selenium are a future task.

## Author
* Jim Murphy
