function notifyMe() {
	var options = {
            body: "This is the time to leave for friday Prayes",
            icon: "icon.jpg",
            dir : "ltr"
         };
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }
  else if (Notification.permission === "granted") {
          var notification = new Notification("Hi there",options);
  }
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (!('permission' in Notification)) {
        Notification.permission = permission;
      }
    
      if (permission === "granted") {
        var notification = new Notification("Hi there",options);
      }
    });
  }
}