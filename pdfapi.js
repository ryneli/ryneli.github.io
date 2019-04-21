// If absolute URL from the remote server is provided, configure the CORS
// header on that server.
var url = './pdf/compressed.tracemonkey-pldi-09.pdf';

// Loaded via <script> tag, create shortcut to access PDF.js exports.
var pdfjsLib = window['pdfjs-dist/build/pdf'];

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

var pdfDoc = null,
    pageNum = 1,
    scale = 2.0,
    canvas = document.createElement('canvas'),
    targetElement = null,
    ctx = canvas.getContext('2d');

function pdfSetBackground(element) {
    console.log('pdfSetBackground %o', element);
    targetElement = element;
    /**
     * Asynchronously downloads PDF.
     */
    pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
        pdfDoc = pdfDoc_;
    
        // Initial/first page rendering
        renderPage(pageNum);
    });
}

/**
 * Get page info from document, resize canvas accordingly, and render page.
 * @param num Page number.
 */
function renderPage(num) {
  pageRendering = true;
  // Using promise to fetch the page
  pdfDoc.getPage(num).then(function(page) {
    var viewport = page.getViewport({scale: scale});
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    var renderTask = page.render(renderContext);

    // Wait for rendering to finish
    renderTask.promise.then(function() {
        // TODO(zhenqiangli): set bg.
        if (targetElement !== null) {
            if (targetElement.style.backgroundImage !== '') {
                targetElement.style.backgroundImage = '';
            } else {
                targetElement.style.backgroundImage = canvas.toDataURL('image/png');
            }
        }
    });
  });
}
