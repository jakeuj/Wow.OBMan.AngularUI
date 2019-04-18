import { OBManTemplatePage } from './app.po';

describe('OBMan App', function() {
  let page: OBManTemplatePage;

  beforeEach(() => {
    page = new OBManTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
