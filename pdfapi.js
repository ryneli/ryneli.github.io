// If absolute URL from the remote server is provided, configure the CORS
// header on that server.
var url = 'https://zhenqiang.li/pdf/zaijidulizhangjin.pdf';

// Loaded via <script> tag, create shortcut to access PDF.js exports.
var pdfjsLib = window['pdfjs-dist/build/pdf'];

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = './js/pdfjs-2.0.943-dist/build/pdf.worker.js';
var targetElement = null;

function pdfSetBackground(element) {
    console.log('pdfSetBackground %o', element);
    targetElement = element;
    /**
     * Asynchronously downloads PDF.
     */
    pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
        console.log('get pdfDoc_ %o', pdfDoc_);
        // Initial/first page rendering
        renderPage(pdfDoc_, 1 /** page number */);
    }, (e) => console.log('getDocument error %o', e));
}

/**
 * Get page info from document, resize canvas accordingly, and render page.
 * @param num Page number.
 */
function renderPage(pdfDoc, num) {
  pageRendering = true;
  // Using promise to fetch the page
  pdfDoc.getPage(num).then(function(page) {
    var viewport = page.getViewport(1.0),
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    console.log('renderPage done %o %o %o %o => init canvas', targetElement, page, canvas, viewport);

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    var renderTask = page.render(renderContext);

    // Wait for rendering to finish
    renderTask.promise.then(() => {
        console.log('renderPage done %o', targetElement);
        if (targetElement !== null) {
            if (targetElement.style.backgroundImage !== '') {
                console.log('renderPage done %o => empty', targetElement);
                targetElement.style.backgroundImage = '';
            } else {
                console.log('renderPage done %o %o %o => paper', targetElement, canvas, canvas.toDataURL('image/png'));
                targetElement.style.backgroundImage = `url("${canvas.toDataURL('image/png')}")`;
            }
        }
    }, (e)=> console.log(e));
  });
}
