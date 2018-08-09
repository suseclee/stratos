import { browser, by, element, ElementFinder, promise, protractor } from 'protractor';
import { ElementArrayFinder } from 'protractor/built';

import { Component } from './component.po';
import { MenuComponent } from './menu.po';

/**
 * Page Object for page header
 */
export class PageHeader extends Component {

  constructor() {
    super(element(by.tagName('app-page-header')));
  }
  private readonly until = protractor.ExpectedConditions;
  private readonly pageTitleSelector = '.page-header h1';

  getIconButtons(): ElementArrayFinder {
    return this.locator.all(by.css('.page-header button.mat-icon-button'));
  }

  getIconButton(iconName: string) {
    return this.getIconButtons().map(button => {
      return button.getText();
    }).then(icons => {
      const index = icons.findIndex(name => name === iconName);
      return this.getIconButtons().get(index);
    });
  }

  clickIconButton(iconName: string): promise.Promise<void> {
    return this.getIconButton(iconName).then(btn => btn.click());
  }

  hasIconButton(iconName: string): promise.Promise<boolean> {
    return this.getIconButton(iconName).then(btn => btn && btn.isDisplayed());
  }

  getTitle(): ElementFinder {
    const element = this.locator.element(by.css(this.pageTitleSelector));
    browser.wait(this.until.presenceOf(element), 20000);
    return element;
  }

  getTitleText(): promise.Promise<string> {
    return this.getTitle().getText();
  }

  logout(): promise.Promise<any> {
    return this.clickIconButton('more_vert').then(() => {
      browser.driver.sleep(2000);
      const menu = new MenuComponent();
      menu.waitUntilShown();
      menu.clickItem('Logout');
      browser.driver.sleep(2000);
      return browser.waitForAngular();
    });
  }

}
