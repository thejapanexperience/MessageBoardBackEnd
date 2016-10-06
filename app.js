const PORT = 8000

const http = require ('http')
const uuid = require ('uuid')
const moment = require ('moment')
const body = require ('body')
const fs = require ('fs')
const anyBody = require('body/any');


const filename = 'data.json'

const server = http.createServer((req, res) => {
  let { url, method } = req

  console.log(`${method} ${url}`);
  console.log('Hello');

  let [notSure, path, messageNumber, two, three] = url.split('/');
  console.log(path, messageNumber, two, three);

  let messages
  let newMessageBody

  function _readMessages(callback) {
   fs.readFile(filename, (err, buffer) => {
    messages = JSON.parse(buffer)
    console.log('messages', messages);
    callback()
    })
  }

  function _writeMessages(callback) {
    anyBody(req, (err, body) => {
      newMessageBody = body
      console.log('body:', newMessageBody);
      fs.readFile(filename, (err, buffer) => {
        messages = JSON.parse(buffer)
        console.log('messages', messages);
        console.log('in POST',messages, newMessageBody)
        newMessageBody.timestamp = moment().format('LLLL');
        console.log(newMessageBody);
        newMessageBody.id = uuid();
        console.log(newMessageBody);
        messages.push( newMessageBody );
        fs.writeFile(filename, JSON.stringify(messages), err => {
            console.log('done!');
          })
      callback()
    });
  })}

  function _editMessages(callback) {
    anyBody(req, (err, body) => {
      newMessageBody = body
      console.log('body:', newMessageBody);
      fs.readFile(filename, (err, buffer) => {
        messages = JSON.parse(buffer)
        console.log('messages', messages);
        if (messageNumber > messages.length || messageNumber < 1) {
          res.statusCode = 404
          res.end('Not Found')
        } else {
          console.log('in PUT',messages, newMessageBody)
          messages[messageNumber-1].message = newMessageBody.message
          messages[messageNumber-1].author = newMessageBody.author
          messages[messageNumber-1].timestamp = moment().format('LLLL');
          fs.writeFile(filename, JSON.stringify(messages), err => {
            console.log('done!');
          })
      callback()
    }
  })})}

  function _deleteMessages(callback) {
    anyBody(req, (err, body) => {
      newMessageBody = body
      console.log('body:', newMessageBody);
      fs.readFile(filename, (err, buffer) => {
        messages = JSON.parse(buffer)
        console.log('messages', messages);
        if (messageNumber > messages.length || messageNumber < 1) {
          res.statusCode = 404
          res.end('Not Found')
        } else {
          console.log('in DELTE',messages, newMessageBody)
          messages.splice(messageNumber-1, 1)
          fs.writeFile(filename, JSON.stringify(messages), err => {
            console.log('done!');
          })
      callback()
    }
  })})}

  switch (path) {

    case 'messages':

      switch(method) {

        case 'GET':

          switch (messageNumber) {

            case undefined:
            case "":
              _readMessages(() => {
                res.end(JSON.stringify(messages))
              })
              break;

            case `${messageNumber}` :
            _readMessages(() => {
              console.log(messageNumber);
              let index = parseInt(messageNumber) - 1
              console.log(messages);
              res.end(JSON.stringify(messages[index]))
            })
              break;

            default:
              res.statusCode = 404
              res.end('Not Found')
              break
          }
          break;

        case 'POST':
          _writeMessages(() => {

              res.end(JSON.stringify(messages))
            })
          break;

        case 'PUT':

          switch (messageNumber) {

            case `${messageNumber}` :

            _editMessages(() => {
                res.end(JSON.stringify(messages[messageNumber-1]))
              })
            break;

            default:
              res.statusCode = 404
              res.end('Not Found')
          }
          break


        case 'DELETE':
        switch (messageNumber) {

          case `${messageNumber}` :

          _deleteMessages(() => {
              res.end(JSON.stringify(messages))
            })

          break;

          default:
            res.statusCode = 404
            res.end('Not Found')
        }
        break

        default:
          res.statusCode = 404
          res.end('Not Found')
      }
      break
    default:
      res.statusCode = 404
      res.end('Not Found')
  }
})


server.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
})
