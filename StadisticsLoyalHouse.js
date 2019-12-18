var app = new Vue({
  el: '#app',
  data: {
    members: [],

    republicans: {
      "nameParty": "Republicans",
      "numberOfRepublicans": 0,
      "averageVotesWithPartyForRepublicans": 0,

    },
    "votes_with_party_R": 0,
    democrats: {
      "nameParty": "Democrats",
      "numberOfDemocrats": 0,
      "averageVotesWithPartyForDemocrats": 0,

    },
    "votes_with_party_D": 0,
    independents: {
      "nameParty": "independence",
      "numberOfIndependents": 0,
      "averageVotesWithPartyForIndependents": 0,
    },
    "votes_with_party_I": 0,
    leastEngagedNames: [],
    mostEngagedNames: [],

  },
  democratArray: [],
  independentstArray: [],
  republicanArray: [],
  diezPercent: 0,

});

$(function () {
  var senator
  var requrl = "https://api.propublica.org/congress/v1/113/house/members.json"
  var reqheader = {
    "headers": {
      "X-API-Key": "zh57iUFIsDuvLNAOz9VmSxvRaukJJt9Oz7Er7t48"
    }
  }
  fetch(requrl, reqheader)
    .then(res => res.json())
    .then(inf => {
      members = inf.results[0].members
      app.members = members
      calcularMiembros(members)
      filtroRep(members)
      filtroDem(members)
      filtroInd(members)
      promD(app.democratArray)
      promR(app.republicanArray)
      promI(app.independentsArray)
      MyStats()
      Engaged(members)


    })
    .catch(err => {
      console.log("hay un error", err)
    })
})

function calcularMiembros(members) {
  members.map(obj => {
    if (obj.party == 'D') {
      app.democrats.numberOfDemocrats++
    }
    if (obj.party == 'R') {
      app.republicans.numberOfRepublicans++
    }
    if (obj.party == 'I') {
      app.independents.numberOfIndependents++
    }
  })
}

// // guardo en variables todos los filtros de los party 

function filtroRep(members) {
  app.republicanArray = members.filter(members => members.party === "R");
}

function filtroDem(members) {
  app.democratArray = members.filter(members => members.party === "D");
}

function filtroInd(members) {
  app.independentsArray = members.filter(members => members.party === "I");
}

function promD(partido) {
  partido.forEach(members => {
    app.votes_with_party_D += members.votes_with_party_pct;
  });
}

function promR(partido) {
  partido.forEach(members => {
    app.votes_with_party_R += members.votes_with_party_pct;
  });
}

function promI(partido) {
  partido.forEach(members => {
    app.votes_with_party_I += members.votes_with_party_pct;
  });
}

function MyStats() {
  app.democrats.averageVotesWithPartyForDemocrats = Math.round(promedio(app.votes_with_party_D, app.democratArray));
  app.republicans.averageVotesWithPartyForRepublicans = Math.round(promedio(app.votes_with_party_R, app.republicanArray));
  app.independents.averageVotesWithPartyForIndependents = Math.round(promedio(app.votes_with_party_I, app.independentsArray));
}

function promedio(resultadoVoto, partido) {
  var totalPartido = partido.length
  var resultado = resultadoVoto / totalPartido
  if (totalPartido == 0 || resultadoVoto == 0) {
    resultado = 0
  }
  console.log(resultado)
  return resultado
}


function Engaged(members) {

  var diez = Math.round(members.length * 0.10)
  var leastVotes = members.sort((a, b) => (
    a.votes_with_party_pct - b.votes_with_party_pct
  ))
  app.leastEngagedNames = leastVotes.slice(0, diez);
  console.log(app.leastEngagedNames)
  var mostVotes = leastVotes.reverse();
  app.mostEngagedNames = mostVotes.slice(0, diez)

}
