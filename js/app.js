const g_app = {
	init: function(){
		registerAction('font_add', don => {
			setConfig('fontSize', g_config.fontSize + 2)
		});
		registerAction('font_reduce', don => {
			setConfig('fontSize', g_config.fontSize - 2)
		});
		$('h1').css('fontSize', g_config.fontSize+'px')

	},

}

g_app.init();