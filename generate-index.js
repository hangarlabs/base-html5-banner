var pkg = require('./package.json');

module.exports = function() {

	var banners = pkg.bannersname.split(';')
	var html = '';

	var h2 = '<h2 class="banner-client">' + pkg.title + '</h2>';
	var h3 = '<h3 class="banner-name">' + pkg.client + '</h3>';

	var table = '<div class="table-responsive"><table class="table"><tbody>';

	var tr = '<tr><td class="b-top">';
	var ENDtr = '</td></tr>';

	for (var i = 0; i < banners.length; ++i) {
		var links = '';

		table += tr;

		links += '<a class="pull-left banner-size" href="' + banners[i] + '/index.html" target="_blank">' + banners[i] + '</a>';
		links += '<a class="pull-right zip" href="zips/' + banners[i] + '.zip" target="_blank">ZIP</a>';
		links += '<a class="backup_img" href="static/' + banners[i] + '.jpg" target="_blank">Backup Frame</a>';

		table += links;
		table += ENDtr;
	}

	table += '</tbody></table></div>';

	html = h2 + h3 + table;

	return html;
}