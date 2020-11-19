# Label Styling

```
// Basic format for label (Laura's styles)
{
  "name": "Label Format Name",
  "displaySpeciesAuthor": 0,
  "displayBarcode": 0,
  "columnCount": "2",
  "defaultStyles": "font-size:8pt",
  "defaultCss": "../../css/symb/labelhelpers.css",
  "customCss": "",
  "labelDiv": {
    "className": "label-md" // determines label size
  },
  "labelHeader": {
    "hPrefix": "Label Header Prefix",
    "hMidCol": 0,
    "midStr": "",
    "hSuffix": "Label Header Suffix",
    "style": "",
    "className": ""
  },
  "labelBlocks": [{
    "divBlock": {
      "className": "label-blocks",
      "style": "min-height: 100%; display: grid;", // for css grid
      "blocks": [{
          "divBlock": {
            "className": "label-top",
            "blocks": [{
                "fieldBlock": [{
                  "field": "fieldname",
                  "styles": [],
                  "className":""
                }]
              },
              {
                "fieldBlock": [
                  { "field": "fieldname", "prefix": "" },
                  { "field": "fieldname" }
                ]
              }
            ]
          }
        },
        {
          "divBlock": {
            "className": "label-middle",
            "blocks": [{
                "fieldBlock": [{
                  "field": "fieldname",
                  "styles": [],
                  "className":""
                }]
              },
              {
                "fieldBlock": [
                  { "field": "fieldname", "prefix": "" },
                  { "field": "fieldname" }
                ]
              }
            ]
          }
        },
        {
          "divBlock": {
            "className": "label-bottom",
            "blocks": [{
                "fieldBlock": [
                  { "field": "fieldname", "prefix": "" },
                  { "field": "fieldname" }
                ]
              },
              {
                "fieldBlock": [
                  { "field": "fieldname", "prefix": "" },
                  { "field": "fieldname" }
                ]
              }
            ]
          }
        }
      ]
    }
  }],
  "labelFooter": {
    "textValue": "Label Footer",
    "style": ""
  }
}

```

```
// Basic format for divBlock
{
  "divBlock": {
    "className": "",
    "style": "",
    "blocks": [
      { Object },
      { Object },
      { Object }
    ],
    "delimiter": " "
  }
}

// Basic format for fieldBlock (goes inside 'blocks' property of 'divBlock')
{
  "fieldBlock": [
    { "field": "fieldname", "className": "", "style": "" },
    { "field": "fieldname", "className": "", "style": "" }
  ],
}
```
