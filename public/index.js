

$(document).ready(function () {
  refreshBlocks();
});


$(document).ready(function () {
  $("img").click(function () {
    alert(this.id);

    if (this.id == 'buttonRama') {
      var candidateName = "Rama";
      processVote(candidateName);
    }
    if (this.id == 'buttonPhil') {
      var candidateName = "Phil";
      processVote(candidateName);
    }
    if (this.id == 'buttonYangli') {
      var candidateName = "Yangli";
      processVote(candidateName);
    }
  });

});


function processVote(candidateName) {
  alert("processVote " + candidateName);
  const headers = new Headers({
    "Content-Type": "application/json",
  });
  fetch('/vote', {
    method: 'post',
    headers: headers,
    body: JSON.stringify({ candidateName: candidateName }),
  })
    .then(res => res.json())
    .then(res => {
      if (res.name == "Rama") {
        $('#votesRama').html(res.votes);

      }
      if (res.name == "Phil") {
        $('#votesPhil').html(res.votes);
      }
      if (res.name == "Yangli") {
        $('#votesYangli').html(res.votes);
      }
      refreshBlocks();
    })
}

function refreshBlocks() {
  fetch('/getBlocks')
    .then(res => res.json())
    .then(res => {
      console.log("refreshBlocks");
      $("#blocks").html("");
      $.each(res.blocks, function (index, block) {
        if (block != null) {
          var hash = block.hash;
          $('#blocks').append("<div class='block'><div class='blocknumber'>Block Number: " +
            +block.number +
            "</div><div>Txn:<span class='txn'>" +
            +hash +
            "</span></div><div>Gas usage:" +
            +block.gasUsed +
            "</div><div>Block Time: " +
            +block.timestamp +
            "</div></div>");
          console.log(block.hash);
        }
      });
    });
}

