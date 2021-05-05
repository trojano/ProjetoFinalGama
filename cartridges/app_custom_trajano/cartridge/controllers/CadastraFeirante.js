
'use strict';
​
var server = require('server');
​
server.get('Landing', server.middleware.https, function (req, res, next) {
    var URLUtils = require('dw/web/URLUtils');
    var actionUrl = URLUtils.url('CadastraFeirante-Subscribe').toString();
    var feiranteForm = server.forms.getForm('cadastro_feirante_form');

    feiranteForm.clear();

    res.render('cadastro_feirante_template', {
        actionURL: actionUrl,
        feiranteForm: feiranteForm
    });
    next();
});
​
server.post('Subscribe', server.middleware.https, function (req, res, next) {
   
    var feiranteForm = server.forms.getForm('cadastro_feirante_form');
   
    var customObjMgr = require('dw/object/CustomObjectMgr');
    var transaction = require('dw/system/Transaction');
    transaction.begin();
    
    try{
        var newSubscribe = customObjMgr.createCustomObject('FeiranteTrajano', feiranteForm.email.value);
        newSubscribe.custom.email = feiranteForm.email.value;
        newSubscribe.custom.nome = feiranteForm.name.value;
        newSubscribe.custom.telefone = feiranteForm.phone.value;



        res.render('cadastro_feirante_sucesso', {
            feiranteForm: feiranteForm
        });
    }catch(e) {
        
        transaction.rollback();
       }


   return next();
});

module.exports = server.exports();