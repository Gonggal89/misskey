<mk-activity-table>
	<svg if={ data } ref="canvas" viewBox="0 0 53 7" preserveAspectRatio="none">
		<rect each={ data } width="1" height="1"
			riot-x={ x } riot-y={ date.weekday }
			rx="1" ry="1"
			fill={ color }
			style="transform: scale({ v });"/>
		<rect class="today" width="1" height="1"
			riot-x={ data[data.length - 1].x } riot-y={ data[data.length - 1].date.weekday }
			rx="1" ry="1"
			fill="none"
			stroke-width="0.1"
			stroke="#f73520"/>
	</svg>
	<style>
		:scope
			display block
			max-width 600px
			margin 0 auto
			background #fff

			> svg
				display block

				> rect
					transform-origin center

	</style>
	<script>
		this.mixin('api');

		this.user = this.opts.user;

		this.on('mount', () => {
			this.api('aggregation/users/activity', {
				user_id: this.user.id
			}).then(data => {
				data.forEach(d => d.total = d.posts + d.replies + d.reposts);
				this.peak = Math.max.apply(null, data.map(d => d.total)) / 2;
				let x = 0;
				data.reverse().forEach(d => {
					d.x = x;
					d.v = d.total / this.peak;
					if (d.v > 1) d.v = 1;
					d.color = `hsl(170, ${d.v * 100}%, ${15 + ((1 - d.v) * 80)}%)`;
					d.date.weekday = (new Date(d.date.year, d.date.month - 1, d.date.day)).getDay();
					if (d.date.weekday == 6) x++;
				});
				this.update({ data });
			});
		});
	</script>
</mk-activity-table>
