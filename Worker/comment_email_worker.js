const Queue = require('../config/kue');

const commetnMailer = require('../mailer/comment_mailer');

// process function to the worker what job this function has to do

Queue.process('emails',function(jobs,done){
    console.log('Worker is processing the job',jobs.data);
    commetnMailer.newComment(jobs.data);

    done();
})