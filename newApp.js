const PORT = 8000

const http = require('http')
const md5 = require('md5')
const moment = require('moment')

let answer

const server = http.createServer((req, res) => {

    let {url, method} = req

    let [notSure,
        path,
        one,
        two,
        three,
        four] = url.split('/')

    let emailMD5 = md5(one)

    let string = decodeURI(one)

    let charCount = string.length

    let arr = string.split(' ')

    let wordCount = arr.length

    let aveWordLength = Math.floor(charCount / wordCount)

    let year = one
    let month = two
    let day = three
    let DOB = year + month + day
    let age = moment(DOB, 'YYYYMMDD').fromNow()

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
                            res.end(`Not Found`)
                    }
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
