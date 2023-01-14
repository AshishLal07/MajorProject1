class ToggleLikes{


    constructor(toggleElement){
        console.log(toggleElement);
        this.toggler = toggleElement;
        this.toggleLike()
    }
    
    toggleLike(){
        $(this.toggler).click(function(e){
            
            e.preventDefault();
            let self = this;
            console.log($(self).attr('href'));
            $.ajax({
                type:'POST',
                url:$(self).attr('href'),

            }).done(function(data){
                console.log($(self).attr('data-likes'));
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                if(data.deleted){
                    likesCount -=1;
                }else{
                    likesCount +=1;
                }
                $(self).attr('data-likes',likesCount);
                $(self).text(`${likesCount} Likes`)
            }).fail(function(errData){
                console.log("error while completing the request")
            })
        });
    }




}