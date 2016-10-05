const PORT = 8000

const http = require('http')
// const qs = require('querystring')
const md5 = require('md5')
const moment = require('moment')

// GET /foods ---> retrieve all foods
// POST /foods$food=banana ---> create a new food

// 1. Set up maths /math/add/40/16  DONE
// 2. Gravatar URL Generator DONE
// Example: GET /gravatar/c@codinghouse.co would respond with the string
// "http://www.gravatar.com/avatar/c417050fa67e3d2e9b690636c2ce80ec
// 3. Sentence info DONE
// 4. Time since DOB  DONE

let answer
const server = http.createServer((req, res) => {
    // req === request obj received
    // res === response obj - methods for responding

    let {url, method} = req

    console.log(`${method} ${url}`)

    console.log('Hello');

    let [notSure,
        path,
        one,
        two,
        three,
        four,
        five] = url.split('/')

    console.log('notSure', notSure, 'path', path, 'one', one, 'two', two, 'three', three)

    let emailMD5 = md5(one)
    console.log(emailMD5)

    let string = decodeURI(one)
    console.log('string', string);

    let charCount = string.length
    console.log('charCount', charCount);

    let arr = string.split(' ')
    console.log('arr',arr)

    let wordCount = arr.length
    console.log('wordCount',wordCount);

    let aveWordLength = Math.floor(charCount / wordCount)
    console.log('aveWordLength', aveWordLength);

    let year = one
    let month = two
    let day = three
    let DOB = year + month + day
    let age = moment(DOB, "YYYYMMDD").fromNow();
    console.log('You were born', age);

    switch (path) {
        case 'math':

            switch (method) {
                case 'GET':

                    switch (one) {
                        case 'add':
                            answer = parseInt(two) + parseInt(three);
                            res.end(JSON.stringify(answer));
                            break;
                        case 'subtract':
                            answer = parseInt(two) - parseInt(three);
                            res.end(JSON.stringify(answer));
                            break;
                        case 'multiply':
                            answer = parseInt(two) * parseInt(three);
                            res.end(JSON.stringify(answer));
                            break;
                        case 'divide':
                            answer = parseInt(two) - parseInt(three);
                            res.end(JSON.stringify(answer));
                            break;
                        case 'exponent':
                            answer = Math.pow(parseInt(two), parseInt(three));
                            res.end(JSON.stringify(answer));
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

        case 'gravatar':

            switch (method) {
                case 'GET':
                  console.log(`http://www.gravatar.com/avatar/${emailMD5}`);
                  res.end(`http://www.gravatar.com/avatar/${emailMD5}`);
                  break;

                default:
                    res.statusCode = 404
                    res.end('Not Found')

            }
            break

        case 'sentence':

            switch (method) {
                case 'GET':
                  console.log(`Word Count: ${wordCount}, Character Count: ${charCount}, Average Word Length: ${aveWordLength}.`);
                  res.end(`Sentence info - Word Count: ${wordCount}, Character Count: ${charCount}, Average Word Length: ${aveWordLength}.`);
                  break;

                default:
                    res.statusCode = 404
                    res.end('Not Found')

            }
            break

        case 'age':

            switch (method) {
                case 'GET':
                  res.end(`You were born ${age}`);
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
})

server.listen(PORT, err => {
    console.log(err || `Server listening on port ${PORT}`)
})
