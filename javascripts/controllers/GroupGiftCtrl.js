'use strict';

app.controller("GroupGiftCtrl", function($scope, $location, $rootScope, $routeParams, EventFactory, GroupFactory){
	
  $scope.selectedGroup = {};
  var groupId = $routeParams.id;
  console.log("$routeParams", groupId);
  console.log("controller working");

  GroupFactory.getSingleGroup(groupId).then(function(oneGroup){
    oneGroup.id = groupId;
    $scope.selectedGroup = oneGroup;
    console.log("oneGroup", oneGroup);
  });

  $scope.doYouHaveAGift = function(gifts){
    GroupFactory.editGroup(gifts).then(function(response){
      console.log("gift checkmark response", response);
      $location.url('/people/gifts');
    });
  };

    $scope.addGroupToEvent = function(eventId){

  	console.log("what is the current value of this group id?");
    console.log(eventId);
    console.log(groupId);
    EventFactory.getSingleEvent(eventId).then(function(event){
      event.members.push(groupId);
      EventFactory.editEvent(event);
    });
  };

  GroupFactory.getGroupList($rootScope.user.uid).then(function(results){
    console.log("results from group gift ctrl", results);
    $scope.groups=results;
  });

  $scope.groups=[];

  EventFactory.getEventList($rootScope.user.uid).then(function(results){
    $scope.events=results;
  });
   $scope.events=[];


});