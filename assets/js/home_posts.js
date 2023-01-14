// using javaScript to stop reloading pages for every action , Jquery Ajax used to create new way
{
    // method to submit data for new post using ajax
    let createPost = function(){
        let newPostForm = $("#new-post-form");
        // console.log(newPostForm);
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/post/create',
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data);
                    let newPost = newPostDOM(data.data.post,data.data.name);
                    $('#posts-display-container > ul').prepend(newPost);
                    // deletePost($(' .delete-post-btn', newPost));
                    deletePost($('.delete-post-btn')[0]);
                    notySuccess("Post uploaded");
                    
                    // enable toggle like functionality like button on the post
                    console.log($('.toggle-like-button', newPost)[0]);
                    new ToggleLikes($('.toggle-like-button')[0]);
                    
                    
                },
                error: function(err){
                    console.log(err.resposeText)
                }
            })
        });
    }
    // method to create post inside DOM
    let newPostDOM = function(i,name){
        return `<li id="post-${i._id}">
                    <p class="user">
                    User: ${name }
                    </p>
                    <small> <a class="delete-post-btn" href="/post/destroy/${i._id}">Delete</a>
                    </small>
                    <small>
                         <a class="toggle-like-button" data-likes="${i.Like.length }" href="/likes/toggle/?id=${i._id}&type=Post">0 Likes</a>
                    </small>
                        
                    <p class="content">${i.content}</p>
                
                    <div class="post-comments-container">
                        
                            <form id="new-comment-form" action='/comment/create' method="post">
                                <Label for="new-comment-content">Comment: </Label>
                                <textarea name="content" id="new-comment-content" cols="30" rows="1" placeholder="Type here.." required></textarea>
                                <input type="hidden" value="${ i._id }" name="post">
                                <input type="submit" value="Add Comment">
                                
                            </form>
                        
                        <div class="post-comments-list">
                            <ul id="post-comment-${i._id}">
                            </ul>
                
                        </div>
                    </div>
                </li>
                `
    }
    // method to delete a post from DOM
    let deletePost = function(deleteLink){
       
        $(deleteLink).click(function(e){
            console.log(e);
            e.preventDefault();
            $.ajax({
                type:"get",
                url:$(deleteLink).prop('href'),
                success: function(data){
                    console.log(data);
                    $(`#post-${data.data.post_id}`).remove();
                    notySuccess("Post Deleted!");
                },
                error: function(error){
                    console.log(error.resposeText);
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



    createPost();
}