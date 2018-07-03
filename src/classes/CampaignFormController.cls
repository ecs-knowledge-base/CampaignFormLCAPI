public class CampaignFormController {
    
    // Enable Server-Side (Apex code) visibility from Lightning Component
    @AuraEnabled
    public static Id SaveCampaignFormDetails(Campaign newCampaign) {
        // DML operation to save newCampaign Details
        insert newCampaign;
        return newCampaign.Id;
    }
}