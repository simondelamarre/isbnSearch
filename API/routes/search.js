const Nick = require("nickjs")
const nick = new Nick()
/* SAMPLE NICK LOG */
async function search(label) {
    if (!label) {
        return "Need a search label";
    }
    return (async () => {
        const tab = await nick.newTab()
        await tab.open(`https://www.google.fr/search?psb=1&tbm=shop&q=${label}`)
        await tab.untilVisible("#main") // TEST PAGE LOAD DISPLAYED
        await tab.inject("http://code.jquery.com/jquery-3.2.1.min.js") // TODO : JQUERY SELECTOR TO REPLACE BY NATIVE JS QUERY SELECTOR
        const itemList = await tab.evaluate((arg, callback) => {
            // INSPECTOR
            const data = []
            $(".sh-dlr__list-result").each((index, element) => {
                data.push({
                    image: $(element).find('.sh-dlr__thumbnail img').attr('src'),
                    label: $(element).find("h3").first().text(),
                    url: $(element).find("a").first().attr("href"),
                    price: $(element).find(".h1Wfwb.O8U6h").first().text()
                })
            })
            callback(null, data)
        })
        // console.log(JSON.stringify(itemList, null, 2));
        return Promise.resolve(itemList);
    })()
        .then((e) => {
            console.log("Job done! ", e.length);
            // nick.exit()
            return e;
        })
        .catch((err) => {
            console.log(`Something went wrong: ${err}`);
            // nick.exit(1)
            return err;
        });
};

module.exports.search = search;