/**
 * helpers, etc.
 */
module.exports = {

    socket: null,

    parseJSON: function (str) {
        var obj;
        try {
            obj = JSON.parse(str || '');
        } catch (error) {
            obj = {error: error};
        }
        return obj;
    },

    slackurl: 'https://hooks.slack.com/services/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',

    ROOT_URL: 'http://0.0.0.0:3000/',

    API_URL: 'http://0.0.0.0:3000/api/projects/',

    maps: {
        "AltaIpsum-Frontend": 1,
        "alta-api": 2
    },

    getSocket: function(){
        return this.socket;
    },

    setSocket: function (sock) {
        return this.socket = sock;
    }

};
