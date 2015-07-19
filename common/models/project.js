var _ = require('lodash');
var inspect = require('eyespect').inspector();

module.exports = function(Project) {

    Project.findByProjectName = function (name, cb) {
        Project.findOne({where: {project_name: name}}, function (err, instance) {
            cb(null, instance);
        });
    };

    Project.remoteMethod(
        'findByProjectName',
        {
            http: {path: '/findByProjectName', verb: 'get'},
            accepts: {arg: 'project_name', type: 'string', http: {source: 'query'}},
            returns: {arg: 'project', type: 'object'}
        }
    );


    Project.checkExisting = function (task_id, cb) {
        Project.findOne({where: {task_id: task_id}}, function (err, instance) {
            cb(null, _.extend(instance, {
                exists: !!instance
            }));
        });
    };

    Project.remoteMethod(
        'checkExisting',
        {
            http: {path: '/checkExisting', verb: 'get'},
            accepts: {arg: 'task_id', type: 'string', http: {source: 'query'}},
            returns: {arg: 'project', type: 'object'}
        }
    );
};
