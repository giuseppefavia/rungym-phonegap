/**
 * Created with JetBrains WebStorm.
 * User: a.demarchi
 * Date: 17/04/13
 * Time: 14.55
 * To change this template use File | Settings | File Templates.
 *
 */
app.views.dashboard = Backbone.View.extend({

    /** init view **/
    initialize: function() {
        console.log('initializing dashboard view');
    },

    /** dashboard event **/
    events: {
        'click #btnAllenamento':        'dashboard_training',
        'click #btnProfilo':            'dashboard_profile',
        'click #btnTrasferimento':      'dashboard_send',
        'click #btnLogout':             'dashboard_logout'
    },

    dashboard_training: function() {
        app.routers.router.prototype.activity();
    },
    dashboard_profile: function() {
        app.routers.router.prototype.profile();
    },
    dashboard_send: function() {
        app.routers.router.prototype.send();
    },
    dashboard_logout: function() {
        app.routers.router.prototype.logout();
    },

    /** render template **/
    render: function() {

        /** reload data **/
        if (typeof app.global.activitiesCollection === 'undefined') {  app.utils.loadActivities(); }
        if (typeof app.global.usersCollection === 'undefined') {  app.utils.loadUsers(); }
        if (typeof app.global.trainingsCollection === 'undefined') {  app.utils.loadTrainings(); }

        $(this.el).html(this.template({name :  app.global.usersCollection.at(0).get("first_name")}));
        if(app.global.trainingsCollection.length == 0) {
            this.$("#trasf").remove();
        }
        return this;
    },

    destroy_view: function() {
        this.undelegateEvents();
        $(this.el).removeData().unbind();
        this.remove();
        Backbone.View.prototype.remove.call(this);
        app.global.dashboardView = null;
    }
});
