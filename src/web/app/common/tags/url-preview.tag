<mk-url-preview>
	<a href={ url } target="_blank" title={ url } if={ !loading }>
		<div class="thumbnail" if={ thumbnail } style={ 'background-image: url(' + thumbnail + ')' }></div>
		<article>
			<header>
				<h1>{ title }</h1>
			</header>
			<p>{ description }</p>
			<footer>
				<img class="icon" if={ icon } src={ icon }/>
				<p>{ sitename }</p>
			</footer>
		</article>
	</a>
	<style>
		:scope
			display block
			font-size 16px

			> a
				display block
				border solid 1px #eee
				border-radius 4px
				overflow hidden

				&:hover
					text-decoration none
					border-color #ddd

					> article > header > h1
						text-decoration underline

				> .thumbnail
					position absolute
					width 100px
					height 100%
					background-position center
					background-size cover

					& + article
						left 100px
						width calc(100% - 100px)

				> article
					padding 16px

					> header
						margin-bottom 8px

						> h1
							margin 0
							font-size 1em
							color #555

					> p
						margin 0
						color #777
						font-size 0.8em

					> footer
						margin-top 8px
						height 16px

						> img
							display inline-block
							width 16px
							height 16px
							margin-right 4px
							vertical-align top

						> p
							display inline-block
							margin 0
							color #666
							font-size 0.8em
							line-height 16px
							vertical-align top

			@media (max-width 500px)
				font-size 8px

				> a
					border none

					> .thumbnail
						width 70px

						& + article
							left 70px
							width calc(100% - 70px)

					> article
						padding 8px

	</style>
	<script>
		this.mixin('api');

		this.url = this.opts.url;
		this.loading = true;

		this.on('mount', () => {
			fetch('/api:url?url=' + this.url).then(res => {
				res.json().then(info => {
					this.title = info.title;
					this.description = info.description;
					this.thumbnail = info.thumbnail;
					this.icon = info.icon;
					this.sitename = info.sitename;

					this.loading = false;
					this.update();
				});
			});
		});
	</script>
</mk-url-preview>
