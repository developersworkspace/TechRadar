import { TechradarPage } from './app.po';

describe('techradar App', function() {
  let page: TechradarPage;

  beforeEach(() => {
    page = new TechradarPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
