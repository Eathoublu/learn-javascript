// For appending new comments to the thread on page (appendcomments.js)
HashOver.prototype.appendComments = function (comments)
{
	// Run through each comment
	for (var i = 0, il = comments.length; i < il; i++) {
		// Skip existing comments
		if (this.permalinks.getComment (comments[i].permalink, this.instance.comments.primary) !== null) {
			// Check comment's replies
			if (comments[i].replies !== undefined) {
				this.appendComments (comments[i].replies);
			}

			continue;
		}

		// Check if comment is a reply
		var isReply = (comments[i].permalink.indexOf ('r') > -1);

		// Add comment to comments array
		this.addComments (comments[i], isReply, i);

		// Check that comment is not a reply
		if (isReply !== true) {
			// If so, append to primary comments
			var element = this.instance['more-section'];
		} else {
			// If not, append to its parent's element
			var parent = this.permalinks.getParent (comments[i].permalink, true);
			var element = this.elements.get (parent, true) || this.instance['more-section'];
		}

		// Parse comment
		var html = this.comments.parse (comments[i], null, true);

		// Check if we can insert HTML adjacently
		if ('insertAdjacentHTML' in element) {
			// If so, just do so
			element.insertAdjacentHTML ('beforeend', html);
		} else {
			// If not, convert HTML to NodeList
			var comment = this.HTMLToNodeList (html);

			// And append the first node
			element.appendChild (comment[0]);
		}

		// Add controls to the comment
		this.addControls (comments[i]);
	}
};
