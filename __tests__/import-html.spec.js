import ImportHTML from 'import-html';

const html = {
  'header.html': '<header></header>',
  'header-nav.html': '<header><!-- import navigation.html --></header>',
  'footer.html': '<footer></footer>',
  'navigation.html': '<nav></nav>',
};

const xhrMockClass = () => {
  const object =  {
    open: jest.fn((_, file) => {
      object.response = html[file];
    }),
    send: jest.fn(() => setTimeout(() => {
      object.onload();
    })),
    setRequestHeader: jest.fn(),
  };
  return object;
};
window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);

describe('ImportHTML', () => {
  describe('.load', () => {
    test('basic usage', () => {
      document.body.innerHTML = "<!-- import header.html -->";
      return ImportHTML.load().then(() => {
        expect(document.body.innerHTML).toEqual(html["header.html"]);
      });
    });
    
    test('import template with nested import', () => {
      document.body.innerHTML = "<!-- import header-nav.html -->";
      return ImportHTML.load().then(() => {
        expect(document.body.innerHTML).toEqual('<header><nav></nav></header>');
      });
    });
  });
});


