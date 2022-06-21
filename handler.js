const path = require( 'path' );
const fs = require( 'fs' );
const lambdafs = require( 'lambdafs' );
const { execSync } = require( 'child_process' );

const inputPath = path.join( '/opt', 'lo.tar.br' );
const outputPath = '/tmp/';
const dateNow = ( new Date() ).getTime();
const fileName = `${dateNow}`;

const util = require( 'util' )
const writeFilePromisified = util.promisify( fs.writeFile )

const dirName = `/tmp/dir-${fileName}`;




module.exports.handler = async ( event, context ) => {
  try {
    let pattternBase64 = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;

    const body = JSON.parse( event.body )

    if ( !body.contentBase64 ) {
      return {
        statusCode: 400,
        body: JSON.stringify( { error: 'Base64 não informado.' } ),
      };
    }

    const isBase64 = body.contentBase64.match( pattternBase64 ) ? true : false;
    if ( !isBase64 ) {
      return {
        statusCode: 400,
        body: JSON.stringify( { error: 'Base64 inválido.' } ),
      };
    }

    await lambdafs.inflate( inputPath )

    fs.mkdirSync( dirName, { recursive: true } );
    fs.createWriteStream( `${outputPath}${fileName}` );


    const docxBuffer = Buffer.from( body.contentBase64, 'base64' )

    await writeFilePromisified( `${outputPath}${fileName}.docx`, docxBuffer );

    execSync( 'export HOME=/tmp' )

    const convertCommand = `/tmp/lo/instdir/program/soffice.bin --headless --norestore --invisible --nodefault --nofirststartwizard --nolockcheck --nologo --convert-to "pdf:writer_pdf_Export" --outdir ${dirName} /tmp/${fileName}.docx`;

    try {
      console.log( execSync( convertCommand ).toString( 'utf8' ) );
    } catch ( e ) {
      console.log( execSync( convertCommand ).toString( 'utf8' ) );
    }

    let filePdfBuffer = fs.readFileSync( `${dirName}/${fileName}.pdf` );

    const filePdfBase64 = filePdfBuffer.toString( 'base64' )

    return {
      statusCode: 200,
      body: JSON.stringify( { contentBase64: filePdfBase64 } ),
    };

  } catch ( error ) {
    console.log( error )
    return {
      statusCode: 400,
      body: JSON.stringify( { error }, null, 2 ),
    };
  }
}