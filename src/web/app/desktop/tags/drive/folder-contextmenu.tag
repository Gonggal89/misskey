<mk-drive-browser-folder-contextmenu>
	<mk-contextmenu ref="ctx">
		<ul>
			<li onclick={ parent.move }>
				<p><i class="fa fa-arrow-right"></i>%i18n:desktop.tags.mk-drive-browser-folder-contextmenu.move-to-this-folder%</p>
			</li>
			<li onclick={ parent.newWindow }>
				<p><i class="fa fa-share-square-o"></i>%i18n:desktop.tags.mk-drive-browser-folder-contextmenu.show-in-new-window%</p>
			</li>
			<li class="separator"></li>
			<li onclick={ parent.rename }>
				<p><i class="fa fa-i-cursor"></i>%i18n:desktop.tags.mk-drive-browser-folder-contextmenu.rename%</p>
			</li>
			<li class="separator"></li>
			<li onclick={ parent.delete }>
				<p><i class="fa fa-trash-o"></i>%i18n:common.delete%</p>
			</li>
		</ul>
	</mk-contextmenu>
	<script>
		import inputDialog from '../../scripts/input-dialog';

		this.mixin('api');

		this.browser = this.opts.browser;
		this.folder = this.opts.folder;

		this.open = pos => {
			this.refs.ctx.open(pos);

			this.refs.ctx.on('closed', () => {
				this.trigger('closed');
				this.unmount();
			});
		};

		this.move = () => {
			this.browser.move(this.folder.id);
			this.refs.ctx.close();
		};

		this.newWindow = () => {
			this.browser.newWindow(this.folder.id);
			this.refs.ctx.close();
		};

		this.createFolder = () => {
			this.browser.createFolder();
			this.refs.ctx.close();
		};

		this.rename = () => {
			this.refs.ctx.close();

			inputDialog('%i18n:desktop.tags.mk-drive-browser-folder-contextmenu.rename-folder%', '%i18n:desktop.tags.mk-drive-browser-folder-contextmenu.input-new-folder-name%', this.folder.name, name => {
				this.api('drive/folders/update', {
					folder_id: this.folder.id,
					name: name
				});
			});
		};
	</script>
</mk-drive-browser-folder-contextmenu>
