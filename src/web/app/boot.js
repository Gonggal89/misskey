/**
 * MISSKEY BOOT LOADER
 * (ENTRY POINT)
 */

/**
 * ドメインに基づいて適切なスクリプトを読み込みます。
 * ユーザーの言語およびモバイル端末か否かも考慮します。
 * webpackは介さないためrequireやimportは使えません。
 */

'use strict';

// Chromeで確認したことなのですが、constやletを用いたとしても
// グローバルなスコープで定数/変数を定義するとwindowのプロパティ
// としてそれがアクセスできるようになる訳ではありませんが、普通に
// コンソールから定数/変数名を入力するとアクセスできてしまいます。
// ブロック内に入れてスコープを非グローバル化するとそれが防げます
// (Chrome以外のブラウザでは検証していません)
{
	// Get the current url information
	const url = new URL(location.href);

	// Extarct the (sub) domain part of the current url
	//
	// e.g.
	//   misskey.alice               => misskey
	//   misskey.strawberry.pasta    => misskey
	//   dev.misskey.arisu.tachibana => dev
	let app = url.host.split('.')[0];

	// Detect the user language
	// Note: The default language is English
	let lang = navigator.language.split('-')[0];
	if (!/^(en|ja)$/.test(lang)) lang = 'en';

	// Detect the user agent
	const ua = navigator.userAgent.toLowerCase();
	const isMobile = /mobile|iphone|ipad|android/.test(ua);

	// Get the <head> element
	const head = document.getElementsByTagName('head')[0];

	// If mobile, insert the viewport meta tag
	if (isMobile) {
		const meta = document.createElement('meta');
		meta.setAttribute('name', 'viewport');
		meta.setAttribute('content', [
			['width', 'device-width'],
			['initial-scale', '1'],
			['minimum-scale', '1'],
			['maximum-scale', '1'],
			['user-scalable', 'no']
		].map(x => x.join('=')).join(','));
		head.appendChild(meta);
	}

	// Switch desktop or mobile version
	if (app == 'misskey') {
		app = isMobile ? 'mobile' : 'desktop';
	}

	// Load an app script
	// Note: 'async' make it possible to load the script asyncly.
	//       'defer' make it possible to run the script when the dom loaded.
	const script = document.createElement('script');
	script.setAttribute('src', `/assets/${app}.${VERSION}.${lang}.js`);
	script.setAttribute('async', 'true');
	script.setAttribute('defer', 'true');
	head.appendChild(script);
}
