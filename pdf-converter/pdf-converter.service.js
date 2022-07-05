const path = require( 'path' );
const fs = require( 'fs' );
const lambdafs = require( 'lambdafs' );
const { execSync } = require( 'child_process' );
const util = require( 'util' );

const Pizzip = require('pizzip');
const DocxTemplater = require('docxtemplater');

const inputPath = path.join( '/opt/nodejs', 'lo.tar.br' );
const outputPath = '/tmp/';
const dateNow = ( new Date() ).getTime();
const fileName = `${dateNow}`;
const dirName = `/tmp/dir-${fileName}`;
const writeFilePromisified = util.promisify( fs.writeFile )

async function convertToPDF(docxBuffer) {
    await lambdafs.inflate( inputPath )

    fs.mkdirSync( dirName, { recursive: true } );
    fs.createWriteStream( `${outputPath}${fileName}` );

    await writeFilePromisified( `${outputPath}${fileName}.docx`, docxBuffer );

    execSync( 'export HOME=/tmp' );

    const convertCommand = `/tmp/lo/instdir/program/soffice.bin --headless --norestore --invisible --nodefault --nofirststartwizard --nolockcheck --nologo --convert-to "pdf:writer_pdf_Export" --outdir ${dirName} /tmp/${fileName}.docx`;

    try {
    console.log( execSync( convertCommand ).toString( 'utf8' ) );
    } catch ( e ) {
    console.log( execSync( convertCommand ).toString( 'utf8' ) );
    }

    return fs.readFileSync( `${dirName}/${fileName}.pdf` );
}

function docxBase64ToBuffer(base64) {
    return Buffer.from( base64, 'base64' );
}


async function processVars(buffer) {
    const binaryFile = buffer.toString('binary');
    const zip = new Pizzip(binaryFile);
    
    const fileProcessed = new DocxTemplater(zip, { 
        paragraphLoop: true,
        lineBreaks: true
    });

    
    const vars = {
        NomeCompleto: 'Deivdson Oliveira'
    };

    await fileProcessed.render(vars);

    return fileProcessed.getZip().generate({
        type: 'nodebuffer',
        compression: 'DEFLATE'
    })
}

module.exports.pdfConverterService = async (base64) => {
    const docxBuffer = docxBase64ToBuffer(base64)
    const fileProcessVarsBuffer = await processVars(docxBuffer)
    const filePdfBuffer = await convertToPDF(fileProcessVarsBuffer)

    return filePdfBuffer.toString( 'base64' );
}