$(document).ready(function() {
  fetch('/candidates')
  .then(res => res.json())
  .then(res => {
    const candidatesTableHTML = res.candidates.map(function(candidate) {
      return `<tr><td>${candidate.name}</td><td id='${candidate.name}'>${candidate.votes}</td></tr>`;
    });

    $('#candidatesTable').html(candidatesTableHTML);
  }).catch(function(err) {
    // Error :(
  });

  $('#voteSubmit').click(function(event) {
    $('#voteSubmit').prop('disabled', true);
    $("#voteSubmit").removeClass("btn btn-primary").addClass("btn btn-warning");
    
    $("#voteSubmit").html('Voting..');
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    fetch('/vote', {
      method: 'post',
      headers: headers,
      body: JSON.stringify({ candidateName: $('#candidateName').val() }),
    })
    .then(res => res.json())
    .then(res => {
      $('#' + res.name).html(res.votes);
      $('#voteSubmit').prop('disabled', false);
      $("#voteSubmit").removeClass("btn btn-warning").addClass("btn btn-primary");
      $("#voteSubmit").html('Vote');
      $('#candidateName').val("");
    }).catch(function() {
      // Error
    });
  });
});

