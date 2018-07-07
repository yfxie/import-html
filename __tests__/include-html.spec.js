import IncludeHTML from 'include-html';

const html = {
  'header.html': '<header></header>',
  'header-nav.html': '<header><!-- include navigation.html --></header>',
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

describe('IncludeHTML', () => {
  describe('.load', () => {
    test('basic usage', () => {
      document.body.innerHTML = "<!-- include header.html -->";
      return IncludeHTML.load().then(() => {
        expect(document.body.innerHTML).toEqual(html["header.html"]);
      });
    });
    
    test('include template with nested include', () => {
      document.body.innerHTML = "<!-- include header-nav.html -->";
      return IncludeHTML.load().then(() => {
        expect(document.body.innerHTML).toEqual('<header><nav></nav></header>');
      });
    });
  });
});


