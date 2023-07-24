"use strict";
class SliceMsgToLastMsg {
  constructor(arg) {
    // 所有待插入的消息数据
    this.msgs = "";
    // 是否正在分割消息数据
    this.sliceMsgIng = false;
    this.$ = arg;
    this.t = 70;
    this.msgCreateTime = false;
    this.stopAction = false;
  }
  addMsg(msg) {
    this.msgs += msg;
    if (this.sliceMsgIng === false) {
      this.sliceMsg();
    }
  }
  end() {
    this.stopAction = true;
  }
  sliceMsg() {
    if (this.stopAction === true) {
      return;
    }
    this.sliceMsgIng = true;
    let msg = this.msgs.slice(0, 1);
    this.$.updateLastMsg((lastMsg) => {
      if (this.msgCreateTime && this.msgCreateTime != lastMsg.create_time) {
        return;
      }
      this.msgCreateTime = lastMsg.create_time;
      lastMsg.content += msg;
    });
    this.$.showLastMsg();
    this.msgs = this.msgs.slice(1);
    if (this.msgs.length) {
      if (this.t) {
        setTimeout(() => {
          this.sliceMsg(this.msgs);
        }, this.t);
      } else {
        this.sliceMsg(this.msgs);
      }
    } else {
      this.sliceMsgIng = false;
    }
  }
}
exports.SliceMsgToLastMsg = SliceMsgToLastMsg;
