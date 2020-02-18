$(document).ready(function() {
  $("button[name=like], button[name=unlike]").click(function(e) {
    e.preventDefault();
    let btnId= this.id;
    if (btnId != "") {        
      let pid = $("#postId"+btnId).val();
      let uid = $("#userId").val();        
      $.ajax({
        url: "/user/like",
        type: "post",
        data: { postId: pid, userId: uid },
        datatype: "JSON"
      }).done(function(data) {
        if (data.status === true) {           
          $(`#${btnId}`).removeClass("btn-grey");
          $(`#${btnId}`).addClass("btn-blue");
        } else {
          $(`#${btnId}`).removeClass("btn-blue");
          $(`#${btnId}`).addClass("btn-grey");
        }
      });
    }
  });
});