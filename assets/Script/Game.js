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
          minTempo: 0,
          maxTempo: 0,
          life: 0,
          score: 0,
          maxLife: 0,
          maxMinions: 3,
          isLaunch: false,
    },

    onLoad: function () {
        // const minionsCount = 0;
        // const delta = 0;
        const _this = this

        // run the game after 1s 
        _this.scheduleOnce(() => {
            _this.initGame();
        }, 1)

        // create minion to kill
        _this.node.on("minion_die", function(e) {
            minionsCount--
        }, _this)

        _this.minionLayer.node.setContentSize(_this.background.width, _this.background.height);
    },

    initGame: function() {
        this.life = this.maxLife
        this.score = 0;
        this.lifeLabel.string = "x " + this.life ;
        this.isLaunch = true
    },

    spawMinion: function(data) {
      if(this.isLaunch === false) {
        return;
      }

      if(this.minionsCount > this.maxMinions) {
        return;
      }

      this.delta += data;
      if(this.delta < 1) return;

      this.delta = 0;
      const minionLayer = this.minionLayer.node;
      const winsize = minionLayer.getContentSize();
      const minionAmount = this.minions.length - 1;

      const minion = cc.instantiate(this.minions[Math.ceil(minionAmount * Math.random())]);
      minion.setPosition(this.newMinionPosition());

      const tempo = Math.random() * this.maxTempo + this.minTempo;

      const _this = this;

      const moveby = cc.moveBy(tempo, 0, -winsize.height - 30);

      const sequence = cc.sequence(moveby, cc.removeSelf(true), cc.callFunc(function() {
        _this.minionsCount--;
      }, _this));

      minion.runAction(sequence);

      minionLayer.addChild(minion);

      this.minionsCount++;
    },

    newMinionPosition: function() {
      const winsize = this.minionLayer.node.getContentSize();

      const x = winsize.width * Math.random();
      const y = winsize.height - 100;

      return cc.v2(x,y)
    },

    update: function(data) {
      this.spawMinion(data)
    }
});
