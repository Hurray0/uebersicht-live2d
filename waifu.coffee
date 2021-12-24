command: ""

render: -> """
<head>
<script async src="./waifu/lib/waifu-tips.js"></script>
<script src="./waifu/lib/live2d.js"></script>
</head>
<body>
  <div class="waifu">
    <div class="waifu-tips"></div>
    <canvas id="live2d" width="280" height="250" class="live2d"></canvas>
    <div class="waifu-tool">
        <span class="fui-home"></span>
        <span class="fui-eye"></span>
        <span class="fui-chat"></span>
        <span class="fui-user"></span>
        <span class="fui-photo"></span>
        <span class="fui-info-circle"></span>
        <span class="fui-cross"></span>
    </div>
</div>
</body>
<script src="./waifu/lib/run.js.lib"></script>

"""

style: """
right: 20px
bottom: -5px

.live2d
  width: 180px;

"""


afterRender: (domEl) ->

refreshFrequency: false

update: (output, domEl) ->