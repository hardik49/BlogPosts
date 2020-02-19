$(document).ready(function () {
  $("button[name=like], button[name=unlike]").click(function (e) {
    e.preventDefault();
    let btnId = this.id, count;
    if (btnId != "") {
      let pid = $("#postId" + btnId).val();
      let uid = $("#userId").val();
      $.ajax({
        url: "/user/like",
        type: "post",
        data: { postId: pid, userId: uid },
        datatype: "JSON"
      }).done(function (data) {
        if (data.status === true) {
          count = $("#count_" + btnId).text();
          $("#count_" + btnId).text(parseInt(count) + 1);
          $(`#${btnId}`).removeClass("btn-grey");
          $(`#${btnId}`).addClass("btn-blue");
        } else {
          count = $("#count_" + btnId).text();
          $("#count_" + btnId).text(parseInt(count) - 1);
          $(`#${btnId}`).removeClass("btn-blue");
          $(`#${btnId}`).addClass("btn-grey");
        }
      });
    }
  });
});