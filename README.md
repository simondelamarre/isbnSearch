# Search item with picture and price

This repo expose a basic way to get products informations from other websites.

### requirement

#### chromium

Note : You'll need to export your system chromium path 
export CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"


## OUTPUT data format

```script
[
    {
        label: "item label"
        description: "item description",
        price: "price string format with devise like : €23.99"
        link: "item link"
    }
]
```