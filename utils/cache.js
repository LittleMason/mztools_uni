var dtime = '_deadtime';
export default {
    set: function (t, r, a) {
        uni.setStorageSync(t, r);
        var n = parseInt(a);
        if (n > 0) {
            var o = Date.parse(new Date());
            o = o / 1000 + n;
            uni.setStorageSync(t + dtime, o + '');
        } else {
            uni.removeStorageSync(t + dtime);
        }
    },
    get: function (t, r) {
        var a = parseInt(uni.getStorageSync(t + dtime));
        if (a && parseInt(a) < Date.parse(new Date()) / 1000) {
            return r || void 0;
        }
        var n = uni.getStorageSync(t);
        return n || r;
    },
    remove: function (t) {
        uni.removeStorageSync(t);
        uni.removeStorageSync(t + dtime);
    },
    clear: function () {
        uni.clearStorageSync();
    }
};
