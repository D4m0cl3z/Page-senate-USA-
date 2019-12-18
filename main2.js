$(function() {
    var senator
    var requrl = "https://api.propublica.org/congress/v1/113/house/members.json"
    var reqheader = {
        "headers": {
            "X-API-Key": "zh57iUFIsDuvLNAOz9VmSxvRaukJJt9Oz7Er7t48"
        }
    }
    fetch(requrl, reqheader)
        .then(res => res.json())
        .then(inf => {
            senator = inf.results[0].members
            app.senator = senator
        })
        .catch(err => {
            console.log("hay un error", err)
        })
})


var app = new Vue({
    el: '#app',
    data: {
        senator: []
    }
});