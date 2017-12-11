

$(document).ready(function () {
  fetch('/candidates')
    .then(res => res.json())
    .then(res => {
      console.log(res);
      $.each(res.candidates, function (index, candidate) {
        //console.log(candidate.name + "   " + candidate.votes);
        if ("Rama" === candidate.name) {
          $('#votesRama').html(candidate.votes);
        }
        if ("Phil" === candidate.name) {
          $('#votesPhil').html(candidate.votes);
        }
        if ("Yangli" === candidate.name) {
          $('#votesYangli').html(candidate.votes);
        }
      });
    });


  $("img").click(function () {
    //alert(this.id);

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
})

function processVote(candidateName) {
  //alert("processVote " + candidateName);
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
    })
}

