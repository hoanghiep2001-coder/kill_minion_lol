
cc.Class({
    extends: cc.Component,

    properties: {
        duration: 0,
    },

    onLoad () {
        // handle move position from left to right 
        this.handleMovePosition();

        // handle Scale after 0.6s
        this.scaleBlink();
    },

    handleMovePosition() {
        // expected position: -75 / -60
        const _this = this.node;
        const position = cc.v2(-75, -60);
        const duration = 0.8;
        const moveAction = cc.moveTo(duration, position);
        _this.runAction(moveAction);
    },

    scaleBlink () {
        const _this = this.node;
        const delayAction = cc.delayTime(0.6);
        const duration = 0.6;
        const callFuncAction = cc.callFunc(function() {
            const scaleUp = cc.scaleTo(duration, 0.45);
            const scaleDown = cc.scaleTo(duration, 0.4);
            const blink = cc.sequence(scaleUp, scaleDown);
            _this.runAction(blink)
        }, this);

        const  sequenceAction = cc.sequence(delayAction, callFuncAction);
        _this.runAction(sequenceAction);
    },

    // update (dt) {},
});
