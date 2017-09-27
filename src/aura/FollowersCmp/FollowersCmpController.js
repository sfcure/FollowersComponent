({
	doInit : function(component, event, helper) {
        
        var recordId = component.get( 'v.recordId' );
        
    	helper.getRecordFollowers(component, recordId);
	},
    
    handleUserClick : function( component, event, helper ) {
        
    	var clickedUserId = event.srcElement.getAttribute( 'data-userId' );

        helper.navigateToRecord( clickedUserId );   
    }
})