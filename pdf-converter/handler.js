const { pdfConverterService } = require('./pdf-converter.service');

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
    
    const contentBase64 = await pdfConverterService(body.contentBase64);

    return {
      statusCode: 200,
      body: JSON.stringify( { contentBase64 } ),
    };

  } catch ( error ) {
    console.log( error )
    return {
      statusCode: 400,
      body: JSON.stringify( { error }, null, 2 ),
    };
  }
}