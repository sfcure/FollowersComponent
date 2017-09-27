@isTest
private class FollowersCmpControllerTest {
    
    @isTest
    static void test_getFollowers() {
    
        Account acct = new Account(
            name = 'Test Account'
        );

        insert acct;
        
        User u = [SELECT Id FROM User LIMIT 1];
        
        Test.startTest();
        
        List<EntitySubscription> entitySubscriptions = null;
        
        entitySubscriptions = FollowersCmpController.getFollowers( acct.Id );
        System.assertEquals( 0, entitySubscriptions .size() );
        
        EntitySubscription es = new EntitySubscription(
            ParentId = acct.Id,
            SubscriberId = u.Id
        );
        
        insert es;
        
        entitySubscriptions = FollowersCmpController.getFollowers( acct.Id );
        System.assertEquals( 1, entitySubscriptions .size() );
        
        Test.stopTest();
        
    }
}