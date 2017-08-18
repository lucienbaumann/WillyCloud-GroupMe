var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/groupme');

var path = require('path'),
    Group = mongoose.model('Group'),
    User = mongoose.model('User'),
    Bot = mongoose.model('Bot');
    //errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req);
    var request = require('request');
    var accesstoken = req.query.access_token;
    var userInfo = `https://api.groupme.com/v3/me?token=${accesstoken}`;
    var me;
    var groupInfo = `https://api.groupme.com/v3/groups?token=${accesstoken}`;

    request(userInfo, function (error, response, body) {
        me_json = JSON.parse(body).response;
        me = User.findOrCreate({groupme_user_id: me_json.id});
    });

    request(groupInfo, function (error, response, body) {
       console.log(response);
       console.log(body);
       body_json = JSON.parse(body).response;

       var groups = [{}];

       for(var i = 0; i< body_json.length; i++){
           console.log(body_json[i]);
           var new_group = {'groupme_group_id': body_json[i].group_id, 'name': body_json[i].name, 'image': body_json[i].image_url};
           console.log('======= heres a new group =======');
           console.log(new_group);
           group = Group.findOrCreate({groupme_group_id: new_group.groupme_group_id}, function (err, group, created) {
               if (err){
                   console.log(err);
               }
               else if (!created){
                   new_group['has_bot'] = !(group.bot == null);
                   console.log('group has bot');
                   //if the group has been seen before, check whether it has a bot already.
               }
               else{
                   new_group['has_bot'] = false;
                   console.log('group has no bot');
               }
           });

           //clean up--add some other info to db (we add regardless of creation since we want them to be up to date).
           group.name = new_group.name;
           group.image = new_group.image;

           groups.push(new_group);
       }
       //Should probably remove some of the group info that is sent to the html
        res.render('auth_success', { title: 'Express', groups: groups });
    });

});

module.exports = router;
