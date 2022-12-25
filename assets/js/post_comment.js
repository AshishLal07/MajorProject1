// using javaScript to stop reloading pages for every action , Jquery Ajax used to create new way

{
    // method to submit data for new Comment using ajax
    let createComment = function(){
        let newCommentForm = $('.post-list');
        // console.log($('.post-list'));
        newCommentForm.click(function(e){
            
            // e.preventDefault();
            if(e.target.type == "submit"){
                console.log($(e.target).parent());
                e.preventDefault();
                let form = $(e.target).parent();
                // console.log(form.serialize());
                
                $.ajax({
                    type:'POST',
                    url:form.prop('action'),
                    data:form.serialize(),
                    success: function(data){
                        console.log(data);
                        
                        let newComment = newCommentDOM(data.data.comment,data.data.name);
                        $(`#post-comment-${data.data.comment.Post}`).prepend(newComment);
                        deleteComment($(' .delete-comment-btn',`#post-comment-${data.data.comment.Post}`)[0]);
                        notySuccess("Comment Uploaded!");
                        console.log( $(' .delete-comment-btn',`#post-comment-${data.data.comment.Post}`));
                    },
                    error: function(err){
                        console.log(err.responseText);
                    }
                })
                
            }
           
        })

    }

     // method to create comment inside DOM
    let newCommentDOM = function(comment,name){
        return `<li id="comment-${comment._id}" >
                    <p>${ comment.content }</p>
                    <small>
                        ${name}
                    </small>
                    <small>
                         <a class="delete-comment-btn" href="/comment/destroy/${ comment._id }">Delete</a>
                    </small>  
                 </li>`
    }

     // method to delete comment from DOM
    let deleteComment = function(deleteLink){
        console.log(deleteLink);
        $(deleteLink).click(function(e){
            
            e.preventDefault();
            $.ajax({
                type:'GET',
                url: $(deleteLink).prop('href'),
                success:function(data){
                    console.log(data);
                    $(`#comment-${data.data.comment_id}`).remove();
                    notySuccess("Comment Deleted!");
                },
                error:function(err){
                    console.log(err.responseText);
                }
            })
        })
// 
    }

    let notySuccess = function(flash){
                
        new Noty({
            theme:'relax',
            text: flash,
            type: "success",
            Layout: "topRight",
            timeout: 1500
        }).show();
}

    createComment();
}