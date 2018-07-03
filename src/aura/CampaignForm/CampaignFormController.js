({
    doSubmit: function (component) {

        // Call SaveCampaignFormDetails Apex method to save data in Campaign object and pass campaignForm as a parameter
        var campaignForm = component.get("v.campaignForm");
        // Create a one-time use instance of the SaveCampaignFormDetails action in the server-side controller
        var action = component.get("c.SaveCampaignFormDetails");
        // Pass the parameter to controller using .setParams{"parameterName":"parameterValue"}
        action.setParams({ newCampaign: campaignForm });
        // Example: name : component.find("name").get("v.value"),

        // Create a callback that is executed after the server-side action returns
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                // Alert the user with the value returned from the server
                // alert("From server: " + response.getReturnValue());
                // Fire an event here to trigger client-side notification when the server-side action is complete
                component.set("v.isDataSubmitted", 'True');
                var parentId = response.getReturnValue();
                component.set("v.campaignRecordId", parentId);
                // Call toast component
                var evt = $A.get("e.force:showToast");
                evt.setParams({
                    type: 'success',
                    title: 'Success',
                    duration: 3000,
                    message: 'The Campaign has been succesfully created'
                });
                evt.fire();
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                        // Call toast component
                        var evt = $A.get("e.force:showToast");
                        evt.setParams({
                            type: 'error',
                            title: 'Error',
                            message: errors[0].message,
                            duration: 8000
                        });
                        evt.fire();
                    }
                }
                else {
                    console.log("Unknown error");
                    // Call toast component
                    var evt = $A.get("e.force:showToast");
                    evt.setParams({
                        type: 'warning',
                        title: 'Ups!',
                        message: 'Unknown error',
                        duration: 5000
                    });
                    evt.fire();
                }
            }
        });

        // Optionally set storable, abortable, background flag here

        // A client-side action could cause multiple events, which could trigger other events and other server-side action calls

        // $A.enqueueAction adds the server-side action to the queue
        $A.enqueueAction(action);
    }
})
