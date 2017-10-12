import { RotasPage } from './app.po';

describe('rotas App', () => {
  let page: RotasPage;

  beforeEach(() => {
    page = new RotasPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
