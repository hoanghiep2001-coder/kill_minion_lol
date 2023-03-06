// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    start () {
        this.node.on("touchend", function() {
            this.node.dispatchEvent(new cc.Event.EventCustom("minion_die", true))
            this.node.removeFromParent();
        })
    },
});
