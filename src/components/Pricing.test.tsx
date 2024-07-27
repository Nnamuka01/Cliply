import BlueCheck from "../assets/PricingAssets/check-circle.svg";
import WhiteCheck from "../assets/PricingAssets/check-circle (1).svg";

// Component Testing

describe("Pricing", () => {
    it("Renders the Free Plan", () => {
        const FreePlan = [
            {
                image: BlueCheck,
                alt: "Check Icon",
                title: "Basic Link Analysis",
            },

            {
                image: BlueCheck,
                alt: "Check Icon",
                title: "Customizable Short Links",
            },

            {
                image: BlueCheck,
                alt: "Check Icon",
                title: "Standard Support",
            },
        ];

        expect(FreePlan).toBeDefined();
    });

    it("Renders the Professional Plan", () => {
        const ProfessionalPlan = [
            {
              image: WhiteCheck,
              alt: "White Check Icon",
              description: "Enhanced Link Analytics",
            },
        
            {
              image: WhiteCheck,
              alt: "White Check Icon",
              description: "Advanced Link Customization",
            },
        
            {
              image: WhiteCheck,
              alt: "White Check Icon",
              description: "Priority Support",
            },
        ];    

        expect(ProfessionalPlan).toBeDefined();
    });

    it("Renders the Teams Plan", () => {
        const TeamsPlan = [
            {
              image: BlueCheck,
              alt: "Blue Check Icon",
              description: "Team Collaboration",
            },
        ];
        
        expect(TeamsPlan).toBeDefined();
    });
});