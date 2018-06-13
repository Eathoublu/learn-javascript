// Add Like/Dislike link and count to template (addratings.js)
HashOver.prototype.comments.addRatings = function (comment, template, action, commentKey)
{
	// Reference to the parent object
	var hashover = this.parent;

	// The opposite action
	var opposite = (action === 'like') ? 'dislike' : 'like';

	// Check if the comment doesn't belong to the logged in user
	if (comment['user-owned'] === undefined) {
		// Check whether this comment was liked/disliked by the visitor
		if (comment[action + 'd'] !== undefined) {
			// If so, setup indicators that comment was liked/disliked
			var className = 'hashover-' + action + 'd';
			var title = hashover.locale[action + 'd-comment'];
			var text = hashover.locale[action + 'd'];
		} else {
			// If not, setup indicators that comment can be liked/disliked
			var className = 'hashover-' + action;
			var title = hashover.locale[action + '-comment'];
			var text = hashover.locale[action][0];
		}

		// Append class to indicate dislikes are enabled
		if (hashover.setup['allows-' + opposite + 's'] === true) {
			className += ' hashover-' + opposite + 's-enabled';
		}

		// Add like/dislike link to HTML template
		template[action + '-link'] = hashover.strings.parseTemplate (hashover.ui[action + '-link'], {
			permalink: commentKey,
			class: className,
			title: title,
			text: text
		});
	}

	// Check if the comment has been likes/dislikes
	if (comment[action + 's'] !== undefined) {
		// Add likes/dislikes to HTML template
		template[action + 's'] = comment[action + 's'];

		// Get "X Like/Dislike(s)" locale
		var plural = (comment[action + 's'] === 1 ? 0 : 1);
		var count = comment[action + 's'] + ' ' + hashover.locale[action][plural];
	}

	// Add like count to HTML template
	template[action + '-count'] = hashover.strings.parseTemplate (hashover.ui[action + '-count'], {
		permalink: commentKey,
		text: count || ''
	});
};
