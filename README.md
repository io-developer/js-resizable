# resizable

Pure JS resizing for any binded DOM element.
You can mixin behavior with lib __js-dragndrop__

## Example
```html
<!doctype html>
<html>
<head>
    <script type="text/javascript" src="resizable.js"></script>
    <script type="text/javascript">
        resizable.initOnDocumentReady();
    </script>
    <style>
        .js-resizable {
            -moz-user-select: none;
            -o-user-select: none;
            -khtml-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        .js-resizable-corner {
            position: absolute;
            right: 0px;
            bottom: 0px;
            width: 10px;
            height: 10px;
            background: #000;
        }
        .outer {
            display: block;
            position: relative;
            width: 640px;
            height: 480px;
            margin: 20px;
            background-color: #EEE;
        }
        .inner {
            display: block;
            position: absolute;
            min-width: 100px;
            min-height: 50px;
            padding: 20px;
        }
        .inner--1 {
            left: 100px;
            top: 100px;
            width: 300px;
            height: 200px;
            background-color: #b1b1ff;
        }
        .inner--2 {
            left: 100px;
            top: 50px;
            background-color: #92f192;
        }
        .inner--3 {
            left: 400px;
            top: 200px;
            background-color: #ec7777;
        }
    </style>
</head>
<body>
    <div class="outer js-resizable-limiter">
        <div class="inner inner--1 js-resizable js-resizable-limiter">
            Content A
            
            <div class="inner inner--2 js-resizable">
                Sub-content A
            </div>
        </div>
        <div class="inner inner--3 js-resizable">
            Content B
        </div>
    </div>
</body>
</html>
```