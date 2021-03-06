<mk-drive-browser-window>
	<mk-window ref="window" is-modal={ false } width={ '800px' } height={ '500px' }>
		<yield to="header">
			<p class="info" if={ parent.usage }><b>{ parent.usage.toFixed(1) }%</b> %i18n:desktop.tags.mk-drive-browser-window.used%</p>
			<i class="fa fa-cloud"></i>%i18n:desktop.tags.mk-drive-browser-window.drive%
		</yield>
		<yield to="content">
			<mk-drive-browser multiple={ true } folder={ parent.folder }/>
		</yield>
	</mk-window>
	<style>
		:scope
			> mk-window
				[data-yield='header']
					> .info
						position absolute
						top 0
						left 16px
						margin 0
						font-size 80%

					> i
						margin-right 4px

				[data-yield='content']
					> mk-drive-browser
						height 100%

	</style>
	<script>
		this.mixin('api');

		this.folder = this.opts.folder ? this.opts.folder : null;

		this.on('mount', () => {
			this.refs.window.on('closed', () => {
				this.unmount();
			});

			this.api('drive').then(info => {
				this.update({
					usage: info.usage / info.capacity * 100
				});
			});
		});

		this.close = () => {
			this.refs.window.close();
		};
	</script>
</mk-drive-browser-window>
