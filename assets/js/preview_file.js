{
    let generatePreview = function(){
        let preview = $('#Update-profile');
        preview.submit(function(e){
            // e.preventDefault();
            // console.log(preview.serialize(),preview.prop('action'));
            // $.ajax({
            //     type:"post",
            //     url:preview.prop('action'),
            //     data:preview.serialize(),
            //     success:function(data){
            //         console.log(data);
            //     },
            //     error:function(err){
            //         console.log("error",err);
            //     }
            // });
        })
    }
    generatePreview();
}