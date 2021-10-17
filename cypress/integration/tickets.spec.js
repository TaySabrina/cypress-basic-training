describe("Tickets", () => {
    beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"));
    
    it("fills all the text input fields", () =>{
        const firstName = "Tayse";
        const lastName = "Sabrina";

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("tayse.paiva@iteris.com.br");
        cy.get("#requests").type("Carnívora");
        cy.get("#signature").type(`${firstName} ${lastName}`);
    });

    it("select two tickets", () => {
        cy.get("#ticket-quantity").select("2");
    });

    it("select 'vip' ticket type", () =>{
        cy.get("#vip").check();
    });

    it("selects 'social media' checkbox", () =>{
        cy.get("#social-media").check();
    });

    it("selects 'friend' and 'publication', then uncheck 'friend'", () => {
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#friend").uncheck();

    });

    it("has 'TICKETBOX' header's heading", () =>{
        cy.get("header h1").should("contain", "TICKETBOX");
    });

    it("alerts on invalid email", () =>{
        cy.get("#email")
            .as("email")
            .type("tayse.paiva-iteris.com.br");

        cy.get("#email.invalid")
            .as("invalidEmail")
            .should("exist");

        cy.get("@email")
            .clear()
            .type("tayse.paiva@iteris.com.br");

        cy.get("#email.invalid")
            .as("invalidEmail")
            .should("not.exist");
    });


    it("putting it all together, and then reseting it all", () => {
        const firstName = "Tayse";
        const lastName = "Sabrina";
        const fullName = `${firstName} ${lastName}`;

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("tayse.paiva@iteris.com.br");
        cy.get("#ticket-quantity").select("2");
        cy.get("#vip").check();
        cy.get("#friend").uncheck();
        cy.get("#requests").type("Wine");
        cy.get("#signature").type(fullName);

        cy.get(".agreement p")
            .should("contain", `I, ${fullName}, wish to buy 2 VIP tickets.`);

        cy.get("#agree").click();
        cy.get("#signature").type(fullName);
        cy.get("button[type='submit']")
            .as("submitButton")
            .should("not.be.disabled");

        cy.get("button[type='reset']")
            .as("resetButton")
            .click();
        
        cy.get("@submitButton").should("be.disabled");
    });

    it.only("fills mandatory fields using support command", () =>{
        const customer = {
            firstName: "John",
            lastName: "Martin",
            email: "john.martin@exemple.com"
        };

        cy.fillMandatoryFields(customer);

        cy.get("button[type='submit']")
            .as("submitButton")
            .should("not.be.disabled");

        cy.get("#agree").uncheck();

        cy.get("@submitButton").should("be.disabled");
    });
        
});