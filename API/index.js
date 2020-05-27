
const http = require('http');
const log4js = require('log4js');
const search = require('./routes/search');
log4js.configure({
    appenders: { cheese: { type: "file", filename: "cheese.log" } },
    categories: { default: { appenders: ["cheese"], level: "error" } }
});
const logger = log4js.getLogger('cheese');
const server = http.createServer(async function (req, res) {
    logger.info(req.url);

    res.setHeader("Access-Control-Allow-Origin", "*");

    let params = req.url.split('/');
    if (!params[1]) params[1] = "";
    switch (`/${params[1]}`) {
        case '/':
            res.write('Welcome to http node.js');
            break;
        case '/search':
            let describe = {
                label: params[2]
            }
            let results = await search.search(describe.label);
            res.write(JSON.stringify(results));
            break;
        default:
            var routeNotFound = 'The following route was not found ';
            res.write('404 PAGE NOT FOUND');
            logger.error(routeNotFound.concat(req.url));
    }
    res.end();
});

server.listen(3939);
console.log('Server is running on port 3939');