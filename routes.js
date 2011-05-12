/**
 * @fileoverview Main routes for city-hero application
 */

controllers = require('./controllers');
 
/**
 * Class Set all router.
 * @param {object} App object (probably express)
 */
function set_routes(app) {
  
    // Home
    app.get('/', function(req, res) {
    
        // Facebook setup (this needs to be abstracted out)
        facebook = new app.custom.fbsdk.Facebook({
            appId: app.custom.auth.fb.appID,
            secret: app.custom.auth.fb.secret,
            request: req,
            response: res
        });
    
        res.render('home.view.ejs');
    });
    
    // Project add page
    app.get('/projects/add', function(req, res) {
        res.render('project-add.view.ejs');
    });

    // Project page (this is currently just an example)
    app.get('/projects/:pid', function(req, res) {
        controllers.Projects.get_project(req, res, function(err, context) {
            console.log('about to render!');
            console.log(context);
            res.render('project.view.ejs', context);
        });
    });
    
    app.post('/projects/add', function(req, res) {
        controllers.Projects.create_project(req, res, function(err, context) {
            res.redirect('/projects/'+context.id);
        });
    });
};

/* This is a simple combine method.  I don't know what pitfalls there are here
 * yet, I just want something that works.
 */
combine = function(/* context1, context2, ... */) {
    var combined_context = {},
        contexts = arguments,
        context_index,
        curr_context,
        key;
    
    for (context_index in contexts) {
        curr_context = contexts[context_index];
        //console.log(curr_context);
        for (key in curr_context) {
            combined_context[key] = curr_context[key];
        }
    }
    
    //console.log(combined_context);
    return combined_context;
}

// Publicize functions
exports.set_routes = set_routes;
