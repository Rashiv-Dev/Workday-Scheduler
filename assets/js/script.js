/*GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with time blocks for standard business hours
WHEN I view the time blocks for that day
THEN each time block is color-coded to indicate whether it is in the past, present, or future
WHEN I click into a time block
THEN I can enter an event
WHEN I click the save button for that time block
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist*/
$("#currentDay").text(moment().format('dddd MMMM Do YYYY'));

//Save Function
function plannerSave() {
 $(".saveBtn").on("click", function() {
   //Targets Parent of the buttons ID
   var planTime = $(this).parent().attr("id");
   //Targets siblings, aka other elements with the "planText" class.
   var planText = $(this).siblings(".planText").val();

   //Saves to local storage.
   localStorage.setItem(planTime, JSON.stringify(planText));
 });
}

//Load Function
function plannerLoad() {
$(".time-block").each(function () {
 //Targets id of the parent. This took the full 2 weeks!!!!
 var loadPlan = $(this).attr("id");
 //Pulls from local storage.
 var planLoad = localStorage.getItem(loadPlan);

 //Pulls into "planText" using the "planLoad" variable above.
 if (planLoad !== null) {
     $(this).children(".planText").val(planLoad);
 }
});
}

// Change textarea color based on time of day
function timeIsNow() {

 var currentTime = moment().hour();

 $(".time-block").each(function() {
   var currentHour = parseInt($(this).attr("id"));

   //Adds Royal Blue color to future classes
   if (currentHour > currentTime) {
     $(this).removeClass("present");
     $(this).removeClass("past");
     $(this).addClass("future");
   }
   //Adds Red to current hour for urgency
   else if (currentHour === currentTime) {
     $(this).removeClass("future");
     $(this).removeClass("past");
     $(this).addClass("present");
   } 
   //Grays out past hours
   else {
     $(this).removeClass("future");
     $(this).removeClass("present");
     $(this).addClass("past");
   };
 })
};

//Function Calls
plannerLoad();
plannerSave();
timeIsNow();