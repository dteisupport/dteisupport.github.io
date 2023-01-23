function filterCards() {

  //show all cards
  cards = document.getElementsByClassName("activity-card-wrapper")
  for (i = 1; i < cards.length; i++){
    id = cards[i].id
    elmt = document.getElementById(id)
    elmt.style.display="";
  }

  csizeFilter = document.getElementById("Class-size-list")
  csizeChecks = csizeFilter.getElementsByTagName('input')

  interactionFilter = document.getElementById("interaction-list")
  interactionChecks = interactionFilter.getElementsByTagName('input')

  instructionFilter = document.getElementById("Instructional-Mode-list")
  instructionChecks = instructionFilter.getElementsByTagName('input')

  engagementFilter = document.getElementById("Engagement-list")
  engagementChecks = engagementFilter.getElementsByTagName('input')

  activityFilter = document.getElementById("Activity-Time-list")
  activityChecks = activityFilter.getElementsByTagName('input')

  prepFilter = document.getElementById("Prep-Time-list")
  prepChecks = prepFilter.getElementsByTagName('input')

  learningFilter = document.getElementById("Learning-list")
  learningChecks = learningFilter.getElementsByTagName('input')

  toolsFilter = document.getElementById("Digital-Tools-list")
  toolsChecks = toolsFilter.getElementsByTagName('input')

  const filterNames = ["Class Size:","Instructional Mode:", "Engagement:","Learning Strategy:", "Digital Tools or Programs Required:", "Type of Interaction", "Activity Time", "PREP TIME", "Synchronous"]
  const checkboxes = [csizeChecks, instructionChecks,engagementChecks, learningChecks, toolsChecks, interactionChecks, activityChecks, prepChecks]
  
  cards = document.getElementsByClassName("activity-card-wrapper")
  for (i = 1; i < cards.length; i++){
    txt = cards[i].textContent
    id = cards[i].id
    elmt = document.getElementById(id)
    

    for (j = 0; j<checkboxes.length; j++){
      fname = filterNames[j]
      boxes = checkboxes[j]


      temp = txt.split(fname)[1]
      content = temp.split(filterNames[j+1])[0]


      checks = [] //checked boxes
      for (x = 0; x < boxes.length; x++) {
        if (boxes[x].checked==true){
          checks.push(boxes[x].name)
        } 
      }

      for (x = 0; x < checks.length; x++){
        if (!content.includes(checks[x])){
          elmt.style.display="none";
        }
      }
    }
    
  }
     
}
