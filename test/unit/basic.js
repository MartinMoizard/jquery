module( "basic", {
	teardown: moduleTeardown
} );

if ( jQuery.css ) {
	test( "css", function() {
		expect( 18 );

		var hiddendiv, disconnectedDiv, div, index,
			sizes = [ "10px", "20px" ];

		hiddendiv = jQuery( "<div style='display:none;'><div style='height:20px;'></div></div>" ).appendTo( "#qunit-fixture" );

		equal( hiddendiv.find( "div" ).css( "height" ), "20px", "Height on hidden div" );

		disconnectedDiv = jQuery( "<div/>" );

		disconnectedDiv.css( { "width": 4, "height": 4, "paddingLeft": 7 } );

		equal( disconnectedDiv[ 0 ].style.height, "4px", "Make sure the height is being set correctly" );
		equal( disconnectedDiv.css( "width" ), "4px", "Width on disconnected node" );
		equal( disconnectedDiv.css( "height" ), "4px", "Height on disconnected node" );
		equal( disconnectedDiv.css( "paddingLeft" ), "7px", "Padding-left on disconnected node" );

		disconnectedDiv.css( "width", 5 );

		equal( disconnectedDiv[ 0 ].style.width, "5px", "Make sure the width is being set correctly" );
		equal( disconnectedDiv.css( "width" ), "5px", "Width on disconnected node" );
		equal( disconnectedDiv.css( "height" ), "4px", "Height on disconnected node" );

		equal( jQuery( "<div style='display: none;'/>" ).css( "display" ), "none",
			"Styles on disconnected nodes" );

		div = jQuery( "<div/>" );
		div.appendTo( "#qunit-fixture" );

		div.css( { "width": 4, "height": 4, "paddingLeft": 7, "top": 5 } );

		div.css( { width: "+=9" } );
		equal( div.css( "width" ), "13px", "'+=9' on width (hash)" );

		div.css( "width", "-=9px" );
		equal( div.css( "width" ), "4px", "'-=9px' on width (params)" );

		div.css( { "paddingLeft": "+=4px" } );
		equal( div.css( "paddingLeft" ), "11px", "'+=4' on paddingLeft (hash)" );

		div.css( "padding-left", "-=4" );
		equal( div.css( "paddingLeft" ), "7px", "'-=4' on padding-left (params)" );

		div.css( "paddingLeft", "" );
		equal( div.css( "padding-left" ), "0px", "Zeroing the value" );

		jQuery( "<div id='cssFunctionTest'><div class='cssFunction'></div>" +
			"<div class='cssFunction'></div></div>" )
			.appendTo( "#qunit-fixture" );

		index = 0;

		jQuery( "#cssFunctionTest div" ).css( "font-size", function() {
			var size = sizes[ index ];
			index++;
			return size;
		} );

		index = 0;

		jQuery( "#cssFunctionTest div" ).each( function() {
			var computedSize = jQuery( this ).css( "font-size" ),
				expectedSize = sizes[ index ];
			equal( computedSize, expectedSize,
				"css(String, Function): Div #" + index + " should be " + expectedSize );
			index++;
		} );

		div = jQuery( "<div>" ).hide();
		equal( div.css( "display" ), "none", "Detached div hidden" );
		div.appendTo( "#qunit-fixture" ).show();
		equal( div.css( "display" ), "block", "Initially-detached div after show()" );
	} );
}


// TODO write tests for other modules
