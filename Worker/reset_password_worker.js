const Queue = require('../config/kue');

const ResetMailer = require('../mailer/reset_mailer');

// process function to the worker what job this function has to do

Queue.process('emails',function(jobs,done){
    console.log('Worker is processing the job',jobs.data);
    ResetMailer.resetPassword(jobs.data);

    done();
})