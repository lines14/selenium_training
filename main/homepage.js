const BasePage = require('../main/basepage');

class HomePage extends BasePage{

    static async clickPrivacyPolicyButton(){
        await this.clickButtonByXpath("//div[@id = 'footer_text']//following-sibling::a[1]");
    }
}

module.exports = HomePage;