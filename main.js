$(document).ready(function(){

	function getLum(r,g,b) {

		let r1 = r/255;
		let g1 = g/255;
		let b1 = b/255;


		let r2 = (r1 <= .03928) ? r1/12.92 : ((r1+.055)/1.055) ** 2.4;
		let g2 = (g1 <= .03928) ? g1/12.92 : ((g1+.055)/1.055) ** 2.4;
		let b2 = (b1 <= .03928) ? b1/12.92 : ((b1+.055)/1.055) ** 2.4;


		let lum = (.2126 * r2) + (.7152 * g2) + (.0722 * b2);

		return lum;
	}
	function hexToRgb(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return [r,g,b];
}
	function getRatio(textRgb,bgRgb) {
		
		

		let lum1 = getLum(textRgb[0],textRgb[1],textRgb[2]);
		let lum2 = getLum(bgRgb[0],bgRgb[1],bgRgb[2]);
		if(lum1 < lum2) {
			let temp = lum2;
			lum2 = lum1;
			lum1 = temp;
		}
		let ratio = (lum1 + .05) / (lum2 + .05);
		return ratio;
	}

	

	$('button').click(function(){
		if($('.textColor').val().indexOf('#') < 0) {
			$('.textColor').val('#' + $('.textColor').val());
		}
		var textHex = $('.textColor').val();
		textHex = textHex.replace('#','');
		var bgHex = $('.bgColor').val();
		bgHex = bgHex.replace('#','');
		var textRgb = hexToRgb(textHex);
		var bgRgb = hexToRgb(bgHex);

		$('.status').removeClass('fa-check fa-times');
		var	ratio = getRatio(textRgb,bgRgb);


		// pls dear lord clean this mess


		if(ratio >= 7) {
			$('.desc').text('Meets recommended WCAG requirements');
			$('.statusFinal').text('AAA');
			$('.body.status').addClass('fas fa-check');
			$('.header.status').addClass('fas fa-check');
		}
		else if(ratio >= 4.5) {
			$('.desc').text('Meets minimum WCAG requirements');
			$('.body.status').addClass('fas fa-check');
			$('.header.status').addClass('fas fa-check');
			$('.statusFinal').text('AA');
		}
		else if(ratio >= 3) {
			$('.desc').text('Meets minimum WCAG requirements for large text');
			$('.header.status').addClass('fas fa-check');
			$('.body.status').addClass('fas fa-times');
			$('.statusFinal').text('AA Large');
		}
		else {
			$('.desc').text('Fails WCAG requirements');
			$('.body.status').addClass('fas fa-times');
			$('.header.status').addClass('fas fa-times');
			$('.statusFinal').text('Fail');
		}
	
		$('.ratio').text(ratio.toFixed(2) + ":1");

		// Fail state readable color
		var textFinal;
		var bgFinal;
		var darkRatio = getRatio([0,0,0], bgRgb);
		var lightRatio = getRatio([255,255,255], bgRgb);
		console.log(darkRatio,lightRatio);
		if(ratio < 3) {

			if(lightRatio > darkRatio) {
				textFinal = 'ffffff';
				console.log("light");
			}
			else {
				textFinal = '000000';
				console.log("dark");
			}
			
		}
		else {
			textFinal = bgHex;

		}
		
		
		$('.interface').css({
			'color': '#'+textFinal,
			'background-color': '#'+textHex
		});
		$('.example').css({
			'color': '#'+textHex,
			'background-color': '#'+bgHex
		});
		$('.example_mobile').css({
			'color': '#'+bgHex,
			'border-color': '#'+bgHex
		});
		$('input').css({
			'border-bottom': '1px solid ' + '#'+textFinal,
			'color': '#'+textFinal
			//'background-color': '#'+textHex

		});
		$('.credit, a, .status').css({
			'color': '#'+textFinal
		});
			$('.divider').css({
			'background-color': '#'+textFinal
		});
		$('.statusFinal').addClass('statusFinal_anim');
		$('.ratio').addClass('ratio_anim');
		$('.divider').addClass('divider_anim');



		// mess over




		$('.example_mobile').addClass('example_mobile_anim');
		$('.desc').css('opacity','1');
		$('.interface').addClass('interface_anim');
		$('.status').addClass('status_anim');
	});

});