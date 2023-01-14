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
                        
                        // enable toggle like functionality like button on the post
                        console.log($(' .toggle-like-button', newPost));
                         new ToggleLikes($(' .toggle-like-button', newPost));
                        
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
                         <a class=like-comment-btn" href="/like/toggle/?id=${comment._id}&type="Post"></a>
                         
                    </small>  
                    <small>
                        <a class="toggle-like-button" data-likes="<% = i.Like.length %>" href="/likes/toggle/?id=<%=i.id%>&type=Post">0 Likes</a>
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

    let likeComment = function(likeLink){
        console.log(likeLink);
        $(likeLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:"Post",
                url:$(likeLink).prop('href'),
                success:function(data){
                    let count = Number($(likeLink).firstChild().textContent);
                    if(data.deleted){
                        if(count > 0){
                            $(likeLink).firstChild().textContent = count - 1; 
                        }
                    }else{
                        $(likeLink).firstChild().textContent = count+1;
                    }
                }
            })
        });
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