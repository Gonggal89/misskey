<mk-recommended-polls-home-widget>
	<p class="title"><i class="fa fa-pie-chart"></i>投票</p>
	<button onclick={ refresh } title="他を見る"><i class="fa fa-refresh"></i></button>
	<div class="poll" if={ !loading && poll != null }>
		<p class="text">{ poll.text }</p>
		<mk-poll post={ poll }></mk-poll>
	</div>
	<p class="empty" if={ !loading && poll == null }>ありません！</p>
	<p class="loading" if={ loading }><i class="fa fa-spinner fa-pulse fa-fw"></i>読み込んでいます<mk-ellipsis></mk-ellipsis></p>
	<style>
		:scope
			display block
			background #fff

			> .title
				margin 0
				padding 0 16px
				line-height 42px
				font-size 0.9em
				font-weight bold
				color #888
				border-bottom solid 1px #eee

				> i
					margin-right 4px

			> button
				position absolute
				z-index 2
				top 0
				right 0
				padding 0
				width 42px
				font-size 0.9em
				line-height 42px
				color #ccc

				&:hover
					color #aaa

				&:active
					color #999

			> .poll
				padding 16px
				font-size 12px
				color #555

				> p
					margin 0 0 8px 0

			> .empty
				margin 0
				padding 16px
				text-align center
				color #aaa

			> .loading
				margin 0
				padding 16px
				text-align center
				color #aaa

				> i
					margin-right 4px

	</style>
	<script>
		this.mixin('api');

		this.poll = null;
		this.loading = true;

		this.offset = 0;

		this.on('mount', () => {
			this.fetch();
		});

		this.fetch = () => {
			this.update({
				loading: true,
				poll: null
			});
			this.api('posts/polls/recommendation', {
				limit: 1,
				offset: this.offset
			}).then(posts => {
				const poll = posts ? posts[0] : null;
				if (poll == null) this.offset = 0;
				this.update({
					loading: false,
					poll: poll
				});
			});
		};

		this.refresh = () => {
			this.offset++;
			this.fetch();
		};
	</script>
</mk-recommended-polls-home-widget>