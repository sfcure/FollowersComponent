({
	getRecordFollowers : function(component, recordId) {
		
    	var helper = this;    
     	
        helper.showSpinner( component );
        
        var action = component.get( 'c.getFollowers' );
		
        action.setParams( {'recordId' : recordId} );
        
        action.setCallback( helper, function( response ) {
        	
        	helper.hideSpinner( component );
			
            if ( component.isValid() && response.getState() === 'SUCCESS' ) {
                
                component.set('v.subscribersEntities', response.getReturnValue());
                console.log(response.getReturnValue().length > 0);
                component.set('v.isFollowersAvailable', response.getReturnValue().length > 0);
                
            } else {
                
                component.set('v.isFollowersAvailable', false);
                
                console.error( 'Error calling action "' + actionName + '" with state: ' + response.getState() );
                
            }
            
        });
                           
        $A.enqueueAction( action );
	},
                           
    showSpinner : function( component ) {

        $A.util.removeClass( component.find( 'spinner' ), 'slds-hide' );

    },

    hideSpinner : function( component ) {

        $A.util.addClass( component.find( 'spinner' ), 'slds-hide' );

    },
    
    navigateToRecord : function( recordId ) {

        console.log( 'Navigating to the record>> ' + recordId );

        var event = $A.get( 'e.force:navigateToSObject' );

        if ( event ) {

            event.setParams({
                'recordId' : recordId
            }).fire();

        } else if ( ( typeof sforce !== 'undefined' ) && ( typeof sforce.one !== 'undefined' ) ) {

            sforce.one.navigateToSObject( recordId );

        } else {

            window.location.href = '/' + recordId;

        }

    }
})