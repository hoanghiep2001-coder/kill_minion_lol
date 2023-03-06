// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        background: {
            default: null,
            type: cc.Node,
          },
          scoreLabel: {
            default: null,
            type: cc.Label,
          },
          lifeLabel: {
            default: null,
            type: cc.Label,
          },
          minions: {
            default: [],
            type: cc.Prefab
          },
          minionLayer: {
            default: null,
            type: cc.Layout
          },
          life: 0,
          score: 0,
          maxLife: 0,
          isLaunch: false,
    },

    start () {
        this.minionsCount = 0;
        const _this = this

        // run the game after 1s 
        _this.scheduleOnce(() => {
            _this.initGame();
        }, 1)

        // create minion to kill
        _this.node.on("minion_die", function(e) {
            _this.minionsCount--
        }, _this)

        _this.minionLayer.ndoe.setContentSize();
    },

    initGame: function() {
        this.life = this.maxLife
        this.score = 0;
        console.log(this.lifeLabel)
        this.lifeLabel.string = "x " + this.life ;
        this.isLaunch = true
    }
});
