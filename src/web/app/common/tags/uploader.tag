<mk-uploader>
	<ol if={ uploads.length > 0 }>
		<li each={ uploads }>
			<div class="img" style="background-image: url({ img })"></div>
			<p class="name"><i class="fa fa-spinner fa-pulse"></i>{ name }</p>
			<p class="status"><span class="initing" if={ progress == undefined }>%i18n:common.tags.mk-uploader.waiting%<mk-ellipsis/></span><span class="kb" if={ progress != undefined }>{ String(Math.floor(progress.value / 1024)).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') }<i>KB</i> / { String(Math.floor(progress.max / 1024)).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') }<i>KB</i></span><span class="percentage" if={ progress != undefined }>{ Math.floor((progress.value / progress.max) * 100) }</span></p>
			<progress if={ progress != undefined && progress.value != progress.max } value={ progress.value } max={ progress.max }></progress>
			<div class="progress initing" if={ progress == undefined }></div>
			<div class="progress waiting" if={ progress != undefined && progress.value == progress.max }></div>
		</li>
	</ol>
	<style>
		:scope
			display block
			overflow auto

			&:empty
				display none

			> ol
				display block
				margin 0
				padding 0
				list-style none

				> li
					display block
					margin 8px 0 0 0
					padding 0
					height 36px
					box-shadow 0 -1px 0 rgba($theme-color, 0.1)
					border-top solid 8px transparent

					&:first-child
						margin 0
						box-shadow none
						border-top none

					> .img
						display block
						position absolute
						top 0
						left 0
						width 36px
						height 36px
						background-size cover
						background-position center center

					> .name
						display block
						position absolute
						top 0
						left 44px
						margin 0
						padding 0
						max-width 256px
						font-size 0.8em
						color rgba($theme-color, 0.7)
						white-space nowrap
						text-overflow ellipsis
						overflow hidden

						> i
							margin-right 4px

					> .status
						display block
						position absolute
						top 0
						right 0
						margin 0
						padding 0
						font-size 0.8em

						> .initing
							color rgba($theme-color, 0.5)

						> .kb
							color rgba($theme-color, 0.5)

						> .percentage
							display inline-block
							width 48px
							text-align right

							color rgba($theme-color, 0.7)

							&:after
								content '%'

					> progress
						display block
						position absolute
						bottom 0
						right 0
						margin 0
						width calc(100% - 44px)
						height 8px
						background transparent
						border none
						border-radius 4px
						overflow hidden

						&::-webkit-progress-value
							background $theme-color

						&::-webkit-progress-bar
							background rgba($theme-color, 0.1)

					> .progress
						display block
						position absolute
						bottom 0
						right 0
						margin 0
						width calc(100% - 44px)
						height 8px
						border none
						border-radius 4px
						background linear-gradient(
							45deg,
							lighten($theme-color, 30%) 25%,
							$theme-color               25%,
							$theme-color               50%,
							lighten($theme-color, 30%) 50%,
							lighten($theme-color, 30%) 75%,
							$theme-color               75%,
							$theme-color
						)
						background-size 32px 32px
						animation bg 1.5s linear infinite

						&.initing
							opacity 0.3

						@keyframes bg
							from {background-position: 0 0;}
							to   {background-position: -64px 32px;}

	</style>
	<script>
		this.mixin('i');

		this.uploads = [];

		this.upload = (file, folder) => {
			if (folder && typeof folder == 'object') folder = folder.id;

			const id = Math.random();

			const ctx = {
				id: id,
				name: file.name || 'untitled',
				progress: undefined
			};

			this.uploads.push(ctx);
			this.trigger('change-uploads', this.uploads);
			this.update();

			const reader = new FileReader();
			reader.onload = e => {
				ctx.img = e.target.result;
				this.update();
			};
			reader.readAsDataURL(file);

			const data = new FormData();
			data.append('i', this.I.token);
			data.append('file', file);

			if (folder) data.append('folder_id', folder);

			const xhr = new XMLHttpRequest();
			xhr.open('POST', this.CONFIG.apiUrl + '/drive/files/create', true);
			xhr.onload = e => {
				const driveFile = JSON.parse(e.target.response);

				this.trigger('uploaded', driveFile);

				this.uploads = this.uploads.filter(x => x.id != id);
				this.trigger('change-uploads', this.uploads);

				this.update();
			};

			xhr.upload.onprogress = e => {
				if (e.lengthComputable) {
					if (ctx.progress == undefined) ctx.progress = {};
					ctx.progress.max = e.total;
					ctx.progress.value = e.loaded;
					this.update();
				}
			};

			xhr.send(data);
		};
	</script>
</mk-uploader>
