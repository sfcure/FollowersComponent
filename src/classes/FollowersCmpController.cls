public with sharing class FollowersCmpController {
	
    @AuraEnabled
    public static List<EntitySubscription> getFollowers(String recordId){
        
        String result = '';
        
        // Get list of all the EntitySubscription records 
        // associated with the passed recordId
        for(List<EntitySubscription> es : [
        	SELECT
            	Id, ParentId, SubscriberId, Subscriber.Name, Subscriber.FullPhotoUrl
            FROM
            	EntitySubscription
            WHERE
            	ParentId = :recordId
            ORDER BY
            	CreatedDate DESC
        ]){
        	return es;
        }
        
        return null;
    }
}